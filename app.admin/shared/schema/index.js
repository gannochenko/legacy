import Entity from './entity';

export default class Schema {
    constructor(declaration) {
        if (!_.iane(declaration)) {
            declaration = [];
        }
        this._schema = declaration.map(entity => new Entity(entity));
    }

    checkHealth() {
        let errors = [];
        const schema = this._schema;

        if (!_.iane(schema)) {
            // nothing to check
            return errors;
        }

        // check health of each entity
        const times = {};
        schema.forEach(entity => {
            const fErrors = entity.checkHealth();
            if (_.iane(fErrors)) {
                errors = _.union(errors, fErrors);
            }

            if (entity.getName() in times) {
                errors.push({
                    message: `Entity "${entity.getName()}" met several times`,
                    code: 'entity_duplicate',
                    reference: entity.getName(),
                });
            }

            times[entity.getName()] =
                entity.getName() in times ? times[entity.getName()] + 1 : 1;
        });

        // check that all referenced fields are there
        this.getReferences().forEach(field => {
            const rName = field.getReferenceFieldName();
            if (!this.getEntity(rName)) {
                errors.push({
                    message: `Entity "${rName}" is referenced, but not presented`,
                    code: 'field_broken_reference',
                    reference: rName,
                });
            }
        });

        // todo: check that there are still User and Group entities left intact

        return errors;
    }

    toJSON() {
        return this._schema;
    }

    get() {
        return this._schema;
    }

    getEntity(name) {
        return this._schema.find(entity => entity.getName() === name);
    }

    getReferences() {
        let refs = [];
        this._schema.forEach(entity => {
            refs = _.union(refs, entity.getReferences());
        });

        return refs;
    }

    isEmpty() {
        return !this._schema.length;
    }
}
