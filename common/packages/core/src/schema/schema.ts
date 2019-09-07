import _ from '@bucket-of-bolts/microdash';
import { Entity } from './entity';

export class Schema {
    public constructor(declaration = {}) {
        this.declaration = declaration;
    }

    async getHealth() {
        const errors = [];
        const schema = this.getSchema();

        if (!schema.length) {
            // nothing to check
            return errors;
        }

        // check health of each entity
        const times = {};
        schema.forEach(entity => {
            times[entity.getName()] =
                entity.getName() in times ? times[entity.getName()] + 1 : 1;
        });

        Object.keys(times).forEach(key => {
            if (times[key] > 1) {
                errors.push({
                    message: `Entity "${times[key]}" met several times`,
                    code: 'entity_duplicate',
                    entityName: times[key],
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
            const rName = field.getReferenceFieldName();
            if (!this.getEntity(rName)) {
                errors.push({
                    message: `Entity "${rName}" is referenced, but not created`,
                    code: 'field_broken_reference',
                    fieldName: rName,
                });
            }
        });

        return errors;
    }

    getSanitizedDeclaration(declaration) {
        if (!_.isObjectNotEmpty(declaration)) {
            declaration = {};
        }
        if (!_.isArrayNotEmpty(declaration.schema)) {
            declaration.schema = [];
        }

        let version = parseInt(declaration.version, 10);
        if (Number.isNaN(version)) {
            version = 0;
        }

        return {
            schema: declaration.schema.map(entity => new Entity(entity)),
            version,
        };
    }

    toJSON() {
        return this.declarationInternal;
    }

    set declaration(declaration) {
        this.declarationInternal = this.getSanitizedDeclaration(declaration);
    }

    get declaration() {
        return this.declarationInternal;
    }

    /**
     * @deprecated
     * @returns {{schema: Entity[], version: number}|*}
     */
    getDeclaration() {
        return this.declarationInternal;
    }

    /**
     * @deprecated
     * @returns {{schema: Entity[], version: number}|*}
     */
    get() {
        return this.declarationInternal;
    }

    getSchema() {
        return this.declaration.schema;
    }

    getVersion() {
        return this.declaration.version;
    }

    /**
     * Returns entity by it's name
     * @param name
     * @returns {T | undefined}
     */
    getEntity(name) {
        // todo: make an index here
        return this.declaration.schema.find(
            entity => entity.getName() === name,
        );
    }

    getReferences() {
        let refs = [];
        this.declaration.schema.forEach(entity => {
            refs = _.union(refs, entity.getReferences());
        });

        return refs;
    }

    isEmpty() {
        return !this.declaration.schema.length;
    }
}
