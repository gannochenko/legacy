import { In } from 'typeorm';
import {
    ENTITY_PK_FIELD_NAME,
    ENTITY_ID_FIELD_NAME,
} from 'project-minimum-core';

export class IdMapper {
    constructor({ connection } = {}) {
        this.connection = connection;

        this.idToInternal = {};
        this.idToGet = {};
        this.entities = {};
    }

    addId(id, databaseEntity) {
        if (this.idToInternal[id]) {
            return;
        }

        const entityName = databaseEntity.options.name;

        this.entities[entityName] = databaseEntity;
        this.idToGet[entityName] = this.idToGet[entityName] || [];
        this.idToGet[entityName].push(id);
    }

    getInternalId(id) {
        return this.idToInternal[id] || null;
    }

    async obtain() {
        await Promise.all(
            Object.keys(this.idToGet).map(entityName => {
                const entity = this.entities[entityName];
                const repository = this.connection.getRepository(entity);
                return repository
                    .find({
                        where: {
                            [ENTITY_ID_FIELD_NAME]: In(
                                this.idToGet[entityName],
                            ),
                        },
                        select: [ENTITY_PK_FIELD_NAME, ENTITY_ID_FIELD_NAME],
                    })
                    .then(items => {
                        items.forEach(item => {
                            this.idToInternal[item[ENTITY_ID_FIELD_NAME]] =
                                item[ENTITY_PK_FIELD_NAME];
                        });
                    });
            }),
        );
    }
}
