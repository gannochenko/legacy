import { In } from 'typeorm';

export class CodeId {
    constructor({ connection } = {}) {
        this.connection = connection;

        this.codeToId = {};
        this.codeToGet = {};
    }

    addCode(code, entityName) {
        if (this.codeToId[code]) {
            return;
        }

        this.codeToGet[entityName] = this.codeToGet[entityName] || [];
        this.codeToGet[entityName].push(code);
    }

    getId(code) {
        return this.codeToId[code] || null;
    }

    async obtain() {
        const items = await Promise.all(
            Object.keys(this.codeToGet).map(entityName => {
                const repository = this.connection.getRepository(entityName);
                return repository.find({
                    where: { code: In(this.codeToGet[entityName]) },
                    // select: ['id', 'code'],
                });
            }),
        );

        console.log(items);
    }
}

// const referenceType = singleReferences[i].getActualType();

// const refEntityName = refs[i].type;
// // need to replace code with id
// const refDBEntity = await entityManager.getByName(
//     refEntityName,
// );
// const repo = connection.getRepository(refDBEntity);
// const refItem = await repo.findOne({
//     where: { code: data[referenceName] },
//     select: ['id'],
// });
// if (refItem) {
//     data[referenceName] = refItem.id;
// } else {
//     data[referenceName] = null;
// }
