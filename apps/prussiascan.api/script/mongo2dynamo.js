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

const DRY_RUN = false;

const BUCKET_NAME = 'prussiascans-object-photos';
const IMAGE_SIZE_CONSTRAINT = 1500;
const TABLE_NAME = 'prussiascan.api_ObjectCollection';
const MONGO_URI = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';
const UPLOADS_FOLDER =
    '/Users/gannochenko.sv/proj/legacy/apps/prussiascan.api/upload';

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
const dynamoDB = new DynamoDB.DocumentClient({
    ...awsOptions,
    apiVersion: '2012-08-10',
});

const client = new MongoClient(MONGO_URI);

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

// 1 {key: 'BGR', value: 'Багратионовский городской округ', iKey: 'BAGRATIONOVSKII GORODSKOI OKRUG'},
// 2 {key: 'BAL', value: 'Балтийский муниципальный район', iKey: 'BALTIISKII MUNITSIPALNII RAION'},
// 3 {key: 'GVR', value: 'Гвардейский городской округ', iKey: 'GVARDEISKII GORODSKOI OKRUG'},
// 4 {key: 'KLG', value: 'Городской округ "Город Калининград"', iKey: 'GORODSKOI OKRUG GOROD KALININGRAD'},
// 5 {key: 'GUR', value: 'Гурьевский городской округ', iKey: 'GUREVSKII GORODSKOI OKRUG'},
// 6 {key: 'GUS', value: 'Гусевский городской округ', iKey: 'GUSEVSKII GORODSKOI OKRUG'},
// 7 {key: 'ZEL', value: 'Зеленоградский городской округ', iKey: 'ZELENOGRADSKII GORODSKOI OKRUG'},
// 8 {key: 'KRS', value: 'Краснознаменский городской округ', iKey: 'KRASNOZNAMENSKII GORODSKOI OKRUG'},
// 9 {key: 'LAD', value: 'Ладушкинский городской округ', iKey: 'LADUSHKINSKII GORODSKOI OKRUG'},
// 10 {key: 'MAM', value: 'Мамоновский городской округ', iKey: 'MAMONOVSKII GORODSKOI OKRUG'},
// 11 {key: 'NEM', value: 'Неманский городской округ', iKey: 'NEMANSKII GORODSKOI OKRUG'},
// 12 {key: 'NER', value: 'Неманский муниципальный район', iKey: 'NEMANSKII MUNITSIPALNII RAION'},
// 13 {key: 'NES', value: 'Нестеровский район', iKey: 'NESTEROVSKII RAION'},
// 14 {key: 'OZR', value: 'Озёрский городской округ', iKey: 'OZERSKII GORODSKOI OKRUG'},
// 15 {key: 'PIO', value: 'Пионерский городской округ', iKey: 'PIONERSKII GORODSKOI OKRUG'},
// 16 {key: 'POL', value: 'Полесский городской округ', iKey: 'POLESSKII GORODSKOI OKRUG'},
// 17 {key: 'PRV', value: 'Правдинский городской округ', iKey: 'PRAVDINSKII GORODSKOI OKRUG'},
// 18 {key: 'STL', value: 'Светловский городской округ', iKey: 'SVETLOVSKII GORODSKOI OKRUG'},
// 19 {key: 'SVL', value: 'Светлогорский район', iKey: 'SVETLOGORSKII RAION'},
// 20 {key: 'SLA', value: 'Славский городской округ', iKey: 'SLAVSKII GORODSKOI OKRUG'},
// 21 {key: 'SOV', value: 'Советский городской округ', iKey: 'SOVETSKII GORODSKOI OKRUG'},
// 22 {key: 'CHE', value: 'Черняховский городской округ', iKey: 'CHERNYAHOVSKII GORODSKOI OKRUG'},
// 23 {key: 'CHR', value: 'Черняховский район', iKey: 'CHERNYAHOVSKII RAION'},
// 24 {key: 'YAN', value: 'Янтарный городской округ', iKey: 'YANTARNII GORODSKOI OKRUG'},

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

