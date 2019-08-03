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
                o = ''.concat('eq_', 'index.ts.ts'),
                u = 'code',
                c = 'string',
                l = 'integer',
                s = 'boolean',
                f = 'datetime',
                d = n(1),
                h = n(0),
                p = n(2),
                m = n.n(p),
                y = n(3),
                g = n.n(y),
                v = n(4),
                b = n.n(v),
                _ = n(5),
                E = n.n(_),
                N = {
                    isArray: Array.isArray,
                    isString: m.a,
                    isObject: g.a,
                    union: b.a,
                    iane: function(e) {
                        return Array.isArray(e) && e.length > 0;
                    },
                    ione: function(e) {
                        return g()(e) && Object.keys(e).length > 0;
                    },
                    isne: function(e) {
                        return m()(e) && e.length > 0;
                    },
                    unique: E.a,
                };
            function k(e, t, n, r, i, a, o) {
                try {
                    var u = e[a](o),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function w(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var O = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        N.ione(t) || (t = {}),
                        (this.declaration = {
                            name: t.name,
                            type: t.type,
                            label: t.label,
                            length: t.length,
                            required: t.required,
                            unique: t.unique,
                            preview: t.preview,
                        });
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e,
                                    t = ((e = regeneratorRuntime.mark(
                                        function e() {
                                            var t, n, r, i;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (t = []),
                                                                    (n = this
                                                                        .declaration),
                                                                    (r =
                                                                        n.type),
                                                                    (i = this.getValidator()),
                                                                    (e.prev = 4),
                                                                    (e.next = 7),
                                                                    i.validate(
                                                                        n,
                                                                        {
                                                                            abortEarly: !1,
                                                                        },
                                                                    )
                                                                );
                                                            case 7:
                                                                e.next = 16;
                                                                break;
                                                            case 9:
                                                                if (
                                                                    ((e.prev = 9),
                                                                    (e.t0 = e.catch(
                                                                        4,
                                                                    )),
                                                                    !(
                                                                        e.t0 instanceof
                                                                        h.ValidationError
                                                                    ))
                                                                ) {
                                                                    e.next = 15;
                                                                    break;
                                                                }
                                                                e.t0.inner.forEach(
                                                                    function(
                                                                        e,
                                                                    ) {
                                                                        t.push({
                                                                            message:
                                                                                e.message,
                                                                            code:
                                                                                'field_illegal',
                                                                            fieldName:
                                                                                e.path,
                                                                        });
                                                                    },
                                                                ),
                                                                    (e.next = 16);
                                                                break;
                                                            case 15:
                                                                throw e.t0;
                                                            case 16:
                                                                return (
                                                                    N.isne(r) ||
                                                                        (N.isArray(
                                                                            r,
                                                                        ) &&
                                                                            1 ===
                                                                                r.length &&
                                                                            N.isne(
                                                                                r[0],
                                                                            )) ||
                                                                        t.push({
                                                                            message:
                                                                                'Field type should be of type string or an array of one string',
                                                                            code:
                                                                                'field_type_illegal',
                                                                            fieldName:
                                                                                n.name ||
                                                                                '',
                                                                        }),
                                                                    e.abrupt(
                                                                        'return',
                                                                        t,
                                                                    )
                                                                );
                                                            case 18:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this,
                                                [[4, 9]],
                                            );
                                        },
                                    )),
                                    function() {
                                        var t = this,
                                            n = arguments;
                                        return new Promise(function(r, i) {
                                            var a = e.apply(t, n);
                                            function o(e) {
                                                k(a, r, i, o, u, 'next', e);
                                            }
                                            function u(e) {
                                                k(a, r, i, o, u, 'throw', e);
                                            }
                                            o(void 0);
                                        });
                                    });
                                return function() {
                                    return t.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'getValidator',
                            value: function() {
                                return (
                                    this.fieldValidator ||
                                        (this.fieldValidator = h
                                            .object()
                                            .shape({
                                                name: h
                                                    .string()
                                                    .typeError(
                                                        'Field name should be a string',
                                                    )
                                                    .strict(!0)
                                                    .required(
                                                        'Field should have a name',
                                                    ),
                                                label: h
                                                    .string()
                                                    .typeError(
                                                        'Field label should be a string',
                                                    )
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
                            },
                        },
                        {
                            key: 'getType',
                            value: function() {
                                return this.declaration.type || null;
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
                                if (this.getType() === c) {
                                    var e = parseInt(
                                        this.declaration.length,
                                        10,
                                    );
                                    return Number.isNaN(e) ? 255 : e;
                                }
                                return null;
                            },
                        },
                        {
                            key: 'getName',
                            value: function() {
                                return this.declaration.name;
                            },
                        },
                        {
                            key: 'getDisplayName',
                            value: function() {
                                return N.isne(this.declaration.label)
                                    ? this.declaration.label
                                    : Object(d.uCFirst)(this.getName()).replace(
                                          /_/g,
                                          ' ',
                                      );
                            },
                        },
                        {
                            key: 'getReferencedEntityName',
                            value: function() {
                                var e = this.getActualType();
                                return [c, s, f, l].indexOf(e) >= 0 ? null : e;
                            },
                        },
                        {
                            key: 'getReferenceFieldName',
                            value: function() {
                                return this.getReferencedEntityName();
                            },
                        },
                        {
                            key: 'getDeclaration',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'isMultiple',
                            value: function() {
                                return N.isArray(this.declaration.type);
                            },
                        },
                        {
                            key: 'isReference',
                            value: function() {
                                return N.isne(this.getReferencedEntityName());
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
                                return !0 === this.declaration.required;
                            },
                        },
                        {
                            key: 'isPreview',
                            value: function() {
                                return !0 === this.declaration.preview;
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declaration;
                            },
                        },
                    ]) && w(t.prototype, n),
                    r && w(t, r),
                    e
                );
            })();
            function R(e) {
                return (R =
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
            function T(e, t, n, r, i, a, o) {
                try {
                    var u = e[a](o),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function P(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function S(e, t) {
                return !t || ('object' !== R(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function F(e, t, n) {
                return (F =
                    'undefined' != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function(e, t, n) {
                              var r = (function(e, t) {
                                  for (
                                      ;
                                      !Object.prototype.hasOwnProperty.call(
                                          e,
                                          t,
                                      ) && null !== (e = x(e));

                                  );
                                  return e;
                              })(e, t);
                              if (r) {
                                  var i = Object.getOwnPropertyDescriptor(r, t);
                                  return i.get ? i.get.call(n) : i.value;
                              }
                          })(e, t, n || e);
            }
            function x(e) {
                return (x = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function D(e, t) {
                return (D =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var j = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        S(this, x(t).apply(this, arguments))
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
                            t && D(e, t);
                    })(t, O),
                    (n = t),
                    (r = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e,
                                    n = ((e = regeneratorRuntime.mark(
                                        function e() {
                                            var n, r, i;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (e.next = 2),
                                                                    F(
                                                                        x(
                                                                            t.prototype,
                                                                        ),
                                                                        'getHealth',
                                                                        this,
                                                                    ).call(this)
                                                                );
                                                            case 2:
                                                                return (
                                                                    (n =
                                                                        e.sent),
                                                                    (r = this
                                                                        .declaration)
                                                                        .required ||
                                                                        n.push({
                                                                            message:
                                                                                'System field "code" should be mandatory',
                                                                            code:
                                                                                'field_code_not_mandatory',
                                                                            fieldName:
                                                                                r.name,
                                                                        }),
                                                                    r.unique ||
                                                                        n.push({
                                                                            message:
                                                                                'System field "code" should be unique',
                                                                            code:
                                                                                'field_code_not_unique',
                                                                            fieldName:
                                                                                r.name,
                                                                        }),
                                                                    this.getActualType() !==
                                                                        c &&
                                                                        n.push({
                                                                            message:
                                                                                'System field "code" should be of type string',
                                                                            code:
                                                                                'field_code_not_string',
                                                                            fieldName:
                                                                                r.name,
                                                                        }),
                                                                    this.isMultiple() &&
                                                                        n.push({
                                                                            message:
                                                                                'System field "code" should not be multiple',
                                                                            code:
                                                                                'field_code_multiple',
                                                                            fieldName:
                                                                                r.name,
                                                                        }),
                                                                    (i = parseInt(
                                                                        r.length,
                                                                        10,
                                                                    )),
                                                                    (Number.isNaN(
                                                                        i,
                                                                    ) ||
                                                                        i <=
                                                                            0) &&
                                                                        n.push({
                                                                            message:
                                                                                'System field "code" should have a finite length',
                                                                            code:
                                                                                'field_code_illegal_length',
                                                                            fieldName:
                                                                                r.name,
                                                                        }),
                                                                    e.abrupt(
                                                                        'return',
                                                                        n,
                                                                    )
                                                                );
                                                            case 11:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this,
                                            );
                                        },
                                    )),
                                    function() {
                                        var t = this,
                                            n = arguments;
                                        return new Promise(function(r, i) {
                                            var a = e.apply(t, n);
                                            function o(e) {
                                                T(a, r, i, o, u, 'next', e);
                                            }
                                            function u(e) {
                                                T(a, r, i, o, u, 'throw', e);
                                            }
                                            o(void 0);
                                        });
                                    });
                                return function() {
                                    return n.apply(this, arguments);
                                };
                            })(),
                        },
                    ]) && P(n.prototype, r),
                    i && P(n, i),
                    t
                );
            })();
            function A(e, t, n, r, i, a, o) {
                try {
                    var u = e[a](o),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function q(e) {
                return function() {
                    var t = this,
                        n = arguments;
                    return new Promise(function(r, i) {
                        var a = e.apply(t, n);
                        function o(e) {
                            A(a, r, i, o, u, 'next', e);
                        }
                        function u(e) {
                            A(a, r, i, o, u, 'throw', e);
                        }
                        o(void 0);
                    });
                };
            }
            function I(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var M = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e);
                    var n = t;
                    N.ione(n) || (n = {}),
                        N.iane(n.schema) || (n.schema = []),
                        (this.declaration = {
                            name: n.name || '',
                            schema: n.schema.map(function(e) {
                                return e.name === u ? new j(e) : new O(e);
                            }),
                        });
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e = q(
                                    regeneratorRuntime.mark(function e() {
                                        var t, n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (t = []),
                                                                (n = this
                                                                    .declaration),
                                                                N.isne(
                                                                    n.name,
                                                                ) ||
                                                                    t.push({
                                                                        message:
                                                                            'Entity does not have a name',
                                                                        code:
                                                                            'entity_name_empty',
                                                                        entityName:
                                                                            '',
                                                                    }),
                                                                !N.isne(
                                                                    n.name,
                                                                ) ||
                                                                    ('user' !==
                                                                        n.name &&
                                                                        'group' !==
                                                                            n.name) ||
                                                                    t.push({
                                                                        message:
                                                                            'Entity name is a reserved name',
                                                                        code:
                                                                            'entity_name_reserved',
                                                                        entityName:
                                                                            n.name,
                                                                    }),
                                                                N.iane(
                                                                    n.index,
                                                                ) ||
                                                                    t.push({
                                                                        message:
                                                                            'Entity does not have a single field',
                                                                        code:
                                                                            'entity_schema_empty',
                                                                        entityName:
                                                                            n.name,
                                                                    }),
                                                                (r = {}),
                                                                n.index.forEach(
                                                                    function(
                                                                        e,
                                                                    ) {
                                                                        r[
                                                                            e.getName()
                                                                        ] =
                                                                            e.getName() in
                                                                            r
                                                                                ? r[
                                                                                      e.getName()
                                                                                  ] +
                                                                                  1
                                                                                : 1;
                                                                    },
                                                                ),
                                                                u in r ||
                                                                    t.push({
                                                                        message:
                                                                            'System field "code" is missing',
                                                                        code:
                                                                            'entity_code_field_missing',
                                                                        entityName:
                                                                            n.name,
                                                                    }),
                                                                Object.keys(
                                                                    r,
                                                                ).forEach(
                                                                    function(
                                                                        e,
                                                                    ) {
                                                                        r[e] >
                                                                            1 &&
                                                                            t.push(
                                                                                {
                                                                                    message: 'Field "'.concat(
                                                                                        r[
                                                                                            e
                                                                                        ],
                                                                                        '" met several times',
                                                                                    ),
                                                                                    code:
                                                                                        'entity_field_duplicate',
                                                                                    fieldName:
                                                                                        r[
                                                                                            e
                                                                                        ],
                                                                                    entityName:
                                                                                        n.name,
                                                                                },
                                                                            );
                                                                    },
                                                                ),
                                                                (e.next = 11),
                                                                Promise.all(
                                                                    n.index.map(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            return e
                                                                                .getHealth()
                                                                                .then(
                                                                                    function(
                                                                                        e,
                                                                                    ) {
                                                                                        e.forEach(
                                                                                            function(
                                                                                                e,
                                                                                            ) {
                                                                                                t.push(
                                                                                                    Object.assign(
                                                                                                        {},
                                                                                                        e,
                                                                                                        {
                                                                                                            entityName:
                                                                                                                n.name,
                                                                                                        },
                                                                                                    ),
                                                                                                );
                                                                                            },
                                                                                        );
                                                                                    },
                                                                                );
                                                                        },
                                                                    ),
                                                                )
                                                            );
                                                        case 11:
                                                            return e.abrupt(
                                                                'return',
                                                                t,
                                                            );
                                                        case 12:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this,
                                        );
                                    }),
                                );
                                return function() {
                                    return e.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'getName',
                            value: function() {
                                return this.declaration.name;
                            },
                        },
                        {
                            key: 'getCamelName',
                            value: function() {
                                return Object(d.convertToCamel)(
                                    this.getName().toLowerCase(),
                                );
                            },
                        },
                        {
                            key: 'getDisplayName',
                            value: function() {
                                return Object(d.uCFirst)(
                                    this.getName(),
                                ).replace(/_/g, ' ');
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                return this.declaration.index.filter(function(
                                    e,
                                ) {
                                    return e.isReference();
                                });
                            },
                        },
                        {
                            key: 'getFields',
                            value: function() {
                                return this.declaration.index;
                            },
                        },
                        {
                            key: 'getField',
                            value: function(e) {
                                return this.declaration.index[e];
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'getPresentationField',
                            value: function() {
                                return (
                                    this.declaration.index.find(function(e) {
                                        return (
                                            e.getType() === c &&
                                            e.getName() !== u
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
                                    this.declaration.index.forEach(function(t) {
                                        var n = null;
                                        if (t.isReference())
                                            n = h
                                                .string()
                                                .typeError(
                                                    "Reference field '".concat(
                                                        t.getDisplayName(),
                                                        "' is not a string",
                                                    ),
                                                );
                                        else {
                                            var r = t.getActualType();
                                            n =
                                                r === l
                                                    ? h
                                                          .number()
                                                          .integer()
                                                          .typeError(
                                                              "Field '".concat(
                                                                  t.getDisplayName(),
                                                                  "' is not a number",
                                                              ),
                                                          )
                                                    : r === s
                                                    ? h
                                                          .boolean()
                                                          .typeError(
                                                              "Field '".concat(
                                                                  t.getDisplayName(),
                                                                  "' is not a boolean",
                                                              ),
                                                          )
                                                    : r === f
                                                    ? h
                                                          .date()
                                                          .typeError(
                                                              "Field '".concat(
                                                                  t.getDisplayName(),
                                                                  "' is not a date",
                                                              ),
                                                          )
                                                    : h
                                                          .string()
                                                          .typeError(
                                                              "Field '".concat(
                                                                  t.getDisplayName(),
                                                                  "' is not a string",
                                                              ),
                                                          );
                                        }
                                        t.isMultiple() && (n = h.array().of(n)),
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
                                    h.object().shape(e)
                                );
                            },
                        },
                        {
                            key: 'prepareData',
                            value: function(e) {
                                var t = this,
                                    n = {};
                                return N.ione(e)
                                    ? (this.getFields().forEach(function(r) {
                                          var i = r.getName();
                                          if (i !== u && i in e) {
                                              var a = e[i];
                                              r.isMultiple()
                                                  ? (N.isArray(a) &&
                                                        (a = (a = a.map(
                                                            function(e) {
                                                                return t.castFieldValue(
                                                                    r,
                                                                    e,
                                                                );
                                                            },
                                                        )).filter(function(e) {
                                                            return null !== e;
                                                        })),
                                                    r.isReference() &&
                                                        (a = N.unique(a).filter(
                                                            function(e) {
                                                                return !!e;
                                                            },
                                                        )))
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
                            key: 'validateData',
                            value: (function() {
                                var e = q(
                                    regeneratorRuntime.mark(function e(t) {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (n = null),
                                                                (r = null),
                                                                (e.prev = 2),
                                                                (e.next = 5),
                                                                this.getValidator().validate(
                                                                    t,
                                                                    {
                                                                        abortEarly: !1,
                                                                    },
                                                                )
                                                            );
                                                        case 5:
                                                            (n = e.sent),
                                                                (e.next = 11);
                                                            break;
                                                        case 8:
                                                            (e.prev = 8),
                                                                (e.t0 = e.catch(
                                                                    2,
                                                                )),
                                                                (r = e.t0.inner.map(
                                                                    function(
                                                                        e,
                                                                    ) {
                                                                        return {
                                                                            message:
                                                                                e.message,
                                                                            field:
                                                                                e.path,
                                                                        };
                                                                    },
                                                                ));
                                                        case 11:
                                                            return e.abrupt(
                                                                'return',
                                                                {
                                                                    data: n,
                                                                    errors: r,
                                                                },
                                                            );
                                                        case 12:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this,
                                            [[2, 8]],
                                        );
                                    }),
                                );
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'castFieldValue',
                            value: function(e, t) {
                                var n = e.getActualType(),
                                    r = t;
                                if (n === c)
                                    r = null == r ? null : r.toString();
                                else if (n === s) r = !!r;
                                else if (n === l) r = parseInt(r, 10);
                                else if (n === f) {
                                    if (null == r) return null;
                                    if (r instanceof Date) r = r.toISOString();
                                    else {
                                        var i = Date.parse(r);
                                        Number.isNaN(i)
                                            ? Number.isNaN(parseInt(r, 10)) ||
                                              (r = new Date(
                                                  parseInt(r, 10),
                                              ).toISOString())
                                            : (r = new Date(i).toISOString());
                                    }
                                } else
                                    e.isReference() &&
                                        (r = null != r ? r.toString() : null);
                                return r;
                            },
                        },
                    ]) && I(t.prototype, n),
                    r && I(t, r),
                    e
                );
            })();
            function C(e, t, n, r, i, a, o) {
                try {
                    var u = e[a](o),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function B(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var L = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        N.ione(t) || (t = {}),
                        N.iane(t.schema) || (t.schema = []);
                    var n = parseInt(t.version, 10);
                    Number.isNaN(n) && (n = 0),
                        (this.declaration = {
                            schema: t.schema.map(function(e) {
                                return new M(e);
                            }),
                            version: n,
                        });
                }
                var t, n, r;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e,
                                    t = ((e = regeneratorRuntime.mark(
                                        function e() {
                                            var t,
                                                n,
                                                r,
                                                i,
                                                a = this;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    ((t = []),
                                                                    (n = this
                                                                        .declaration),
                                                                    (r =
                                                                        n.index),
                                                                    N.iane(r))
                                                                ) {
                                                                    e.next = 5;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    t,
                                                                );
                                                            case 5:
                                                                return (
                                                                    (i = {}),
                                                                    r.forEach(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            i[
                                                                                e.getName()
                                                                            ] =
                                                                                e.getName() in
                                                                                i
                                                                                    ? i[
                                                                                          e.getName()
                                                                                      ] +
                                                                                      1
                                                                                    : 1;
                                                                        },
                                                                    ),
                                                                    Object.keys(
                                                                        i,
                                                                    ).forEach(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            i[
                                                                                e
                                                                            ] >
                                                                                1 &&
                                                                                t.push(
                                                                                    {
                                                                                        message: 'Entity "'.concat(
                                                                                            i[
                                                                                                e
                                                                                            ],
                                                                                            '" met several times',
                                                                                        ),
                                                                                        code:
                                                                                            'entity_duplicate',
                                                                                        entityName:
                                                                                            i[
                                                                                                e
                                                                                            ],
                                                                                    },
                                                                                );
                                                                        },
                                                                    ),
                                                                    (e.next = 10),
                                                                    Promise.all(
                                                                        r.map(
                                                                            function(
                                                                                e,
                                                                            ) {
                                                                                return e
                                                                                    .getHealth()
                                                                                    .then(
                                                                                        function(
                                                                                            e,
                                                                                        ) {
                                                                                            e.forEach(
                                                                                                function(
                                                                                                    e,
                                                                                                ) {
                                                                                                    t.push(
                                                                                                        Object.assign(
                                                                                                            {},
                                                                                                            e,
                                                                                                        ),
                                                                                                    );
                                                                                                },
                                                                                            );
                                                                                        },
                                                                                    );
                                                                            },
                                                                        ),
                                                                    )
                                                                );
                                                            case 10:
                                                                return (
                                                                    this.getReferences().forEach(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            var n = e.getReferenceFieldName();
                                                                            a.getEntity(
                                                                                n,
                                                                            ) ||
                                                                                t.push(
                                                                                    {
                                                                                        message: 'Entity "'.concat(
                                                                                            n,
                                                                                            '" is referenced, but not created',
                                                                                        ),
                                                                                        code:
                                                                                            'field_broken_reference',
                                                                                        fieldName: n,
                                                                                    },
                                                                                );
                                                                        },
                                                                    ),
                                                                    e.abrupt(
                                                                        'return',
                                                                        t,
                                                                    )
                                                                );
                                                            case 12:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this,
                                            );
                                        },
                                    )),
                                    function() {
                                        var t = this,
                                            n = arguments;
                                        return new Promise(function(r, i) {
                                            var a = e.apply(t, n);
                                            function o(e) {
                                                C(a, r, i, o, u, 'next', e);
                                            }
                                            function u(e) {
                                                C(a, r, i, o, u, 'throw', e);
                                            }
                                            o(void 0);
                                        });
                                    });
                                return function() {
                                    return t.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'getDeclaration',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'get',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'getSchema',
                            value: function() {
                                return this.declaration.index;
                            },
                        },
                        {
                            key: 'getVersion',
                            value: function() {
                                return this.declaration.version;
                            },
                        },
                        {
                            key: 'getEntity',
                            value: function(e) {
                                return this.declaration.index.find(function(t) {
                                    return t.getName() === e;
                                });
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                var e = [];
                                return (
                                    this.declaration.index.forEach(function(t) {
                                        e = N.union(e, t.getReferences());
                                    }),
                                    e
                                );
                            },
                        },
                        {
                            key: 'isEmpty',
                            value: function() {
                                return !this.declaration.index.length;
                            },
                        },
                    ]) && B(t.prototype, n),
                    r && B(t, r),
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
                    return o;
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
                n.d(t, 'DB_QUERY_FIND_MAX_PAGE_SIZE', function() {
                    return 50;
                }),
                n.d(t, 'ENTITY_USER_NAME', function() {
                    return 'user';
                }),
                n.d(t, 'ENTITY_GROUP_NAME', function() {
                    return 'group';
                }),
                n.d(t, 'ENTITY_ID_FIELD_NAME', function() {
                    return u;
                }),
                n.d(t, 'TYPE_STRING', function() {
                    return c;
                }),
                n.d(t, 'TYPE_INTEGER', function() {
                    return l;
                }),
                n.d(t, 'TYPE_BOOLEAN', function() {
                    return s;
                }),
                n.d(t, 'TYPE_DATETIME', function() {
                    return f;
                }),
                n.d(t, 'Schema', function() {
                    return L;
                }),
                n.d(t, 'CodeField', function() {
                    return j;
                }),
                n.d(t, 'Field', function() {
                    return O;
                }),
                n.d(t, 'Entity', function() {
                    return M;
                });
        },
    ]),
);
