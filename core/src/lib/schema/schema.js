import { Entity } from './entity';
import _ from '../lodash';

export class Schema {
    constructor(declaration) {
        if (!_.ione(declaration)) {
            declaration = {};
        }
        if (!_.iane(declaration.schema)) {
            declaration.schema = [];
        }

        let version = parseInt(declaration.version, 10);
        if (Number.isNaN(version)) {
            version = 0;
        }

        this.declaration = {
            schema: declaration.schema.map(entity => new Entity(entity)),
            version,
        };
    }

    async checkHealth() {
        let errors = [];
        const { declaration } = this;
        const { schema } = declaration;

        if (!_.iane(schema)) {
            // nothing to check
            return errors;
        }

        // check health of each entity
        const times = {};
        schema.forEach(entity => {
            // const fErrors = entity.checkHealth();
            // if (_.iane(fErrors)) {
            //     errors = _.union(errors, fErrors);
            // }

            // if (entity.getName() in times) {
            //     errors.push({
            //         message: `Entity "${entity.getName()}" met several times`,
            //         code: 'entity_duplicate',
            //         reference: entity.getName(),
            //     });
            // }

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
                entity.checkHealth().then(entityErrors => {
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

        // todo: check that there are still User and Group entities left intact

        return errors;
    }

    toJSON() {
        return this.declaration;
    }

    get() {
        return this.declaration;
    }

    getSchema() {
        return this.declaration.schema;
    }

    getVersion() {
        return this.declaration.version;
    }

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
