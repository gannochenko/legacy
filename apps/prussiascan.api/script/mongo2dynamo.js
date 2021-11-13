#!/usr/bin/env node

const join = require('path').join;
const fs = require('fs').promises;

const DynamoDB = require('aws-sdk').DynamoDB;
const S3 = require('aws-sdk').S3;
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const v4 = require('uuid').v4;

const sharp = require('sharp');
const {
    makeSlug,
} = require('../src/lambdas/runAPI/entities/ObjectEntity/utils');

const awsOptions = {
    endpoint: 'http://localhost:4566',
    region: 'eu-central-1',
    accessKeyId: 'local',
    secretAccessKey: 'local',
};

const s3 = new S3({
    ...awsOptions,
    s3ForcePathStyle: true,
    apiVersion: 'latest',
});

const BUCKET_NAME = 'prussiascans-object-photos';
const IMAGE_SIZE_CONSTRAINT = 1500;

const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});
const TABLE_NAME = 'prussiascan.api_ObjectCollection';

const MONGO_URI = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';

const UPLOADS_FOLDER = '/Users/sergei/proj/legacy/apps/prussiascan.api/upload';

const client = new MongoClient(MONGO_URI);

const DRY_RUN = false;

const parseYear = (year) => {
    if (!year) {
        return [];
    }

    if (parseInt(year, 10).toString() === year) {
        return [parseInt(year, 10), parseInt(year, 10)];
    }

    let match = year.match(/(\d{4})\s?-\s?(\d{4})(-е)? годы/);
    if (match) {
        return [parseInt(match[1], 10), parseInt(match[2], 10)];
    }

    match = year.match(/(\d{4})\sгод/);
    if (match) {
        return [parseInt(match[1], 10), parseInt(match[1], 10)];
    }

    match = year.match(/(\d{4})\s?гг?\.?/);
    if (match) {
        return [parseInt(match[1], 10), parseInt(match[1], 10)];
    }

    return [];
};

const kindMap = {
    BUILDING: 2,
    CASTLE: 3,
    CHURCH: 4,
    COMPLEX: 5,
    CEMETERY: 6,
    CUSSR: 7,
    CDEU: 8,
    CRUS: 9,
    MEMORIAL: 10,
    ANCIENT: 11,
    WTOWER: 12,
    AREA: 13,
    HOUSE: 14,
    FACTORY: 15,
    SCHOOL: 16,
    MBASE: 17,
    LHOUSE: 18,
    ESTATE: 19,
    BTOWER: 20,
    BASTION: 21,
    GATE: 22,
    FORT: 23,
    MILITARY: 24,
    PMEMORIAL: 25,
    VILLA: 26,
    TECH: 27,
    BRIDGE: 28,
    HOSPITAL: 29,
    TSTATION: 30,
    FIREDEPT: 31,
    MILL: 32,
    POSTAMT: 33,
    POLICE: 34,
    STORAGE: 35,
    HOTEL: 36,
    MOSAIC: 37,
    FOUNTAIN: 38,
    SCULPTURE: 39,
    BUNKER: 40,
    HANGAR: 41,
    DOT: 42,
    SHELTER: 43,
    ETOWER: 44,
    WTECH: 45,
    BARN: 46,
    PRISON: 47,
    HYDRANT: 48,
    HATCH: 49,
    STONE: 50,
};

// {key: 'A', value: 'Идеальное'},
// {key: 'B', value: 'Хорошее'},
// {key: 'C', value: 'Удовлетворительное'},
// {key: 'D', value: 'Неудовлетворительное'},
// {key: 'F', value: 'Частичные руины'},
// {key: 'E', value: 'Руины'},
// {key: 'R', value: 'Перестроен'},
// {key: 'L', value: 'Утрачен'},
// {key: 'N', value: 'Нет данных'},

const conditionMap = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    F: 5,
    E: 6,
    R: 4,
    L: 7,
};

// {key: 'FEDERAL', value: 'Федеральный', iKey: 'FEDERALNOGO ZNACHENIYA'},
// {key: 'REGION', value: 'Региональный', iKey: 'REGIONALNOGO ZNACHENIYA'},
// {key: 'AREA', value: 'Муниципальный', iKey: 'MESTNOGO MUNITSIPALNOGO ZNACHENIYA'},
// {key: 'UNDEFINED', value: 'Не определен',},

const levelMap = {
    FEDERAL: 1,
    REGION: 2,
    AREA: 3,
};