const architects = {
    'П. Мюльбах': '99e33f06-19ab-4fc4-916b-45ef6b141617',
    'Ф. Хайтманн': '91188ce6-7e6c-4673-b041-7c2e3e6180dd',
    'Ф. Ларс': 'b8da20a8-2e60-4019-b675-7866c941a77d',
    'Рихард Зеел': '12e79a7b-2be0-45d4-afd5-762d97c8209d',
    'Вадим Еремеев': '06244c93-7870-45d5-aca5-8eeb456d3c10',
    'Ханс Хопп': 'c57537a7-aa46-4f50-9e8e-8bae5da9914c',
    'О.В.Кукук': 'be5195f0-006c-42cf-b78e-21468fb0ee63',
    'В. Браш': '8573b988-4317-4c70-a48a-7de31456085e',
    Фишер: '529ed38e-a327-4016-9f98-391b003b5d80',
    'В. Варрентрапп': 'ec52dfd5-9db8-4aa1-8ff4-81a28a3f410b',
    'П. Бростовски': 'ad87d92e-bdd1-4541-a366-ca4d0af53fcb',
    'Курт Фрик': 'ac86531d-eda6-4424-ac16-c00c4df27e3a',
    'Генрих Тессин': '18a5ffb2-15c4-4e93-9717-2feb2e2556aa',
    'Хайнц Бар': 'e88fb21e-8859-4262-a01a-732d7900c29f',
    'А. Вайтмайер': 'd526aeb2-f60d-4063-8274-25a9f1c9f5bd',
    'Макс Шенвальд': 'cc3945e8-e065-43f7-b1c4-e3701cdde1ee',
    'Курт Фрик': 'f98d70a6-4a18-4fe3-9839-bf42c16d6000',
};

// const MAX = 100;
let count = 0;

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
            // if (count > MAX) {
            //     break;
            // }
            count += 1;
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

            let itemArchitects = [];
            if (oldItem.architect) {
                let itemArchitectNames = [];
                if (oldItem.architect === 'Рихард Зеел / Вадим Еремеев') {
                    itemArchitectNames = ['Рихард Зеел', 'Вадим Еремеев'];
                } else {
                    itemArchitectNames = oldItem.architect
                        .split(',')
                        .map((i) => i.trim());
                }

                itemArchitects = itemArchitectNames.map(
                    (arch) => architects[arch],
                );
                // console.log(itemArchitectNames);
                // console.log(itemArchitects);
            }

            let itemPhotos = [];

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
                                uploaded = true;
                            }
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
                                        id: v4(),
                                        preview: true,
                                        header: true,
                                        variants: {
                                            original: fileKey,
                                            normalized: normalizedFileKey,
                                        },
                                    },
                                ];
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
                constructionYearStart: years[0] ?? 0,
                constructionYearEnd: years[1] ?? 0,
                lossYearStart: makeYear(oldItem.tearDownPeriod),
                lossYearEnd: makeYear(oldItem.tearDownPeriod),
                lost: oldItem.condition === 'L',
                altered: oldItem.condition === 'R',
                remarkable: !!oldItem.remarkable,
                condition: conditionMap[oldItem.condition] ?? 0,
                location: oldItem.location ?? [],
                locationDescription: oldItem.locationDescription,
                locationArea: areaMap[oldItem.area] ?? 0,
                kind: (oldItem.kind ?? [])
                    .map((kindItem) => kindMap[kindItem])
                    .filter((x) => !!x),
                materials: (oldItem.technology ?? [])
                    .map((techItem) => materialMap[techItem])
                    .filter((x) => !!x),
                photos: itemPhotos,
                createdAt: new Date().toISOString(),
                version: 1,
                heritageStatus: statusMap[oldItem.status] ?? 0,
                heritageLevel: levelMap[oldItem.level] ?? 0,
                heritageId: oldItem.code ?? '',
                architects: itemArchitects,
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
