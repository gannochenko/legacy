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
                s = 'group',
                a = 'code',
                c = 'string',
                u = 'integer',
                o = 'boolean',
                l = 'datetime';
            var m = n(1),
                h = n(0),
                f = n(2),
                d = n.n(f),
                g = n(3),
                p = n.n(g),
                _ = n(4),
                y = n.n(_),
                N = n(5),
                E = n.n(N),
                T = {
                    isArray: Array.isArray,
                    isString: d.a,
                    isObject: p.a,
                    union: y.a,
                    iane: e => Array.isArray(e) && e.length > 0,
                    ione: e => p()(e) && Object.keys(e).length > 0,
                    isne: e => d()(e) && e.length > 0,
                    unique: E.a,
                };
            class b {
                constructor(e) {
                    T.ione(e) || (e = {}), (this.schema = e);
                }
                checkHealth() {
                    const e = [],
                        { schema: t } = this;
                    return (
                        T.isne(t.name) ||
                            e.push({
                                message: 'Field does not have a name',
                                code: 'field_name_empty',
                                reference: null,
                            }),
                        T.isne(this.getActualType()) ||
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
                    if (this.getType() === c) {
                        const e = parseInt(this.schema.length, 10);
                        return Number.isNaN(e) ? r : e;
                    }
                    return null;
                }
                getName() {
                    return this.schema.name;
                }
                getDisplayName() {
                    return T.isne(this.schema.label)
                        ? this.schema.label
                        : Object(m.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferencedEntityName() {
                    const e = this.getActualType();
                    return [c, o, l, u].indexOf(e) >= 0 ? null : e;
                }
                getReferenceFieldName() {
                    return this.getReferencedEntityName();
                }
                isMultiple() {
                    return T.isArray(this.schema.type);
                }
                isReference() {
                    return T.isne(this.getReferencedEntityName());
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
            class A extends b {
                checkHealth() {
                    const e = super.checkHealth(),
                        { schema: t } = this;
                    t.unique ||
                        e.push({
                            message: 'System field "code" should be unique',
                            code: 'field_code_not_unique',
                            reference: t.name,
                        }),
                        this.getActualType() !== c &&
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
            class R {
                constructor(e) {
                    let t = e;
                    T.ione(t) || (t = {}),
                        T.iane(t.schema) || (t.schema = []),
                        (this.schema = {
                            name: t.name || '',
                            schema: t.schema.map(e =>
                                e.name === a ? new A(e) : new b(e),
                            ),
                        });
                }
                checkHealth() {
                    let e = [];
                    const { schema: t } = this;
                    T.isne(t.name) ||
                        e.push({
                            message: 'Entity does not have a name',
                            code: 'entity_name_empty',
                            reference: null,
                        }),
                        T.iane(t.schema) ||
                            e.push({
                                message: 'Entity does not have a single field',
                                code: 'entityschema_empty',
                                reference: t.name,
                            });
                    const n = {};
                    return (
                        t.schema.forEach(r => {
                            const i = r.checkHealth();
                            T.iane(i) && (e = T.union(e, i)),
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
                        !T.isne(t.name) ||
                            (t.name !== i && t.name !== s) ||
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
                    return Object(m.convertToCamel)(
                        this.getName().toLowerCase(),
                    );
                }
                getDisplayName() {
                    return Object(m.uCFirst)(this.getName()).replace(/_/g, ' ');
                }
                getReferences() {
                    return this.schema.schema
                        .map(e =>
                            T.isne(e.getReferenceFieldName()) ? e : null,
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
                            e => e.getType() === c && e.getName() !== a,
                        ) || null
                    );
                }
                getValidator() {
                    const e = {};
                    return (
                        this.schema.schema.forEach(t => {
                            let n = null;
                            if (t.isReference()) n = h.string();
                            else {
                                const e = t.getActualType();
                                n =
                                    e === u
                                        ? h.number().integer()
                                        : e === o
                                        ? h.boolean()
                                        : e === l
                                        ? h.date()
                                        : h.string();
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
                    return T.ione(e)
                        ? (this.getFields().forEach(n => {
                              const r = n.getName();
                              if (r === a) return;
                              if (!(r in e)) return;
                              let i = e[r];
                              n.isMultiple()
                                  ? ((i = T.isArray(i)
                                        ? i.map(e => this.castFieldValue(n, e))
                                        : []),
                                    n.isReference() && (i = T.unique(i)))
                                  : (i = this.castFieldValue(n, i)),
                                  (t[r] = i);
                          }),
                          t)
                        : t;
                }
                castFieldValue(e, t) {
                    const n = e.getActualType();
                    let r = t;
                    if (n === c) r = null == r ? '' : r.toString();
                    else if (n === o) r = !!r;
                    else if (n === u)
                        (r = parseInt(r, 10)), Number.isNaN(r) && (r = 0);
                    else if (n === l) {
                        if (null == r) return '';
                        if (r instanceof Date) r = r.toISOString();
                        else if (Number.isNaN(Date.parse(r))) return '';
                    } else
                        e.isReference()
                            ? T.isString(r) ||
                              (T.isObject(r)
                                  ? a in r &&
                                    ((r = r[a]), T.isne(r) || (r = ''))
                                  : (r = ''))
                            : (r = '');
                    return r;
                }
            }
            class O {
                constructor(e) {
                    T.iane(e) || (e = []), (this.schema = e.map(e => new R(e)));
                }
                checkHealth() {
                    let e = [];
                    const { schema: t } = this;
                    if (!T.iane(t)) return e;
                    const n = {};
                    return (
                        t.forEach(t => {
                            const r = t.checkHealth();
                            T.iane(r) && (e = T.union(e, r)),
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
                            e = T.union(e, t.getReferences());
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
                    return i;
                }),
                n.d(t, 'ENTITY_GROUP_NAME', function() {
                    return s;
                }),
                n.d(t, 'ENTITY_CODE_FIELD_NAME', function() {
                    return a;
                }),
                n.d(t, 'TYPE_STRING', function() {
                    return c;
                }),
                n.d(t, 'TYPE_INTEGER', function() {
                    return u;
                }),
                n.d(t, 'TYPE_BOOLEAN', function() {
                    return o;
                }),
                n.d(t, 'TYPE_DATETIME', function() {
                    return l;
                }),
                n.d(t, 'Schema', function() {
                    return O;
                }),
                n.d(t, 'CodeField', function() {
                    return A;
                }),
                n.d(t, 'Field', function() {
                    return b;
                }),
                n.d(t, 'Entity', function() {
                    return R;
                });
        },
    ]),
);
