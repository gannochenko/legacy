!(function(e, t) {
    for (var n in t) e[n] = t[n];
})(
    exports,
    (function(e) {
        var t = {};
        function n(r) {
            if (t[r]) return t[r].exports;
            var i = (t[r] = { i: r, l: !1, exports: {} });
            return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
        }
        return (
            (n.m = e),
            (n.c = t),
            (n.d = function(e, t, r) {
                n.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: r });
            }),
            (n.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (n.t = function(e, t) {
                if ((1 & t && (e = n(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule)
                    return e;
                var r = Object.create(null);
                if (
                    (n.r(r),
                    Object.defineProperty(r, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && 'string' != typeof e)
                )
                    for (var i in e)
                        n.d(
                            r,
                            i,
                            function(t) {
                                return e[t];
                            }.bind(null, i),
                        );
                return r;
            }),
            (n.n = function(e) {
                var t =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return n.d(t, 'a', t), t;
            }),
            (n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (n.p = ''),
            n((n.s = 6))
        );
    })([
        function(e, t) {
            e.exports = require('yup');
        },
        function(e, t) {
            e.exports = require('ew-internals');
        },
        function(e, t) {
            e.exports = require('lodash.isstring');
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
        function(e, t, n) {
            'use strict';
            n.r(t);
            const r = 255,
                i = 'user',
                a = 'group',
                s = 'code',
                l = 'string',
                o = 'integer',
                u = 'boolean',
                c = 'datetime';
            var d = n(1),
                h = n(0),
                m = n(2),
                f = n.n(m),
                g = n(3),
                p = n.n(g),
                y = n(4),
                _ = n.n(y),
                N = n(5),
                E = n.n(N),
                b = {
                    isArray: Array.isArray,
                    isString: f.a,
                    isObject: p.a,
                    union: _.a,
                    iane: e => Array.isArray(e) && e.length > 0,
                    ione: e => p()(e) && Object.keys(e).length > 0,
                    isne: e => f()(e) && e.length > 0,
                    unique: E.a,
                };
            class T {
                constructor(e) {
                    b.ione(e) || (e = {}),
                        (this.declaration = {
                            name: e.name,
                            type: e.type,
                            label: e.label,
                            length: e.length,
                            required: e.required,
                            unique: e.unique,
                            preview: e.preview,
                        });
                }
                async getHealth() {
                    const e = [],
                        { declaration: t } = this,
                        { type: n } = t,
                        r = this.getValidator();
                    try {
                        await r.validate(t, { abortEarly: !1 });
                    } catch (t) {
                        if (!(t instanceof h.ValidationError)) throw t;
                        t.inner.forEach(t => {
                            e.push({
                                message: t.message,
                                code: 'field_illegal',
                                fieldName: t.path,
                            });
                        });
                    }
                    return (
                        b.isne(n) ||
                            (b.isArray(n) && 1 === n.length && b.isne(n[0])) ||
                            e.push({
                                message:
                                    'Field type should be of type string or an array of one string',
                                code: 'field_type_illegal',
                                fieldName: t.name || '',
                            }),
                        e
                    );
                }
                getValidator() {
                    return (
                        this.fieldValidator ||
                            (this.fieldValidator = h.object().shape({
                                name: h
                                    .string()
                                    .typeError('Field name should be a string')
                                    .strict(!0)
                                    .required('Field should have a name'),
                                label: h
                                    .string()
                                    .typeError('Field label should be a string')
                                    .strict(!0),
                                length: h
                                    .number()
                                    .typeError(
                                        'Field length should be a number',
                                    ),
                                required: h
                                    .boolean()
                                    .typeError(
                                        'Field required flag should be boolean',
                                    ),
                                unique: h
                                    .boolean()
                                    .typeError(
                                        'Field unique flag should be boolean',
                                    ),
                                preview: h
                                    .boolean()
                                    .typeError(
                                        'Field preview flag should be boolean',
                                    ),
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
                    if (this.getType() === l) {
                        const e = parseInt(this.declaration.length, 10);
                        return Number.isNaN(e) ? r : e;
                    }
                    return null;
                }
                getName() {
                    return this.declaration.name;
                }
                getDisplayName() {
                    return b.isne(this.declaration.label)
                        ? this.declaration.label
                        : Object(d.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferencedEntityName() {
                    const e = this.getActualType();
                    return [l, u, c, o].indexOf(e) >= 0 ? null : e;
                }
                getReferenceFieldName() {
                    return this.getReferencedEntityName();
                }
                getDeclaration() {
                    return this.declaration;
                }
                isMultiple() {
                    return b.isArray(this.declaration.type);
                }
                isReference() {
                    return b.isne(this.getReferencedEntityName());
                }
                isSortable() {
                    return !this.isMultiple() && !this.isReference();
                }
                isMandatory() {
                    return !0 === this.declaration.required;
                }
                isPreview() {
                    return !0 === this.declaration.preview;
                }
                toJSON() {
                    return this.declaration;
                }
            }
            class F extends T {
                async getHealth() {
                    const e = await super.getHealth(),
                        { declaration: t } = this;
                    t.required ||
                        e.push({
                            message: 'System field "code" should be mandatory',
                            code: 'field_code_not_mandatory',
                            fieldName: t.name,
                        }),
                        t.unique ||
                            e.push({
                                message: 'System field "code" should be unique',
                                code: 'field_code_not_unique',
                                fieldName: t.name,
                            }),
                        this.getActualType() !== l &&
                            e.push({
                                message:
                                    'System field "code" should be of type string',
                                code: 'field_code_not_string',
                                fieldName: t.name,
                            }),
                        this.isMultiple() &&
                            e.push({
                                message:
                                    'System field "code" should not be multiple',
                                code: 'field_code_multiple',
                                fieldName: t.name,
                            });
                    const n = parseInt(t.length, 10);
                    return (
                        (Number.isNaN(n) || n <= 0) &&
                            e.push({
                                message:
                                    'System field "code" should have a finite length',
                                code: 'field_code_illegal_length',
                                fieldName: t.name,
                            }),
                        e
                    );
                }
            }
            class v {
                constructor(e) {
                    let t = e;
                    b.ione(t) || (t = {}),
                        b.iane(t.schema) || (t.schema = []),
                        (this.declaration = {
                            name: t.name || '',
                            schema: t.schema.map(e =>
                                e.name === s ? new F(e) : new T(e),
                            ),
                        });
                }
                async getHealth() {
                    const e = [],
                        { declaration: t } = this;
                    b.isne(t.name) ||
                        e.push({
                            message: 'Entity does not have a name',
                            code: 'entity_name_empty',
                            entityName: '',
                        }),
                        !b.isne(t.name) ||
                            (t.name !== i && t.name !== a) ||
                            e.push({
                                message: 'Entity name is a reserved name',
                                code: 'entity_name_reserved',
                                entityName: t.name,
                            }),
                        b.iane(t.schema) ||
                            e.push({
                                message: 'Entity does not have a single field',
                                code: 'entity_schema_empty',
                                entityName: t.name,
                            });
                    const n = {};
                    return (
                        t.schema.forEach(e => {
                            n[e.getName()] =
                                e.getName() in n ? n[e.getName()] + 1 : 1;
                        }),
                        s in n ||
                            e.push({
                                message: 'System field "code" is missing',
                                code: 'entity_code_field_missing',
                                entityName: t.name,
                            }),
                        Object.keys(n).forEach(r => {
                            n[r] > 1 &&
                                e.push({
                                    message: `Field "${
                                        n[r]
                                    }" met several times`,
                                    code: 'entity_field_duplicate',
                                    fieldName: n[r],
                                    entityName: t.name,
                                });
                        }),
                        await Promise.all(
                            t.schema.map(n =>
                                n.getHealth().then(n => {
                                    n.forEach(n => {
                                        e.push(
                                            Object.assign({}, n, {
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
                    return Object(d.convertToCamel)(
                        this.getName().toLowerCase(),
                    );
                }
                getDisplayName() {
                    return Object(d.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferences() {
                    return this.declaration.schema.filter(e => e.isReference());
                }
                getFields() {
                    return this.declaration.schema;
                }
                getField(e) {
                    return this.declaration.schema[e];
                }
                toJSON() {
                    return this.declaration;
                }
                getPreviewField() {
                    return (
                        this.declaration.schema.find(
                            e => e.getType() === l && e.getName() !== s,
                        ) || null
                    );
                }
                getValidator() {
                    const e = {};
                    return (
                        this.declaration.schema.forEach(t => {
                            let n = null;
                            if (t.isReference())
                                n = h
                                    .string()
                                    .typeError(
                                        `Reference field '${t.getDisplayName()}' is not a string`,
                                    );
                            else {
                                const e = t.getActualType();
                                n =
                                    e === o
                                        ? h
                                              .number()
                                              .integer()
                                              .typeError(
                                                  `Field '${t.getDisplayName()}' is not a number`,
                                              )
                                        : e === u
                                        ? h
                                              .boolean()
                                              .typeError(
                                                  `Field '${t.getDisplayName()}' is not a boolean`,
                                              )
                                        : e === c
                                        ? h
                                              .datetime()
                                              .typeError(
                                                  `Field '${t.getDisplayName()}' is not a date`,
                                              )
                                        : h
                                              .string()
                                              .typeError(
                                                  `Field '${t.getDisplayName()}' is not a string`,
                                              );
                            }
                            t.isMultiple() && (n = h.array().of(n)),
                                (n = t.isMandatory()
                                    ? n.required(
                                          `${t.getDisplayName()} is required`,
                                      )
                                    : n.nullable()),
                                (e[t.getName()] = n);
                        }),
                        h.object().shape(e)
                    );
                }
                prepareData(e) {
                    const t = {};
                    return b.ione(e)
                        ? (this.getFields().forEach(n => {
                              const r = n.getName();
                              if (r === s) return;
                              if (!(r in e)) return;
                              let i = e[r];
                              n.isMultiple()
                                  ? (b.isArray(i) &&
                                        (i = (i = i.map(e =>
                                            this.castFieldValue(n, e),
                                        )).filter(e => null !== e)),
                                    n.isReference() &&
                                        (i = b.unique(i).filter(e => !!e)))
                                  : (i = this.castFieldValue(n, i)),
                                  (t[r] = i);
                          }),
                          t)
                        : t;
                }
                async validateData(e) {
                    let t = null,
                        n = null;
                    try {
                        t = await this.getValidator().validate(e, {
                            abortEarly: !1,
                        });
                    } catch (e) {
                        n = e.inner.map(e => ({
                            message: e.message,
                            field: e.path,
                        }));
                    }
                    return { data: t, errors: n };
                }
                castFieldValue(e, t) {
                    const n = e.getActualType();
                    let r = t;
                    if (n === l) r = null == r ? null : r.toString();
                    else if (n === u) r = !!r;
                    else if (n === o) r = parseInt(r, 10);
                    else if (n === c) {
                        if (null == r) return null;
                        if (r instanceof Date) r = r.toISOString();
                        else {
                            const e = Date.parse(r);
                            Number.isNaN(e)
                                ? Number.isNaN(parseInt(r, 10)) ||
                                  (r = new Date(parseInt(r, 10)).toISOString())
                                : (r = new Date(e).toISOString());
                        }
                    } else
                        e.isReference() &&
                            (r = null != r ? r.toString() : null);
                    return r;
                }
            }
            class A {
                constructor(e) {
                    b.ione(e) || (e = {}), b.iane(e.schema) || (e.schema = []);
                    let t = parseInt(e.version, 10);
                    Number.isNaN(t) && (t = 0),
                        (this.declaration = {
                            schema: e.schema.map(e => new v(e)),
                            version: t,
                        });
                }
                async getHealth() {
                    const e = [],
                        { declaration: t } = this,
                        { schema: n } = t;
                    if (!b.iane(n)) return e;
                    const r = {};
                    return (
                        n.forEach(e => {
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
                            n.map(t =>
                                t.getHealth().then(t => {
                                    t.forEach(t => {
                                        e.push(Object.assign({}, t));
                                    });
                                }),
                            ),
                        ),
                        this.getReferences().forEach(t => {
                            const n = t.getReferenceFieldName();
                            this.getEntity(n) ||
                                e.push({
                                    message: `Entity "${n}" is referenced, but not created`,
                                    code: 'field_broken_reference',
                                    fieldName: n,
                                });
                        }),
                        e
                    );
                }
                toJSON() {
                    return this.declaration;
                }
                getDeclaration() {
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
                getEntity(e) {
                    return this.declaration.schema.find(t => t.getName() === e);
                }
                getReferences() {
                    let e = [];
                    return (
                        this.declaration.schema.forEach(t => {
                            e = b.union(e, t.getReferences());
                        }),
                        e
                    );
                }
                isEmpty() {
                    return !this.declaration.schema.length;
                }
            }
            n.d(t, 'DB_TABLE_PREFIX', function() {
                return 'eq_';
            }),
                n.d(t, 'DB_REF_TABLE_PREFIX', function() {
                    return 'eq_ref_';
                }),
                n.d(t, 'DB_ENTITY_TABLE_PREFIX', function() {
                    return 'eq_e_';
                }),
                n.d(t, 'DB_MIGRATION_TABLE_NAME', function() {
                    return 'eq_migrations';
                }),
                n.d(t, 'DB_SCHEMA_TABLE_NAME', function() {
                    return 'eq_schema';
                }),
                n.d(t, 'DB_IDENTIFIER_LENGTH', function() {
                    return 63;
                }),
                n.d(t, 'DB_VARCHAR_DEF_LENGTH', function() {
                    return r;
                }),
                n.d(t, 'DB_CODE_COLUMN_LENGTH', function() {
                    return 36;
                }),
                n.d(t, 'DB_QUERY_FIND_MAX_PAGE_SIZE', function() {
                    return 50;
                }),
                n.d(t, 'ENTITY_USER_NAME', function() {
                    return i;
                }),
                n.d(t, 'ENTITY_GROUP_NAME', function() {
                    return a;
                }),
                n.d(t, 'ENTITY_ID_FIELD_NAME', function() {
                    return s;
                }),
                n.d(t, 'FIELD_TYPE_STRING', function() {
                    return l;
                }),
                n.d(t, 'FIELD_TYPE_INTEGER', function() {
                    return o;
                }),
                n.d(t, 'FIELD_TYPE_BOOLEAN', function() {
                    return u;
                }),
                n.d(t, 'FIELD_TYPE_DATETIME', function() {
                    return c;
                }),
                n.d(t, 'Schema', function() {
                    return A;
                }),
                n.d(t, 'CodeField', function() {
                    return F;
                }),
                n.d(t, 'Field', function() {
                    return T;
                }),
                n.d(t, 'Entity', function() {
                    return v;
                });
        },
    ]),
);
