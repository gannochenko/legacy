export class CodeId {
    constructor({ databaseEntityManager, connection } = {}) {
        this.databaseEntityManager = databaseEntityManager;
        this.connection = connection;
    }

    addCode(code, entityName) {
        console.log(code + ' ' + entityName);
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
