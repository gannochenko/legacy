'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
const entity_1 = require('./entity');
class Schema {
    constructor(declaration = {}) {
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    set declaration(declaration) {
        this.declarationInternal = declaration;
    }
    get declaration() {
        return this.declarationInternal;
    }
    async getHealth() {
        const errors = [];
        const schema = this.getSchema();
        if (!schema.length) {
            return errors;
        }
        const times = {};
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
        this.getReferences().forEach(field => {
            const referenceName = field.getReferencedEntityName();
            if (!this.getEntity(referenceName)) {
                errors.push({
                    message: `Entity "${referenceName}" is referenced, but not created`,
                    code: 'field_broken_reference',
                    fieldName: referenceName || '',
                });
            }
        });
        return errors;
    }
    getSafeDeclaration(declaration = {}) {
        const safeDeclaration = {
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
        if (
            declaration.schema &&
            microdash_1.default.isArray(declaration.schema)
        ) {
            safeDeclaration.schema = declaration.schema.map(
                entity => new entity_1.Entity(entity),
            );
        }
        return safeDeclaration;
    }
    toJSON() {
        return this.declarationInternal;
    }
    getSchema() {
        return this.declaration.schema;
    }
    getVersion() {
        return this.declaration.version;
    }
    getEntity(name) {
        return this.declaration.schema.find(
            entity => entity.getName() === name,
        );
    }
    getReferences() {
        let refs = [];
        this.declaration.schema.forEach(entity => {
            refs = microdash_1.default.union(refs, entity.getReferences());
        });
        return refs;
    }
    isEmpty() {
        return !this.declaration.schema.length;
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map