// {key: 'CLO', value: 'ОКН', iKey: ''},
// {key: 'PRE_CLO', value: 'Выявленный', iKey: [
//     'VIYAVLENNIE OBEKTI KULTURNOGO NASLEDIYA',
//     'VIYAVLENNIE OBEKTI ARHEOLOGICHESKOGO NASLEDIYA',
// ]},
// {key: 'POTENTIAL_CLO', value: 'С признаками', iKey: 'OBEKTI OBLADAYUSCHIE PRIZNAKAMI OBEKTA KULTURNOGO NASLEDIYA'},
// {key: 'NON', value: 'Без защиты', iKey: ''},
// {key: 'REJECT', value: 'Отказ', iKey: 'OTKAZ VO VKLYUCHENII V REESTR'},

const statusMap = {
    CLO: 1,
    PRE_CLO: 2,
    POTENTIAL_CLO: 3,
    NON: 4,
    REJECT: 4,
};

// {key: 'BGR', value: 'Багратионовский городской округ', iKey: 'BAGRATIONOVSKII GORODSKOI OKRUG'},
// {key: 'BAL', value: 'Балтийский муниципальный район', iKey: 'BALTIISKII MUNITSIPALNII RAION'},
// {key: 'GVR', value: 'Гвардейский городской округ', iKey: 'GVARDEISKII GORODSKOI OKRUG'},
// {key: 'KLG', value: 'Городской округ "Город Калининград"', iKey: 'GORODSKOI OKRUG GOROD KALININGRAD'},
// {key: 'GUR', value: 'Гурьевский городской округ', iKey: 'GUREVSKII GORODSKOI OKRUG'},
// {key: 'GUS', value: 'Гусевский городской округ', iKey: 'GUSEVSKII GORODSKOI OKRUG'},
// {key: 'ZEL', value: 'Зеленоградский городской округ', iKey: 'ZELENOGRADSKII GORODSKOI OKRUG'},
// {key: 'KRS', value: 'Краснознаменский городской округ', iKey: 'KRASNOZNAMENSKII GORODSKOI OKRUG'},
// {key: 'LAD', value: 'Ладушкинский городской округ', iKey: 'LADUSHKINSKII GORODSKOI OKRUG'},
// {key: 'MAM', value: 'Мамоновский городской округ', iKey: 'MAMONOVSKII GORODSKOI OKRUG'},
// {key: 'NEM', value: 'Неманский городской округ', iKey: 'NEMANSKII GORODSKOI OKRUG'},
// {key: 'NER', value: 'Неманский муниципальный район', iKey: 'NEMANSKII MUNITSIPALNII RAION'},
// {key: 'NES', value: 'Нестеровский район', iKey: 'NESTEROVSKII RAION'},
// {key: 'OZR', value: 'Озёрский городской округ', iKey: 'OZERSKII GORODSKOI OKRUG'},
// {key: 'PIO', value: 'Пионерский городской округ', iKey: 'PIONERSKII GORODSKOI OKRUG'},
// {key: 'POL', value: 'Полесский городской округ', iKey: 'POLESSKII GORODSKOI OKRUG'},
// {key: 'PRV', value: 'Правдинский городской округ', iKey: 'PRAVDINSKII GORODSKOI OKRUG'},
// {key: 'STL', value: 'Светловский городской округ', iKey: 'SVETLOVSKII GORODSKOI OKRUG'},
// {key: 'SVL', value: 'Светлогорский район', iKey: 'SVETLOGORSKII RAION'},
// {key: 'SLA', value: 'Славский городской округ', iKey: 'SLAVSKII GORODSKOI OKRUG'},
// {key: 'SOV', value: 'Советский городской округ', iKey: 'SOVETSKII GORODSKOI OKRUG'},
// {key: 'CHE', value: 'Черняховский городской округ', iKey: 'CHERNYAHOVSKII GORODSKOI OKRUG'},
// {key: 'CHR', value: 'Черняховский район', iKey: 'CHERNYAHOVSKII RAION'},
// {key: 'YAN', value: 'Янтарный городской округ', iKey: 'YANTARNII GORODSKOI OKRUG'},

const areaMap = {
    BGR: 1,
    BAL: 2,
    GVR: 3,
    KLG: 4,
    GUR: 5,
    GUS: 6,
    ZEL: 7,
    KRS: 8,
    LAD: 9,
    MAM: 10,
    NEM: 11,
    NER: 12,
    NES: 13,
    OZR: 14,
    PIO: 15,
    POL: 16,
    PRV: 17,
    STL: 18,
    SVL: 19,
    SLA: 20,
    SOV: 21,
    CHE: 22,
    CHR: 23,
    YAN: 24,
};

