!(function(e, t) {
    for (var n in t) e[n] = t[n];
})(
    exports,
    (function(e) {
        var t = {};
        function n(r) {
            if (t[r]) return t[r].exports;
            var s = (t[r] = { i: r, l: !1, exports: {} });
            return e[r].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
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
                    for (var s in e)
                        n.d(
                            r,
                            s,
                            function(t) {
                                return e[t];
                            }.bind(null, s),
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
            n((n.s = 5))
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
        function(e, t, n) {
            'use strict';
            n.r(t);
            const r = 255,
                s = 'user',
                i = 'group',
                a = 'code';
            var c = n(1),
                u = n(0),
                o = n(2),
                l = n.n(o),
                m = n(3),
                h = n.n(m),
                f = n(4),
                d = n.n(f),
                g = {
                    isArray: Array.isArray,
                    isString: l.a,
                    union: d.a,
                    iane: e => Array.isArray(e) && e.length > 0,
                    ione: e => h()(e) && Object.keys(e).length > 0,
                    isne: e => l()(e) && e.length > 0,
                };
            const p = 'string',
                _ = 'integer',
                y = 'boolean',
                N = 'datetime';
            class E {
                constructor(e) {
                    g.ione(e) || (e = {}), (this.schema = e);
                }
                checkHealth() {
                    const e = [],
                        t = this.schema;
                    return (
                        g.isne(t.name) ||
                            e.push({
                                message: 'Field does not have a name',
                                code: 'field_name_empty',
                                reference: null,
                            }),
                        g.isne(this.getActualType()) ||
                            e.push({
                                message: 'Field does not have a type',
                                code: 'field_type_empty',
                                reference: t.name,
                            }),
                        e
                    );
                }
                getType() {
                    return this.schema.type || null;
                }
                getActualType() {
                    const e = this.getType();
                    return e ? (this.isMultiple() ? e[0] : e) : null;
                }
                getLength() {
                    if (this.getType() === p) {
                        const e = parseInt(this.schema.length, 10);
                        return Number.isNaN(e) ? r : e;
                    }
                    return null;
                }
                getName() {
                    return this.schema.name;
                }
                getDisplayName() {
                    return g.isne(this.schema.label)
                        ? this.schema.label
                        : Object(c.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferencedEntityName() {
                    const e = this.getActualType();
                    return [p, y, N, _].indexOf(e) >= 0 ? null : e;
                }
                getReferenceFieldName() {
                    return this.getReferencedEntityName();
                }
                isMultiple() {
                    return g.isArray(this.schema.type);
                }
                isReference() {
                    return g.isne(this.getReferencedEntityName());
                }
                isSortable() {
                    return !this.isMultiple() && !this.isReference();
                }
                isMandatory() {
                    return !0 === this.schema.required;
                }
                isPreview() {
                    return !0 === this.schema.preview;
                }
                toJSON() {
                    return this.schema;
                }
            }
            class b extends E {
                checkHealth() {
                    const e = super.checkHealth(),
                        { schema: t } = this;
                    t.unique ||
                        e.push({
                            message: 'System field "code" should be unique',
                            code: 'field_code_not_unique',
                            reference: t.name,
                        }),
                        this.getActualType() !== p &&
                            e.push({
                                message:
                                    'System field "code" should be of type string',
                                code: 'field_code_not_string',
                                reference: t.name,
                            }),
                        this.isMultiple() &&
                            e.push({
                                message:
                                    'System field "code" should not be multiple',
                                code: 'field_code_multiple',
                                reference: t.name,
                            });
                    const n = parseInt(t.length, 10);
                    return (
                        (Number.isNaN(n) || n <= 0) &&
                            e.push({
                                message:
                                    'System field "code" should have a finite length',
                                code: 'field_code_illegal_length',
                                reference: t.name,
                            }),
                        e
                    );
                }
            }
            class T {
                constructor(e) {
                    g.ione(e) || (e = {}),
                        g.iane(e.schema) || (e.schema = []),
                        (this.schema = {
                            name: e.name || '',
                            schema: e.schema.map(e =>
                                e.name === a ? new b(e) : new E(e),
                            ),
                        });
                }
                checkHealth() {
                    let e = [];
                    const { schema: t } = this;
                    g.isne(t.name) ||
                        e.push({
                            message: 'Entity does not have a name',
                            code: 'entity_name_empty',
                            reference: null,
                        }),
                        g.iane(t.schema) ||
                            e.push({
                                message: 'Entity does not have a single field',
                                code: 'entityschema_empty',
                                reference: t.name,
                            });
                    const n = {};
                    return (
                        t.schema.forEach(r => {
                            const s = r.checkHealth();
                            g.iane(s) && (e = g.union(e, s)),
                                r.getName() in n &&
                                    e.push({
                                        message: `Field "${r.getName()}" met several times`,
                                        code: 'entity_field_duplicate',
                                        reference: t.name,
                                    }),
                                (n[r.getName()] =
                                    r.getName() in n ? n[r.getName()] + 1 : 1);
                        }),
                        a in n ||
                            e.push({
                                message: 'System field "code" is missing',
                                code: 'entity_code_field_missing',
                                reference: t.name,
                            }),
                        !g.isne(t.name) ||
                            (t.name !== s && t.name !== i) ||
                            e.push({
                                message: 'Entity name is a reserved name',
                                code: 'entity_name_reserved',
                                reference: t.name,
                            }),
                        e
                    );
                }
                getName() {
                    return this.schema.name;
                }
                getCamelName() {
                    return Object(c.convertToCamel)(
                        this.getName().toLowerCase(),
                    );
                }
                getDisplayName() {
                    return Object(c.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferences() {
                    return this.schema.schema
                        .map(e =>
                            g.isne(e.getReferenceFieldName()) ? e : null,
                        )
                        .filter(e => e);
                }
                getFields() {
                    return this.schema.schema;
                }
                toJSON() {
                    return this.schema;
                }
                getPresentationField() {
                    return (
                        this.schema.schema.find(
                            e => e.getType() === p && e.getName() !== a,
                        ) || null
                    );
                }
                getValidator() {
                    const e = {};
                    return (
                        this.schema.schema.forEach(t => {
                            let n = null;
                            if (t.isReference()) n = u.string();
                            else {
                                const e = t.getActualType();
                                n =
                                    e === _
                                        ? u.number().integer()
                                        : e === y
                                        ? u.boolean()
                                        : e === N
                                        ? u.date()
                                        : u.string();
                            }
                            t.isMultiple() && (n = u.array().of(n)),
                                (n = t.isMandatory()
                                    ? n.required(
                                          `${t.getDisplayName()} is required`,
                                      )
                                    : n.nullable()),
                                (e[t.getName()] = n);
                        }),
                        u.object().shape(e)
                    );
                }
                prepareData(e) {
                    const t = {};
                    return g.ione(e)
                        ? (this.getFields().forEach(n => {
                              const r = n.getName();
                              if (r === a) return;
                              if (!(r in e)) return;
                              let s = e[r];
                              n.isMultiple()
                                  ? ((s = g.isArray(s)
                                        ? s.map(e => this.castFieldValue(n, e))
                                        : []),
                                    n.isReference() && (s = g.unique(s)))
                                  : (s = this.castFieldValue(n, s)),
                                  (t[r] = s);
                          }),
                          t)
                        : t;
                }
                castFieldValue(e, t) {
                    const n = e.getActualType();
                    if (n === p) t = null == t ? '' : t.toString();
                    else if (n === y) t = !!t;
                    else if (n === _)
                        (t = parseInt(t, 10)), Number.isNaN(t) && (t = 0);
                    else if (n === N) {
                        if (null == t) return '';
                        if (t instanceof Date) t = t.toISOString();
                        else if (Number.isNaN(Date.parse(t))) return '';
                    } else
                        e.isReference()
                            ? g.isString(t) ||
                              (g.isObject(t)
                                  ? a in t &&
                                    ((t = t[a]), g.isne(t) || (t = ''))
                                  : (t = ''))
                            : (t = '');
                    return t;
                }
            }
            class A {
                constructor(e) {
                    g.iane(e) || (e = []), (this.schema = e.map(e => new T(e)));
                }
                checkHealth() {
                    let e = [];
                    const t = this.schema;
                    if (!g.iane(t)) return e;
                    const n = {};
                    return (
                        t.forEach(t => {
                            const r = t.checkHealth();
                            g.iane(r) && (e = g.union(e, r)),
                                t.getName() in n &&
                                    e.push({
                                        message: `Entity "${t.getName()}" met several times`,
                                        code: 'entity_duplicate',
                                        reference: t.getName(),
                                    }),
                                (n[t.getName()] =
                                    t.getName() in n ? n[t.getName()] + 1 : 1);
                        }),
                        this.getReferences().forEach(t => {
                            const n = t.getReferenceFieldName();
                            this.getEntity(n) ||
                                e.push({
                                    message: `Entity "${n}" is referenced, but not presented`,
                                    code: 'field_broken_reference',
                                    reference: n,
                                });
                        }),
                        e
                    );
                }
                toJSON() {
                    return this.schema;
                }
                get() {
                    return this.schema;
                }
                getEntity(e) {
                    return this.schema.find(t => t.getName() === e);
                }
                getReferences() {
                    let e = [];
                    return (
                        this.schema.forEach(t => {
                            e = g.union(e, t.getReferences());
                        }),
                        e
                    );
                }
                isEmpty() {
                    return !this.schema.length;
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
                n.d(t, 'QUERY_FIND_MAX_PAGE_SIZE', function() {
                    return 50;
                }),
                n.d(t, 'ENTITY_USER_NAME', function() {
                    return s;
                }),
                n.d(t, 'ENTITY_GROUP_NAME', function() {
                    return i;
                }),
                n.d(t, 'ENTITY_CODE_FIELD_NAME', function() {
                    return a;
                }),
                n.d(t, 'Schema', function() {
                    return A;
                }),
                n.d(t, 'CodeField', function() {
                    return b;
                }),
                n.d(t, 'Field', function() {
                    return E;
                }),
                n.d(t, 'Entity', function() {
                    return T;
                });
        },
    ]),
);
