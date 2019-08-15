!(function(e, t) {
    for (var r in t) e[r] = t[r];
})(
    exports,
    (function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function(e, t, n) {
                r.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (r.t = function(e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule)
                    return e;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && 'string' != typeof e)
                )
                    for (var i in e)
                        r.d(
                            n,
                            i,
                            function(t) {
                                return e[t];
                            }.bind(null, i),
                        );
                return n;
            }),
            (r.n = function(e) {
                var t =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return r.d(t, 'a', t), t;
            }),
            (r.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ''),
            r((r.s = 5))
        );
    })([
        function(e, t) {
            e.exports = require('yup');
        },
        function(e, t) {
            e.exports = require('ew-internals');
        },
        function(e, t) {
            e.exports = require('lodash.isobject');
        },
        function(e, t) {
            e.exports = require('lodash.union');
        },
        function(e, t) {
            e.exports = require('lodash.uniq');
        },
        function(e, t, r) {
            'use strict';
            r.r(t);
            const n = 'id',
                i = 'idInternal',
                a = 36,
                s = 255,
                l = 'string';
            var o = r(1),
                u = r(0),
                c = r(2),
                d = r.n(c),
                h = r(3),
                m = r.n(h),
                g = r(4),
                f = r.n(g),
                p = {
                    isArray: Array.isArray,
                    isString: e => 'string' == typeof e,
                    isObject: d.a,
                    union: m.a,
                    iane: e => Array.isArray(e) && e.length > 0,
                    ione: e => d()(e) && Object.keys(e).length > 0,
                    isne: e => 'string' == typeof e && e.length > 0,
                    unique: f.a,
                };
            class y {
                constructor(e = {}) {
                    this.declaration = e;
                }
                async getHealth() {
                    const e = [],
                        t = this.getName(),
                        r = this.getType(),
                        n = this.isMultiple(),
                        a = this.isUnique();
                    return (
                        p.isne(t) ||
                            e.push({
                                message: 'Field does not have a name',
                                code: 'field_name_empty',
                                fieldName: '',
                            }),
                        p.isne(r) ||
                            e.push({
                                message: 'Field does not have a type',
                                code: 'field_type_empty',
                                fieldName: t || '',
                            }),
                        n &&
                            a &&
                            e.push({
                                message:
                                    'The field can not be both multiple and unique',
                                code: 'field_multiple_unique_conflict',
                                fieldName: t || '',
                            }),
                        t === i &&
                            e.push({
                                message: `The following name is system-reserved: ${t}`,
                                code: 'field_name_illegal',
                                fieldName: t,
                            }),
                        e
                    );
                }
                set declaration(e) {
                    this.declarationInternal = this.getSanitizedDeclaration(e);
                }
                get declaration() {
                    return this.declarationInternal;
                }
                getSanitizedDeclaration(e) {
                    const t = [
                            'type',
                            'name',
                            'label',
                            'length',
                            'required',
                            'unique',
                            'preview',
                            'system',
                        ],
                        r = {};
                    Object.keys(e).forEach(n => {
                        t.includes(n) && (r[n] = e[n]);
                    });
                    const n = this.getDeclarationValidator();
                    try {
                        n.validateSync(e, { abortEarly: !1 });
                    } catch (e) {
                        if (!(e instanceof u.ValidationError)) throw e;
                        e.inner.forEach(e => {
                            delete r[e.path];
                        });
                    }
                    const { type: i } = r;
                    return (
                        p.isne(i) ||
                            (p.isArray(i) && 1 === i.length && p.isne(i[0])) ||
                            delete r.type,
                        r
                    );
                }
                getDeclarationValidator() {
                    return (
                        this.fieldValidator ||
                            (this.fieldValidator = u.object().shape({
                                name: u
                                    .string()
                                    .typeError('Field name should be a string')
                                    .strict(!0)
                                    .required('Field should have a name'),
                                label: u
                                    .string()
                                    .typeError('Field label should be a string')
                                    .strict(!0),
                                length: u
                                    .number()
                                    .typeError(
                                        'Field length should be a number',
                                    ),
                                required: u
                                    .boolean()
                                    .typeError(
                                        'Field required flag should be boolean',
                                    ),
                                unique: u
                                    .boolean()
                                    .typeError(
                                        'Field unique flag should be boolean',
                                    ),
                                preview: u
                                    .boolean()
                                    .typeError(
                                        'Field preview flag should be boolean',
                                    ),
                                system: u
                                    .boolean()
                                    .typeError('System flag should be boolean'),
                            })),
                        this.fieldValidator
                    );
                }
                getType() {
                    return this.declaration.type || null;
                }
                getActualType() {
                    const e = this.getType();
                    return e ? (this.isMultiple() ? e[0] : e) : null;
                }
                getLength() {
                    return null;
                }
                getName() {
                    return this.declaration.name;
                }
                getDisplayName() {
                    return p.isne(this.declaration.label)
                        ? this.declaration.label
                        : Object(o.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getDeclaration() {
                    return this.declaration;
                }
                isMultiple() {
                    return p.isArray(this.declaration.type);
                }
                isSortable() {
                    return !(this.isMultiple() || this.isReference());
                }
                isRequired() {
                    return !0 === this.declaration.required;
                }
                isPreview() {
                    return !0 === this.declaration.preview;
                }
                isUnique() {
                    return !0 === this.declaration.unique;
                }
                isSystem() {
                    return !0 === this.declaration.system;
                }
                toJSON() {
                    return this.declaration;
                }
                castValue(e) {
                    return this.isMultiple()
                        ? p.isArray(e)
                            ? e
                                  .map(e => this.castValueItem(e))
                                  .filter(e => null != e)
                            : e
                        : this.castValueItem(e);
                }
                castValueItem(e) {
                    return e;
                }
                getValidator() {
                    let e = this.createValueItemValidator();
                    return (
                        this.isMultiple() && (e = u.array().of(e)),
                        (e = this.isRequired()
                            ? e.required(`${this.getDisplayName()} is required`)
                            : e.nullable())
                    );
                }
                createValueItemValidator() {
                    throw new Error('Not implemented');
                }
                getReferencedEntityName() {
                    return null;
                }
                isReference() {
                    return !1;
                }
                getTypeErrorMessage(e) {
                    return `The value of '${this.getDisplayName()}' is not ${e}`;
                }
            }
            class E extends y {
                getLength() {
                    const e = parseInt(this.declaration.length, 10);
                    return Number.isNaN(e) ? s : e;
                }
                castValueItem(e) {
                    return null == e ? null : e.toString();
                }
                createValueItemValidator() {
                    return u
                        .string()
                        .typeError(this.getTypeErrorMessage('a string'));
                }
            }
            class _ extends y {
                castValueItem(e) {
                    return null == e ? null : !!e;
                }
                createValueItemValidator() {
                    return u
                        .boolean()
                        .typeError(this.getTypeErrorMessage('a boolean'));
                }
            }
            class N extends y {
                castValueItem(e) {
                    if (null == e) return null;
                    const t = parseInt(e, 10);
                    return Number.isNaN(t) ? e : t;
                }
                createValueItemValidator() {
                    return u
                        .number()
                        .integer()
                        .typeError(this.getTypeErrorMessage('an integer'));
                }
            }
            class b extends y {
                castValueItem(e) {
                    if (null == e) return null;
                    if (e instanceof Date) return e.toISOString();
                    const t = Date.parse(e);
                    return Number.isNaN(t)
                        ? Number.isNaN(parseInt(e, 10))
                            ? e
                            : new Date(parseInt(e, 10)).toISOString()
                        : new Date(t).toISOString();
                }
                createValueItemValidator() {
                    return u
                        .date()
                        .typeError(this.getTypeErrorMessage('a date'));
                }
            }
            class I extends y {
                async getHealth() {
                    const e = await super.getHealth(),
                        t = this.getName(),
                        r = this.isUnique(),
                        n = this.isPreview();
                    return (
                        r &&
                            e.push({
                                message:
                                    'The reference field should not be declared as unique',
                                code: 'field_reference_unique_conflict',
                                fieldName: t,
                            }),
                        n &&
                            e.push({
                                message:
                                    'The reference field should not be declared as preview',
                                code: 'field_reference_preview_conflict',
                                fieldName: t,
                            }),
                        e
                    );
                }
                isReference() {
                    return !0;
                }
                getReferencedEntityName() {
                    return this.getActualType();
                }
                createValueItemValidator() {
                    return u
                        .string()
                        .typeError(this.getTypeErrorMessage('a string'));
                }
                castValueItem(e) {
                    return null != e ? e.toString() : null;
                }
                castValue(e) {
                    return this.isMultiple()
                        ? p.isArray(e)
                            ? p
                                  .unique(e.map(e => this.castValueItem(e)))
                                  .filter(e => !!e)
                            : []
                        : this.castValueItem(e);
                }
            }
            class T extends E {
                async getHealth() {
                    const e = await super.getHealth(),
                        t = this.getName(),
                        r = this.isSystem(),
                        i = this.isUnique(),
                        s = this.getLength();
                    r ||
                        e.push({
                            message: `The field should be declared as system-reserved: ${t}`,
                            code: 'field_not_system',
                            fieldName: t,
                        }),
                        i ||
                            e.push({
                                message: `System field "${n}" should be unique`,
                                code: 'field_id_not_unique',
                                fieldName: t,
                            }),
                        this.getActualType() !== l &&
                            e.push({
                                message: `System field "${n}" should be string`,
                                code: 'field_id_not_string',
                                fieldName: t,
                            }),
                        this.isMultiple() &&
                            e.push({
                                message: `System field "${n}" should not be multiple`,
                                code: 'field_id_multiple',
                                fieldName: t,
                            });
                    const o = parseInt(s, 10);
                    return (
                        (Number.isNaN(o) || o !== a) &&
                            e.push({
                                message: `System field "${n}" should have length of ${a}`,
                                code: 'field_id_illegal_length',
                                fieldName: t,
                            }),
                        e
                    );
                }
                createValueItemValidator() {
                    return u
                        .string()
                        .length(
                            a,
                            `Field '${this.getDisplayName()}' should be ${a} characters long`,
                        )
                        .typeError(this.getTypeErrorMessage('a string'));
                }
            }
            const D = e => {
                let { type: t } = e;
                const { name: r } = e;
                return t
                    ? (p.isArray(t) && ([t] = t),
                      t
                          ? r === n
                              ? new T(e)
                              : t === l
                              ? new E(e)
                              : 'boolean' === t
                              ? new _(e)
                              : 'integer' === t
                              ? new N(e)
                              : 'datetime' === t
                              ? new b(e)
                              : new I(e)
                          : new (void 0)(e))
                    : new E(e);
            };
            class F {
                constructor(e) {
                    this.declaration = e;
                }
                set declaration(e) {
                    this.declarationInternal = this.getSanitizedDeclaration(e);
                }
                get declaration() {
                    return this.declarationInternal;
                }
                getSanitizedDeclaration(e) {
                    let t = e;
                    return (
                        p.ione(t) || (t = {}),
                        p.iane(t.schema) || (t.schema = []),
                        { name: t.name || '', schema: t.schema.map(e => D(e)) }
                    );
                }
                async getHealth() {
                    const e = [],
                        { declaration: t } = this;
                    if (
                        (t.name.length ||
                            e.push({
                                message: 'Entity does not have a name',
                                code: 'entity_name_empty',
                                entityName: '',
                            }),
                        !t.schema.length)
                    )
                        return (
                            e.push({
                                message: 'Entity does not have a single field',
                                code: 'entity_schema_empty',
                                entityName: t.name || '',
                            }),
                            e
                        );
                    const r = {};
                    return (
                        t.schema.forEach(e => {
                            r[e.getName()] =
                                e.getName() in r ? r[e.getName()] + 1 : 1;
                        }),
                        Object.keys(r).forEach(n => {
                            r[n] > 1 &&
                                e.push({
                                    message: `Field "${n}" met several times`,
                                    code: 'entity_field_duplicate',
                                    fieldName: n,
                                    entityName: t.name || '',
                                });
                        }),
                        r[n] ||
                            e.push({
                                message: 'Entity does not have id field',
                                code: 'entity_no_id_field',
                                entityName: t.name || '',
                            }),
                        await Promise.all(
                            t.schema.map(r =>
                                r.getHealth().then(r => {
                                    r.forEach(r => {
                                        e.push(
                                            Object.assign({}, r, {
                                                entityName: t.name,
                                            }),
                                        );
                                    });
                                }),
                            ),
                        ),
                        e
                    );
                }
                getName() {
                    return this.declaration.name;
                }
                getCamelName() {
                    return Object(o.convertToCamel)(
                        this.getName().toLowerCase(),
                    );
                }
                getDisplayName() {
                    return Object(o.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getFields() {
                    return this.declaration.schema;
                }
                getReferences() {
                    return this.getFields().filter(e => e.isReference());
                }
                getSingleReferences() {
                    return this.getFields().filter(
                        e => e.isReference() && !e.isMultiple(),
                    );
                }
                getMultipleReferences() {
                    return this.getFields().filter(
                        e => e.isReference() && e.isMultiple(),
                    );
                }
                getField(e) {
                    return this.declaration.schema[e];
                }
                toJSON() {
                    return this.declaration;
                }
                getPreviewField() {
                    const e = this.declaration.schema.find(
                        e =>
                            e.getType() === l &&
                            e.getName() !== n &&
                            e.isPreview(),
                    );
                    return (
                        e ||
                        (this.declaration.schema.find(
                            e => e.getType() === l && e.getName() !== n,
                        ) ||
                            null)
                    );
                }
                getValidator() {
                    const e = {};
                    return (
                        this.declaration.schema.forEach(t => {
                            e[t.getName()] = t.getValidator();
                        }),
                        u.object().shape(e)
                    );
                }
                castData(e) {
                    const t = {};
                    return p.ione(e)
                        ? (this.getFields().forEach(r => {
                              const n = r.getName();
                              n in e && (t[n] = r.castValue(e[n]));
                          }),
                          t)
                        : t;
                }
                async validateData(e) {
                    let t = null;
                    try {
                        await this.getValidator().validate(e, {
                            abortEarly: !1,
                        });
                    } catch (e) {
                        t = p.isArray(e.inner)
                            ? e.inner.map(e => ({
                                  message: e.message,
                                  fieldName: e.path,
                              }))
                            : [{ message: 'Internal error', fieldName: '' }];
                    }
                    return t;
                }
            }
            class S {
                constructor(e = {}) {
                    this.declaration = e;
                }
                async getHealth() {
                    const e = [],
                        t = this.getSchema();
                    if (!t.length) return e;
                    const r = {};
                    return (
                        t.forEach(e => {
                            r[e.getName()] =
                                e.getName() in r ? r[e.getName()] + 1 : 1;
                        }),
                        Object.keys(r).forEach(t => {
                            r[t] > 1 &&
                                e.push({
                                    message: `Entity "${
                                        r[t]
                                    }" met several times`,
                                    code: 'entity_duplicate',
                                    entityName: r[t],
                                });
                        }),
                        await Promise.all(
                            t.map(t =>
                                t.getHealth().then(t => {
                                    t.forEach(t => {
                                        e.push(Object.assign({}, t));
                                    });
                                }),
                            ),
                        ),
                        this.getReferences().forEach(t => {
                            const r = t.getReferenceFieldName();
                            this.getEntity(r) ||
                                e.push({
                                    message: `Entity "${r}" is referenced, but not created`,
                                    code: 'field_broken_reference',
                                    fieldName: r,
                                });
                        }),
                        e
                    );
                }
                getSanitizedDeclaration(e) {
                    p.ione(e) || (e = {}), p.iane(e.schema) || (e.schema = []);
                    let t = parseInt(e.version, 10);
                    return (
                        Number.isNaN(t) && (t = 0),
                        { schema: e.schema.map(e => new F(e)), version: t }
                    );
                }
                toJSON() {
                    return this.declarationInternal;
                }
                set declaration(e) {
                    this.declarationInternal = this.getSanitizedDeclaration(e);
                }
                get declaration() {
                    return this.declarationInternal;
                }
                getDeclaration() {
                    return this.declarationInternal;
                }
                get() {
                    return this.declarationInternal;
                }
                getSchema() {
                    return this.declaration.schema;
                }
                getVersion() {
                    return this.declaration.version;
                }
                getEntity(e) {
                    return this.declaration.schema.find(t => t.getName() === e);
                }
                getReferences() {
                    let e = [];
                    return (
                        this.declaration.schema.forEach(t => {
                            e = p.union(e, t.getReferences());
                        }),
                        e
                    );
                }
                isEmpty() {
                    return !this.declaration.schema.length;
                }
            }
            r.d(t, 'ENTITY_ID_FIELD_NAME', function() {
                return n;
            }),
                r.d(t, 'ENTITY_PK_FIELD_NAME', function() {
                    return i;
                }),
                r.d(t, 'REFERENCE_ENTITY_PARENT_FIELD_NAME', function() {
                    return 'self';
                }),
                r.d(t, 'REFERENCE_ENTITY_CHILD_FIELD_NAME', function() {
                    return 'rel';
                }),
                r.d(t, 'ENTITY_ID_FIELD_LENGTH', function() {
                    return a;
                }),
                r.d(t, 'DB_TABLE_PREFIX', function() {
                    return 'eq_';
                }),
                r.d(t, 'DB_REF_TABLE_PREFIX', function() {
                    return 'eq_ref_';
                }),
                r.d(t, 'DB_ENTITY_TABLE_PREFIX', function() {
                    return 'eq_e_';
                }),
                r.d(t, 'DB_MIGRATION_TABLE_NAME', function() {
                    return 'eq_migrations';
                }),
                r.d(t, 'DB_SCHEMA_TABLE_NAME', function() {
                    return 'eq_schema';
                }),
                r.d(t, 'DB_IDENTIFIER_LENGTH', function() {
                    return 63;
                }),
                r.d(t, 'DB_VARCHAR_DEF_LENGTH', function() {
                    return s;
                }),
                r.d(t, 'ENTITY_ID_FIELD_LENGTH', function() {
                    return 36;
                }),
                r.d(t, 'DB_QUERY_FIND_MAX_PAGE_SIZE', function() {
                    return 50;
                }),
                r.d(t, 'FIELD_TYPE_STRING', function() {
                    return l;
                }),
                r.d(t, 'FIELD_TYPE_INTEGER', function() {
                    return 'integer';
                }),
                r.d(t, 'FIELD_TYPE_BOOLEAN', function() {
                    return 'boolean';
                }),
                r.d(t, 'FIELD_TYPE_DATETIME', function() {
                    return 'datetime';
                }),
                r.d(t, 'Schema', function() {
                    return S;
                }),
                r.d(t, 'Entity', function() {
                    return F;
                }),
                r.d(t, 'StringField', function() {
                    return E;
                }),
                r.d(t, 'IdStringField', function() {
                    return T;
                }),
                r.d(t, 'IntegerField', function() {
                    return N;
                }),
                r.d(t, 'BooleanField', function() {
                    return _;
                }),
                r.d(t, 'DateTimeField', function() {
                    return b;
                }),
                r.d(t, 'ReferenceField', function() {
                    return I;
                });
        },
    ]),
);