// {key: 'CONCRETE', value: 'Бетон',},
// {key: 'BRICK', value: 'Красный кирпич',},
// {key: 'WBRICK', value: 'Белый кирпич',},
// {key: 'FWERK', value: 'Фахверк',},
// {key: 'WOOD', value: 'Дерево',},
// {key: 'GRANITE', value: 'Гранит',},
// {key: 'STEEL', value: 'Сталь',},
// {key: 'CIRON', value: 'Чугун',},

const materialMap = {
    CONCRETE: 1,
    BRICK: 2,
    WBRICK: 3,
    FWERK: 4,
    WOOD: 5,
    GRANITE: 6,
    STEEL: 7,
    CIRON: 8,
};

const replaceLink = (text) => {
    return text.replace(
        /(https:\/\/www\.prussia39\.ru\/sight\/index\.php\?sid=(\d)+)/g,
        '[Prussia39]($1)',
    );
};

const makeContent = (oldItem) => {
    let result = [];

    if (oldItem.creationPeriod) {
        result.push(`Период создания: ${oldItem.creationPeriod}`);
    }
    if (oldItem.documentName) {
        result.push(`Документ: ${oldItem.documentName}`);
    }
    if (oldItem.note) {
        result.push(replaceLink(oldItem.note));
    }

    return result.join('\n');
};

const makeYear = (year) => {
    const yearNum = parseInt(year, 10);
    if (Number.isNaN(yearNum)) {
        return 0;
    }

    return yearNum;
};

