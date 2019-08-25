import { Connection, EntitySchema, In, ObjectLiteral } from 'typeorm';
import {
    ENTITY_PK_FIELD_NAME,
    ENTITY_ID_FIELD_NAME,
    // @ts-ignore
} from 'project-minimum-core';

export class IdMapper {
    private readonly connection: Connection;
    private idToInternal: StringMap<number> = {};
    private idToGet: StringMap<string[]> = {};
    private entities: StringMap = {};

    public constructor({ connection }: { connection?: Connection } = {}) {
        if (!connection) {
            throw new Error('No connection passed');
        }

        this.connection = connection;
    }

    public addId(id: string, databaseEntity: EntitySchema) {
        if (this.idToInternal[id]) {
            return;
        }

        const entityName = databaseEntity.options.name;

        this.entities[entityName] = databaseEntity;
        this.idToGet[entityName] = this.idToGet[entityName] || [];
        this.idToGet[entityName].push(id);
    }

    public getInternalId(id: string) {
        return this.idToInternal[id] || null;
    }

    public async obtain() {
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
                        (items as ObjectLiteral[]).forEach(item => {
                            this.idToInternal[item[ENTITY_ID_FIELD_NAME]] =
                                item[ENTITY_PK_FIELD_NAME];
                        });
                    });
            }),
        );
    }
}
