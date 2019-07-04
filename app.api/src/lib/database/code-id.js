import { In } from 'typeorm';

export class CodeId {
    constructor({ connection } = {}) {
        this.connection = connection;

        this.codeToId = {};
        this.codeToGet = {};
        this.entities = {};
    }

    addCode(code, databaseEntity) {
        if (this.codeToId[code]) {
            return;
        }

        const entityName = databaseEntity.options.name;

        this.entities[entityName] = databaseEntity;
        this.codeToGet[entityName] = this.codeToGet[entityName] || [];
        this.codeToGet[entityName].push(code);
    }

    getId(code) {
        return this.codeToId[code] || null;
    }

    async obtain() {
        await Promise.all(
            Object.keys(this.codeToGet).map(entityName => {
                const entity = this.entities[entityName];
                const repository = this.connection.getRepository(entity);
                return repository
                    .find({
                        where: { code: In(this.codeToGet[entityName]) },
                        select: ['id', 'code'],
                    })
                    .then(items => {
                        items.forEach(item => {
                            this.codeToId[item.code] = item.id;
                        });
                    });
            }),
        );
    }
}
