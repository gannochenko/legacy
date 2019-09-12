import _ from '@bucket-of-bolts/microdash';
import { Entity } from './entity';
import {
    SchemaDeclarationUnsafe,
    SchemaDeclaration,
    ObjectMap,
    SchemaError,
} from './type';
import { ReferenceField } from './field';

export class Schema {
    protected declarationInternal: SchemaDeclaration;

    public constructor(declaration: SchemaDeclarationUnsafe = {}) {
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }

    public set declaration(declaration: SchemaDeclaration) {
        this.declarationInternal = declaration;
    }

    public get declaration() {
        return this.declarationInternal;
    }

    public async getHealth() {
        const errors: SchemaError[] = [];
        const schema = this.getSchema();

        if (!schema.length) {
            // nothing to check
            return errors;
        }

        // check health of each entity
        const times: ObjectMap<number> = {};
        schema.forEach(entity => {
            times[entity.getName()] =
                entity.getName() in times ? times[entity.getName()] + 1 : 1;
        });

        Object.keys(times).forEach(key => {
            if (times[key] > 1) {
                errors.push({
                    message: `Entity "${key}" met several times`,
                    code: 'entity_duplicate',
                    entityName: key,
                });
            }
        });

        await Promise.all(
            schema.map(entity =>
                entity.getHealth().then(entityErrors => {
                    entityErrors.forEach(entityError => {
                        errors.push(Object.assign({}, entityError));
                    });
                }),
            ),
        );

        // check that all referenced fields are there
        this.getReferences().forEach(field => {
            const referenceName = field.getReferencedEntityName();
            if (
                !(typeof referenceName === 'string') ||
                !this.getEntity(referenceName)
            ) {
                errors.push({
                    message: `Entity "${referenceName}" is referenced, but not created`,
                    code: 'field_broken_reference',
                    fieldName: referenceName || '',
                });
            }
        });

        return errors;
    }

    public getSafeDeclaration(declaration: SchemaDeclarationUnsafe = {}) {
        const safeDeclaration: SchemaDeclaration = {
            version: 0,
            schema: [],
        };

        if (typeof declaration.version === 'string') {
            const safeVersion = parseInt(declaration.version, 10);
            if (!Number.isNaN(safeVersion)) {
                safeDeclaration.version = safeVersion;
            }
        } else if (typeof declaration.version === 'number') {
            safeDeclaration.version = declaration.version;
        }

        if (declaration.schema && _.isArray(declaration.schema)) {
            safeDeclaration.schema = declaration.schema.map(
                entity => new Entity(entity),
            );
        }

        return safeDeclaration;
    }

    public toJSON() {
        return this.declarationInternal;
    }

    public getSchema() {
        return this.declaration.schema;
    }

    public getVersion() {
        return this.declaration.version;
    }

    /**
     * Returns entity by it's name
     */
    public getEntity(name: string) {
        // todo: make an index here
        return this.declaration.schema.find(
            entity => entity.getName() === name,
        );
    }

    public getReferences() {
        let refs: ReferenceField[] = [];
        this.declaration.schema.forEach(entity => {
            refs = _.union(refs, entity.getReferences());
        });

        return refs;
    }

    public isEmpty() {
        return !this.declaration.schema.length;
    }
}
