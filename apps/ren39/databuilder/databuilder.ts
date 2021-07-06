import { promisify } from 'util';

const path = require('path');
const find = require('findit');
const fs = require('fs');
const fse = require('fs-extra');
const latinize = require('latinize');
const ejs = require('ejs');
const processedPhotosStreetMap = require('./data').processedPhotosStreetMap;
const allBuildings = require('./data').allBuildings;

const writeFile = promisify(fs.writeFile);

const PROCESSED_FOLDER = path.join(__dirname, '../raw/processed');
const DST_FOLDER = path.join(__dirname, '../content/doma');
const TEMPLATE_PATH = path.join(__dirname, 'object-template.ejs');

type ObjectList<T = any> = { [k: string]: T };

const crawl = async (path: string, onFile: (name: string) => void) => {
    const finder = find(path);

    // todo: add timeout here with Promise.race()
    const onEnd = new Promise<ObjectList>((resolve) => {
        finder.on('end', resolve);
    });

    finder.on('file', onFile);

    return onEnd;
};

(async () => {
    // const buildingStruct: any[] = [];
    await crawl(PROCESSED_FOLDER, (file: string) => {
        const fileName = path.basename(file);
        const parts = fileName.match(/(.+)\s(\d+)(-(\d+))?(_(\d+))?/i);
        if (parts) {
            const struct = {
                name: processedPhotosStreetMap[parts[1] as string],
                houseRangeStart: parseInt(parts[2], 10),
                houseRangeEnd:
                    parts[4] !== undefined ? parseInt(parts[4], 10) : null,
                photoNum: parts[5] !== undefined ? parseInt(parts[5], 10) : 0,
            };

            const range = `${struct.houseRangeStart}${
                struct.houseRangeEnd !== null ? `-${struct.houseRangeEnd}` : ''
            }`;

            const street = allBuildings.find(
                (str: any) => str[0] === struct.name,
            );
            if (street) {
                // const name = street[0];
                const building = street[1].find(
                    (bld: any) => bld.range === range,
                );
                if (building) {
                    building.images = building.images || [];
                    building.images.push({
                        src: file,
                    });

                    if (street[0] === 'Тамбовская') {
                        console.log(street);
                    }
                }
            }
        } else {
            console.log(`Was not able to process the name: ${fileName}`);
        }
    });

    // return;

    for (const streets of allBuildings) {
        const streetCode = latinize(streets[0])
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        for (const building of streets[1]) {
            const buildingCode = `${streetCode}-${building.range}`;
            const buildingFolder = path.join(DST_FOLDER, buildingCode);
            await fse.ensureDir(buildingFolder).catch(() => {});
            const buildingPhotosFolder = path.join(buildingFolder, 'photos');
            await fse.ensureDir(buildingPhotosFolder).catch(() => {});

            const images = building.images || [];
            let index = 0;
            const localImages: string[] = [];
            for (const image of images) {
                const imageCode = `${index.toString().padStart(2, '0')}.jpg`;
                const imagePath = path.join(buildingPhotosFolder, imageCode);
                await fse.copy(image.src, imagePath).catch(() => {});
                index++;

                localImages.push(imageCode);
            }

            const result = await ejs.renderFile(TEMPLATE_PATH, {
                streetCode,
                code: buildingCode,
                street: streets[0],
                range: building.range,
                headerImage: building.headerImage ? building.headerImage : 0,
                location: building.location || [],
                images: localImages,
                description: '',
            });

            await writeFile(
                path.join(buildingFolder, 'index.mdx'),
                new Uint8Array(Buffer.from(result)),
            );
        }
    }
})();