async function run() {
    try {
        const db = await client.connect();
        const dbo = db.db('legacy');
        const registry = dbo.collection('registry.object');
        const photos = dbo.collection('file');

        const findResult = await registry.find({}).toArray();

        const photosFindResult = await photos.find({}).toArray();

        let itemBatch = [];

        for (const oldItem of findResult) {
            const itemId = v4();
            const years = parseYear(oldItem.creationPeriod);

            // {
            //     _id: 'EXwjchR5MN3EZbZZP',
            //     code: '0208Р',
            //     name: 'Здание службы занятости',
            //     creationPeriod: '1928-1931 годы',
            //     locationDescription: 'город Калининград, улица Генерала Галицкого, 30',
            //     document: [],
            //     status: 'CLO',
            //     level: 'REGION',
            //     area: 'KLG',
            //     technology: [ 'CONCRETE', 'BRICK', 'WOOD' ],
            //     search: 'ЗДАНИЕ СЛУЖБЫ ЗАНЯТОСТИ|0208Р|ГОРОДСКОЙ ОКРУГ ГОРОД КАЛИНИНГРАД|ОКН||ПОСТАНОВЛЕНИЕ  132|РЕГИОНАЛЬНЫЙ|ГОРОД КАЛИНИНГРАД УЛИЦА ГЕНЕРАЛА ГАЛИЦКОГО 30',
            //     category: 'ARCHITECT',
            //     kind: [ 'OBJECT', 'BUILDING', 'HOUSE' ],
            //     condition: 'A',
            //     inDanger: false,
            //     verified: true,
            //     location: [ [Object], [Object] ],
            //     documentName: 'Постановление № 132'
            //     tearDownPeriod: '2020'
            //     nameOriginal: 'Neunischken Kirche',
            //     note: 'https://www.prussia39.ru/sight/index.php?sid=487\n' + 'Перестроена в дом культуры',
            // },

            let itemPhotos = [];
            let previewPhoto = '';

            const photoId = oldItem.photoId;
            if (photoId) {
                const photoItem = photosFindResult.find(
                    (photo) => photo._id === photoId,
                );

                if (photoItem) {
                    const photoPath = join(
                        UPLOADS_FOLDER,
                        photoItem.url.substr(0, 3),
                        photoItem.url,
                    );

                    let file;
                    try {
                        file = await fs.readFile(photoPath);
                    } catch (error) {
                        // console.log(`Was not able to read file ${photoPath}`);
                    }

                    if (file) {
                        const fileId = v4();
                        const fileExtension =
                            photoItem.type === 'image/png' ? 'png' : 'jpg';
                        const fileKey = `${itemId}/${fileId}.${fileExtension}`;

                        let uploaded = false;
                        try {
                            if (!DRY_RUN) {
                                await s3
                                    .upload({
                                        Bucket: BUCKET_NAME,
                                        Key: fileKey,
                                        ACL: 'public-read',
                                        Body: file,
                                    })
                                    .promise();
                            }
                            uploaded = true;
                        } catch (error) {
                            console.log(
                                `Was not able to upload file ${photoPath}`,
                            );
                            console.log(error);
                        }

                        if (uploaded) {
                            let sharpFile = sharp(file);
                            const { width, height } =
                                await sharpFile.metadata();

                            if (
                                width > IMAGE_SIZE_CONSTRAINT ||
                                height > IMAGE_SIZE_CONSTRAINT
                            ) {
                                sharpFile = await sharpFile.resize(
                                    IMAGE_SIZE_CONSTRAINT,
                                    IMAGE_SIZE_CONSTRAINT,
                                );
                            }

                            const normalizedFile = await sharpFile
                                .jpeg({ quality: 90 })
                                .toBuffer();

                            const normalizedFileId = v4();
                            const normalizedFileKey = `${itemId}/${normalizedFileId}.jpg`;

                            let normalizedUploaded = false;
                            try {
                                if (!DRY_RUN) {
                                    await s3
                                        .upload({
                                            Bucket: BUCKET_NAME,
                                            Key: normalizedFileKey,
                                            ACL: 'public-read',
                                            Body: normalizedFile,
                                        })
                                        .promise();
                                }
                                normalizedUploaded = true;
                            } catch (error) {
                                console.log(
                                    `Was not able to upload normalized file ${photoPath}`,
                                );
                                console.log(error);
                                console.log(normalizedFile);
                            }

                            if (normalizedUploaded) {
                                itemPhotos = [
                                    {
                                        // author,
                                        // source,
                                        code: 'preview',
                                        variants: {
                                            original: fileKey,
                                            normalized: normalizedFileKey,
                                        },
                                    },
                                ];
                                previewPhoto = normalizedFileKey;

                                // console.log(itemPhotos);
                            }
                        }
                    }
                }
            }

            const slug = makeSlug(oldItem.name, oldItem.locationDescription);

            const dynamodbItem = {
                id: itemId,
                name: oldItem.name,
                nameDe: oldItem.nameOriginal ?? '',
                slug,
                content: makeContent(oldItem),
                yearBuiltStart: years[0] ?? 0,
                yearBuiltEnd: years[1] ?? 0,
                yearDemolishedStart: makeYear(oldItem.tearDownPeriod),
                yearDemolishedEnd: makeYear(oldItem.tearDownPeriod),
                demolished: oldItem.condition === 'L',
                altered: oldItem.condition === 'R',
                condition: conditionMap[oldItem.condition] ?? 0,
                location: oldItem.location.map(({ lat, lng }) => [lat, lng]),
                locationDescription: oldItem.locationDescription,
                locationArea: areaMap[oldItem.area] ?? 0,
                kind: (oldItem.kind ?? [])
                    .map((kindItem) => kindMap[kindItem])
                    .filter((x) => !!x),
                materials: (oldItem.technology ?? [])
                    .map((techItem) => materialMap[techItem])
                    .filter((x) => !!x),
                photos: itemPhotos,
                previewPhoto: previewPhoto,
                createdAt: new Date().toISOString(),
                version: 1,
                heritageStatus: statusMap[oldItem.status] ?? 0,
                heritageLevel: levelMap[oldItem.level] ?? 0,
                heritageId: oldItem.code ?? '',
            };

            if (!DRY_RUN) {
                itemBatch.push({
                    PutRequest: {
                        Item: dynamodbItem,
                    },
                });
            }

            // try {
            //     await dynamoDB
            //         .put({
            //             TableName: TABLE_NAME,
            //             Item: dynamodbItem,
            //         })
            //         .promise();
            //     console.log(`Added: ${dynamodbItem.id}`);
            // } catch (error) {
            //     console.error(error);
            //     console.log('Was not able to insert:');
            //     console.log(dynamodbItem);
            // }

            if (itemBatch.length === 25) {
                try {
                    await dynamoDB
                        .batchWrite({
                            RequestItems: {
                                [TABLE_NAME]: itemBatch,
                            },
                        })
                        .promise();
                    console.log('Added a batch');
                } catch (error) {
                    console.log('Could not batch write');
                    console.error(error);
                }

                itemBatch = [];
            }
        }

        if (itemBatch.length) {
            try {
                await dynamoDB
                    .batchWrite({
                        RequestItems: {
                            [TABLE_NAME]: itemBatch,
                        },
                    })
                    .promise();
                console.log('Added the final batch');
            } catch (error) {
                console.log('Could not batch write');
                console.error(error);
            }
        }

        console.log('Done!');
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
