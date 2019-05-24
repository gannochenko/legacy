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
            var r = ''.concat('eq_', 'ref_'),
                i = ''.concat('eq_', 'e_'),
                a = ''.concat('eq_', 'migrations'),
                u = ''.concat('eq_', 'schema'),
                o = 'code',
                c = n(1),
                s = n(0),
                l = n(2),
                f = n.n(l),
                h = n(3),
                m = n.n(h),
                y = n(4),
                p = n.n(y),
                d = n(5),
                g = n.n(d),
                v = {
                    isArray: Array.isArray,
                    isString: f.a,
                    isObject: m.a,
                    union: p.a,
                    iane: function(e) {
                        return Array.isArray(e) && e.length > 0;
                    },
                    ione: function(e) {
                        return m()(e) && Object.keys(e).length > 0;
                    },
                    isne: function(e) {
                        return f()(e) && e.length > 0;
                    },
                    unique: g.a,
                };
            function _(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var b = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        v.ione(t) || (t = {}),
                        (this.schema = t);
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'checkHealth',
                            value: function() {
                                var e = [],
                                    t = this.schema;
                                return (
                                    v.isne(t.name) ||
                                        e.push({
                                            message:
                                                'Field does not have a name',
                                            code: 'field_name_empty',
                                            reference: null,
                                        }),
                                    v.isne(this.getActualType()) ||
                                        e.push({
                                            message:
                                                'Field does not have a type',
                                            code: 'field_type_empty',
                                            reference: t.name,
                                        }),
                                    e
                                );
                            },
                        },
                        {
                            key: 'getType',
                            value: function() {
                                return this.schema.type || null;
                            },
                        },
                        {
                            key: 'getActualType',
                            value: function() {
                                var e = this.getType();
                                return e
                                    ? this.isMultiple()
                                        ? e[0]
                                        : e
                                    : null;
                            },
                        },
                        {
                            key: 'getLength',
                            value: function() {
                                if (this.getType() === TYPE_STRING) {
                                    var e = parseInt(this.schema.length, 10);
                                    return Number.isNaN(e) ? 255 : e;
                                }
                                return null;
                            },
                        },
                        {
                            key: 'getName',
                            value: function() {
                                return this.schema.name;
                            },
                        },
                        {
                            key: 'getDisplayName',
                            value: function() {
                                return v.isne(this.schema.label)
                                    ? this.schema.label
                                    : Object(c.uCFirst)(this.getName()).replace(
                                          /_/g,
                                          ' ',
                                      );
                            },
                        },
                        {
                            key: 'getReferencedEntityName',
                            value: function() {
                                var e = this.getActualType();
                                return [
                                    TYPE_STRING,
                                    TYPE_BOOLEAN,
                                    TYPE_DATETIME,
                                    TYPE_INTEGER,
                                ].indexOf(e) >= 0
                                    ? null
                                    : e;
                            },
                        },
                        {
                            key: 'getReferenceFieldName',
                            value: function() {
                                return this.getReferencedEntityName();
                            },
                        },
                        {
                            key: 'isMultiple',
                            value: function() {
                                return v.isArray(this.schema.type);
                            },
                        },
                        {
                            key: 'isReference',
                            value: function() {
                                return v.isne(this.getReferencedEntityName());
                            },
                        },
                        {
                            key: 'isSortable',
                            value: function() {
                                return (
                                    !this.isMultiple() && !this.isReference()
                                );
                            },
                        },
                        {
                            key: 'isMandatory',
                            value: function() {
                                return !0 === this.schema.required;
                            },
                        },
                        {
                            key: 'isPreview',
                            value: function() {
                                return !0 === this.schema.preview;
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.schema;
                            },
                        },
                    ]) && _(t.prototype, n),
                    r && _(t, r),
                    e
                );
            })();
            function E(e) {
                return (E =
                    'function' == typeof Symbol &&
                    'symbol' == typeof Symbol.iterator
                        ? function(e) {
                              return typeof e;
                          }
                        : function(e) {
                              return e &&
                                  'function' == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof e;
                          })(e);
            }
            function N(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function T(e, t) {
                return !t || ('object' !== E(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function k(e, t, n) {
                return (k =
                    'undefined' != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function(e, t, n) {
                              var r = (function(e, t) {
                                  for (
                                      ;
                                      !Object.prototype.hasOwnProperty.call(
                                          e,
                                          t,
                                      ) && null !== (e = O(e));

                                  );
                                  return e;
                              })(e, t);
                              if (r) {
                                  var i = Object.getOwnPropertyDescriptor(r, t);
                                  return i.get ? i.get.call(n) : i.value;
                              }
                          })(e, t, n || e);
            }
            function O(e) {
                return (O = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function R(e, t) {
                return (R =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var A = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        T(this, O(t).apply(this, arguments))
                    );
                }
                var n, r, i;
                return (
                    (function(e, t) {
                        if ('function' != typeof t && null !== t)
                            throw new TypeError(
                                'Super expression must either be null or a function',
                            );
                        (e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            t && R(e, t);
                    })(t, b),
                    (n = t),
                    (r = [
                        {
                            key: 'checkHealth',
                            value: function() {
                                var e = k(
                                        O(t.prototype),
                                        'checkHealth',
                                        this,
                                    ).call(this),
                                    n = this.schema;
                                n.unique ||
                                    e.push({
                                        message:
                                            'System field "code" should be unique',
                                        code: 'field_code_not_unique',
                                        reference: n.name,
                                    }),
                                    'string' !== this.getActualType() &&
                                        e.push({
                                            message:
                                                'System field "code" should be of type string',
                                            code: 'field_code_not_string',
                                            reference: n.name,
                                        }),
                                    this.isMultiple() &&
                                        e.push({
                                            message:
                                                'System field "code" should not be multiple',
                                            code: 'field_code_multiple',
                                            reference: n.name,
                                        });
                                var r = parseInt(n.length, 10);
                                return (
                                    (Number.isNaN(r) || r <= 0) &&
                                        e.push({
                                            message:
                                                'System field "code" should have a finite length',
                                            code: 'field_code_illegal_length',
                                            reference: n.name,
                                        }),
                                    e
                                );
                            },
                        },
                    ]) && N(n.prototype, r),
                    i && N(n, i),
                    t
                );
            })();
            function S(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var P = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        v.ione(t) || (t = {}),
                        v.iane(t.schema) || (t.schema = []),
                        (this.schema = {
                            name: t.name || '',
                            schema: t.schema.map(function(e) {
                                return e.name === o ? new A(e) : new b(e);
                            }),
                        });
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'checkHealth',
                            value: function() {
                                var e = [],
                                    t = this.schema;
                                v.isne(t.name) ||
                                    e.push({
                                        message: 'Entity does not have a name',
                                        code: 'entity_name_empty',
                                        reference: null,
                                    }),
                                    v.iane(t.schema) ||
                                        e.push({
                                            message:
                                                'Entity does not have a single field',
                                            code: 'entityschema_empty',
                                            reference: t.name,
                                        });
                                var n = {};
                                return (
                                    t.schema.forEach(function(r) {
                                        var i = r.checkHealth();
                                        v.iane(i) && (e = v.union(e, i)),
                                            r.getName() in n &&
                                                e.push({
                                                    message: 'Field "'.concat(
                                                        r.getName(),
                                                        '" met several times',
                                                    ),
                                                    code:
                                                        'entity_field_duplicate',
                                                    reference: t.name,
                                                }),
                                            (n[r.getName()] =
                                                r.getName() in n
                                                    ? n[r.getName()] + 1
                                                    : 1);
                                    }),
                                    o in n ||
                                        e.push({
                                            message:
                                                'System field "code" is missing',
                                            code: 'entity_code_field_missing',
                                            reference: t.name,
                                        }),
                                    !v.isne(t.name) ||
                                        ('user' !== t.name &&
                                            'group' !== t.name) ||
                                        e.push({
                                            message:
                                                'Entity name is a reserved name',
                                            code: 'entity_name_reserved',
                                            reference: t.name,
                                        }),
                                    e
                                );
                            },
                        },
                        {
                            key: 'getName',
                            value: function() {
                                return this.schema.name;
                            },
                        },
                        {
                            key: 'getCamelName',
                            value: function() {
                                return Object(c.convertToCamel)(
                                    this.getName().toLowerCase(),
                                );
                            },
                        },
                        {
                            key: 'getDisplayName',
                            value: function() {
                                return Object(c.uCFirst)(
                                    this.getName(),
                                ).replace(/_/g, ' ');
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                return this.schema.schema
                                    .map(function(e) {
                                        return v.isne(e.getReferenceFieldName())
                                            ? e
                                            : null;
                                    })
                                    .filter(function(e) {
                                        return e;
                                    });
                            },
                        },
                        {
                            key: 'getFields',
                            value: function() {
                                return this.schema.schema;
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.schema;
                            },
                        },
                        {
                            key: 'getPresentationField',
                            value: function() {
                                return (
                                    this.schema.schema.find(function(e) {
                                        return (
                                            'string' === e.getType() &&
                                            e.getName() !== o
                                        );
                                    }) || null
                                );
                            },
                        },
                        {
                            key: 'getValidator',
                            value: function() {
                                var e = {};
                                return (
                                    this.schema.schema.forEach(function(t) {
                                        var n = null;
                                        if (t.isReference()) n = s.string();
                                        else {
                                            var r = t.getActualType();
                                            n =
                                                'integer' === r
                                                    ? s.number().integer()
                                                    : 'boolean' === r
                                                    ? s.boolean()
                                                    : 'datetime' === r
                                                    ? s.date()
                                                    : s.string();
                                        }
                                        t.isMultiple() && (n = s.array().of(n)),
                                            (n = t.isMandatory()
                                                ? n.required(
                                                      ''.concat(
                                                          t.getDisplayName(),
                                                          ' is required',
                                                      ),
                                                  )
                                                : n.nullable()),
                                            (e[t.getName()] = n);
                                    }),
                                    s.object().shape(e)
                                );
                            },
                        },
                        {
                            key: 'prepareData',
                            value: function(e) {
                                var t = this,
                                    n = {};
                                return v.ione(e)
                                    ? (this.getFields().forEach(function(r) {
                                          var i = r.getName();
                                          if (i !== o && i in e) {
                                              var a = e[i];
                                              r.isMultiple()
                                                  ? ((a = v.isArray(a)
                                                        ? a.map(function(e) {
                                                              return t.castFieldValue(
                                                                  r,
                                                                  e,
                                                              );
                                                          })
                                                        : []),
                                                    r.isReference() &&
                                                        (a = v.unique(a)))
                                                  : (a = t.castFieldValue(
                                                        r,
                                                        a,
                                                    )),
                                                  (n[i] = a);
                                          }
                                      }),
                                      n)
                                    : n;
                            },
                        },
                        {
                            key: 'castFieldValue',
                            value: function(e, t) {
                                var n = e.getActualType();
                                if ('string' === n)
                                    t = null == t ? '' : t.toString();
                                else if ('boolean' === n) t = !!t;
                                else if ('integer' === n)
                                    (t = parseInt(t, 10)),
                                        Number.isNaN(t) && (t = 0);
                                else if ('datetime' === n) {
                                    if (null == t) return '';
                                    if (t instanceof Date) t = t.toISOString();
                                    else if (Number.isNaN(Date.parse(t)))
                                        return '';
                                } else
                                    e.isReference()
                                        ? v.isString(t) ||
                                          (v.isObject(t)
                                              ? o in t &&
                                                ((t = t[o]),
                                                v.isne(t) || (t = ''))
                                              : (t = ''))
                                        : (t = '');
                                return t;
                            },
                        },
                    ]) && S(t.prototype, n),
                    r && S(t, r),
                    e
                );
            })();
            function j(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var w = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        v.iane(t) || (t = []),
                        (this.schema = t.map(function(e) {
                            return new P(e);
                        }));
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'checkHealth',
                            value: function() {
                                var e = this,
                                    t = [],
                                    n = this.schema;
                                if (!v.iane(n)) return t;
                                var r = {};
                                return (
                                    n.forEach(function(e) {
                                        var n = e.checkHealth();
                                        v.iane(n) && (t = v.union(t, n)),
                                            e.getName() in r &&
                                                t.push({
                                                    message: 'Entity "'.concat(
                                                        e.getName(),
                                                        '" met several times',
                                                    ),
                                                    code: 'entity_duplicate',
                                                    reference: e.getName(),
                                                }),
                                            (r[e.getName()] =
                                                e.getName() in r
                                                    ? r[e.getName()] + 1
                                                    : 1);
                                    }),
                                    this.getReferences().forEach(function(n) {
                                        var r = n.getReferenceFieldName();
                                        e.getEntity(r) ||
                                            t.push({
                                                message: 'Entity "'.concat(
                                                    r,
                                                    '" is referenced, but not presented',
                                                ),
                                                code: 'field_broken_reference',
                                                reference: r,
                                            });
                                    }),
                                    t
                                );
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.schema;
                            },
                        },
                        {
                            key: 'get',
                            value: function() {
                                return this.schema;
                            },
                        },
                        {
                            key: 'getEntity',
                            value: function(e) {
                                return this.schema.find(function(t) {
                                    return t.getName() === e;
                                });
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                var e = [];
                                return (
                                    this.schema.forEach(function(t) {
                                        e = v.union(e, t.getReferences());
                                    }),
                                    e
                                );
                            },
                        },
                        {
                            key: 'isEmpty',
                            value: function() {
                                return !this.schema.length;
                            },
                        },
                    ]) && j(t.prototype, n),
                    r && j(t, r),
                    e
                );
            })();
            n.d(t, 'DB_TABLE_PREFIX', function() {
                return 'eq_';
            }),
                n.d(t, 'DB_REF_TABLE_PREFIX', function() {
                    return r;
                }),
                n.d(t, 'DB_ENTITY_TABLE_PREFIX', function() {
                    return i;
                }),
                n.d(t, 'DB_MIGRATION_TABLE_NAME', function() {
                    return a;
                }),
                n.d(t, 'DB_SCHEMA_TABLE_NAME', function() {
                    return u;
                }),
                n.d(t, 'DB_IDENTIFIER_LENGTH', function() {
                    return 63;
                }),
                n.d(t, 'DB_VARCHAR_DEF_LENGTH', function() {
                    return 255;
                }),
                n.d(t, 'DB_CODE_COLUMN_LENGTH', function() {
                    return 36;
                }),
                n.d(t, 'QUERY_FIND_MAX_PAGE_SIZE', function() {
                    return 50;
                }),
                n.d(t, 'ENTITY_USER_NAME', function() {
                    return 'user';
                }),
                n.d(t, 'ENTITY_GROUP_NAME', function() {
                    return 'group';
                }),
                n.d(t, 'ENTITY_CODE_FIELD_NAME', function() {
                    return o;
                }),
                n.d(t, 'TYPE_STRING', function() {
                    return 'string';
                }),
                n.d(t, 'TYPE_INTEGER', function() {
                    return 'integer';
                }),
                n.d(t, 'TYPE_BOOLEAN', function() {
                    return 'boolean';
                }),
                n.d(t, 'TYPE_DATETIME', function() {
                    return 'datetime';
                }),
                n.d(t, 'Schema', function() {
                    return w;
                }),
                n.d(t, 'CodeField', function() {
                    return A;
                }),
                n.d(t, 'Field', function() {
                    return b;
                }),
                n.d(t, 'Entity', function() {
                    return P;
                });
        },
    ]),
);
