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
            var r = n(1),
                i = n(0),
                o = n(2),
                a = n.n(o),
                u = n(3),
                c = n.n(u),
                l = n(4),
                s = n.n(l),
                f = {
                    isArray: Array.isArray,
                    isString: function(e) {
                        return 'string' == typeof e;
                    },
                    isObject: a.a,
                    union: c.a,
                    iane: function(e) {
                        return Array.isArray(e) && e.length > 0;
                    },
                    ione: function(e) {
                        return a()(e) && Object.keys(e).length > 0;
                    },
                    isne: function(e) {
                        return 'string' == typeof e && e.length > 0;
                    },
                    unique: s.a,
                };
            function y(e, t, n, r, i, o, a) {
                try {
                    var u = e[o](a),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function p(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var h = (function() {
                function e() {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        (this.declaration = t);
                }
                var t, n, o;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e,
                                    t = ((e = regeneratorRuntime.mark(
                                        function e() {
                                            var t, n, r, i, o;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (t = []),
                                                                    (n = this.getName()),
                                                                    (r = this.getType()),
                                                                    (i = this.isMultiple()),
                                                                    (o = this.isUnique()),
                                                                    f.isne(n) ||
                                                                        t.push({
                                                                            message:
                                                                                'Field does not have a name',
                                                                            code:
                                                                                'field_name_empty',
                                                                            fieldName:
                                                                                '',
                                                                        }),
                                                                    f.isne(r) ||
                                                                        t.push({
                                                                            message:
                                                                                'Field does not have a type',
                                                                            code:
                                                                                'field_type_empty',
                                                                            fieldName:
                                                                                n ||
                                                                                '',
                                                                        }),
                                                                    i &&
                                                                        o &&
                                                                        t.push({
                                                                            message:
                                                                                'The field can not be both multiple and unique',
                                                                            code:
                                                                                'field_multiple_unique_conflict',
                                                                            fieldName:
                                                                                n ||
                                                                                '',
                                                                        }),
                                                                    'idInternal' ===
                                                                        n &&
                                                                        t.push({
                                                                            message: 'The following name is system-reserved: '.concat(
                                                                                n,
                                                                            ),
                                                                            code:
                                                                                'field_name_illegal',
                                                                            fieldName: n,
                                                                        }),
                                                                    e.abrupt(
                                                                        'return',
                                                                        t,
                                                                    )
                                                                );
                                                            case 10:
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
                                            var o = e.apply(t, n);
                                            function a(e) {
                                                y(o, r, i, a, u, 'next', e);
                                            }
                                            function u(e) {
                                                y(o, r, i, a, u, 'throw', e);
                                            }
                                            a(void 0);
                                        });
                                    });
                                return function() {
                                    return t.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'getSanitizedDeclaration',
                            value: function(e) {
                                var t = [
                                        'type',
                                        'name',
                                        'label',
                                        'length',
                                        'required',
                                        'unique',
                                        'preview',
                                        'system',
                                    ],
                                    n = {};
                                Object.keys(e).forEach(function(r) {
                                    t.includes(r) && (n[r] = e[r]);
                                });
                                var r = this.getDeclarationValidator();
                                try {
                                    r.validateSync(e, { abortEarly: !1 });
                                } catch (e) {
                                    if (!(e instanceof i.ValidationError))
                                        throw e;
                                    e.inner.forEach(function(e) {
                                        delete n[e.path];
                                    });
                                }
                                var o = n.type;
                                return (
                                    f.isne(o) ||
                                        (f.isArray(o) &&
                                            1 === o.length &&
                                            f.isne(o[0])) ||
                                        delete n.type,
                                    n
                                );
                            },
                        },
                        {
                            key: 'getDeclarationValidator',
                            value: function() {
                                return (
                                    this.fieldValidator ||
                                        (this.fieldValidator = i
                                            .object()
                                            .shape({
                                                name: i
                                                    .string()
                                                    .typeError(
                                                        'Field name should be a string',
                                                    )
                                                    .strict(!0)
                                                    .required(
                                                        'Field should have a name',
                                                    ),
                                                label: i
                                                    .string()
                                                    .typeError(
                                                        'Field label should be a string',
                                                    )
                                                    .strict(!0),
                                                length: i
                                                    .number()
                                                    .typeError(
                                                        'Field length should be a number',
                                                    ),
                                                required: i
                                                    .boolean()
                                                    .typeError(
                                                        'Field required flag should be boolean',
                                                    ),
                                                unique: i
                                                    .boolean()
                                                    .typeError(
                                                        'Field unique flag should be boolean',
                                                    ),
                                                preview: i
                                                    .boolean()
                                                    .typeError(
                                                        'Field preview flag should be boolean',
                                                    ),
                                                system: i
                                                    .boolean()
                                                    .typeError(
                                                        'System flag should be boolean',
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
                                return f.isne(this.declaration.label)
                                    ? this.declaration.label
                                    : Object(r.uCFirst)(this.getName()).replace(
                                          /_/g,
                                          ' ',
                                      );
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
                                return f.isArray(this.declaration.type);
                            },
                        },
                        {
                            key: 'isSortable',
                            value: function() {
                                return !(
                                    this.isMultiple() || this.isReference()
                                );
                            },
                        },
                        {
                            key: 'isRequired',
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
                            key: 'isUnique',
                            value: function() {
                                return !0 === this.declaration.unique;
                            },
                        },
                        {
                            key: 'isSystem',
                            value: function() {
                                return !0 === this.declaration.system;
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'castValue',
                            value: function(e) {
                                var t = this;
                                return this.isMultiple()
                                    ? f.isArray(e)
                                        ? e
                                              .map(function(e) {
                                                  return t.castValueItem(e);
                                              })
                                              .filter(function(e) {
                                                  return null != e;
                                              })
                                        : e
                                    : this.castValueItem(e);
                            },
                        },
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                return e;
                            },
                        },
                        {
                            key: 'getValidator',
                            value: function() {
                                var e = this.createValueItemValidator();
                                return (
                                    this.isMultiple() && (e = i.array().of(e)),
                                    (e = this.isRequired()
                                        ? e.required(
                                              ''.concat(
                                                  this.getDisplayName(),
                                                  ' is required',
                                              ),
                                          )
                                        : e.nullable())
                                );
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                throw new Error('Not implemented');
                            },
                        },
                        {
                            key: 'getReferencedEntityName',
                            value: function() {
                                return null;
                            },
                        },
                        {
                            key: 'isReference',
                            value: function() {
                                return !1;
                            },
                        },
                        {
                            key: 'getTypeErrorMessage',
                            value: function(e) {
                                return "The value of '"
                                    .concat(this.getDisplayName(), "' is not ")
                                    .concat(e);
                            },
                        },
                        {
                            key: 'declaration',
                            set: function(e) {
                                this.declarationInternal = this.getSanitizedDeclaration(
                                    e,
                                );
                            },
                            get: function() {
                                return this.declarationInternal;
                            },
                        },
                    ]) && p(t.prototype, n),
                    o && p(t, o),
                    e
                );
            })();
            ''.concat('eq_', 'ref_'),
                ''.concat('eq_', 'e_'),
                ''.concat('eq_', 'migrations'),
                ''.concat('eq_', 'schema');
            function d(e) {
                return (d =
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
            function m(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function v(e, t) {
                return !t || ('object' !== d(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function g(e) {
                return (g = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function b(e, t) {
                return (b =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var _ = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        v(this, g(t).apply(this, arguments))
                    );
                }
                var n, r, o;
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
                            t && b(e, t);
                    })(t, h),
                    (n = t),
                    (r = [
                        {
                            key: 'getLength',
                            value: function() {
                                var e = parseInt(this.declaration.length, 10);
                                return Number.isNaN(e) ? 255 : e;
                            },
                        },
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                return null == e ? null : e.toString();
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                return i
                                    .string()
                                    .typeError(
                                        this.getTypeErrorMessage('a string'),
                                    );
                            },
                        },
                    ]) && m(n.prototype, r),
                    o && m(n, o),
                    t
                );
            })();
            function w(e) {
                return (w =
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
            function E(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function O(e, t) {
                return !t || ('object' !== w(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function k(e) {
                return (k = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function N(e, t) {
                return (N =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var S = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        O(this, k(t).apply(this, arguments))
                    );
                }
                var n, r, o;
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
                            t && N(e, t);
                    })(t, h),
                    (n = t),
                    (r = [
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                return null == e ? null : !!e;
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                return i
                                    .boolean()
                                    .typeError(
                                        this.getTypeErrorMessage('a boolean'),
                                    );
                            },
                        },
                    ]) && E(n.prototype, r),
                    o && E(n, o),
                    t
                );
            })();
            function j(e) {
                return (j =
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
            function P(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function I(e, t) {
                return !t || ('object' !== j(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function T(e) {
                return (T = Object.setPrototypeOf
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
            var V = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        I(this, T(t).apply(this, arguments))
                    );
                }
                var n, r, o;
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
                    })(t, h),
                    (n = t),
                    (r = [
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                if (null == e) return null;
                                var t = parseInt(e, 10);
                                return Number.isNaN(t) ? e : t;
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                return i
                                    .number()
                                    .integer()
                                    .typeError(
                                        this.getTypeErrorMessage('an integer'),
                                    );
                            },
                        },
                    ]) && P(n.prototype, r),
                    o && P(n, o),
                    t
                );
            })();
            function F(e) {
                return (F =
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
            function x(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function D(e, t) {
                return !t || ('object' !== F(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function q(e) {
                return (q = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function M(e, t) {
                return (M =
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
                        D(this, q(t).apply(this, arguments))
                    );
                }
                var n, r, o;
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
                            t && M(e, t);
                    })(t, h),
                    (n = t),
                    (r = [
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                if (null == e) return null;
                                if (e instanceof Date) return e.toISOString();
                                var t = Date.parse(e);
                                return Number.isNaN(t)
                                    ? Number.isNaN(parseInt(e, 10))
                                        ? e
                                        : new Date(
                                              parseInt(e, 10),
                                          ).toISOString()
                                    : new Date(t).toISOString();
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                return i
                                    .date()
                                    .typeError(
                                        this.getTypeErrorMessage('a date'),
                                    );
                            },
                        },
                    ]) && x(n.prototype, r),
                    o && x(n, o),
                    t
                );
            })();
            function C(e) {
                return (C =
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
            function L(e, t, n, r, i, o, a) {
                try {
                    var u = e[o](a),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function H(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function Y(e, t) {
                return !t || ('object' !== C(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function z(e, t, n) {
                return (z =
                    'undefined' != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function(e, t, n) {
                              var r = (function(e, t) {
                                  for (
                                      ;
                                      !Object.prototype.hasOwnProperty.call(
                                          e,
                                          t,
                                      ) && null !== (e = U(e));

                                  );
                                  return e;
                              })(e, t);
                              if (r) {
                                  var i = Object.getOwnPropertyDescriptor(r, t);
                                  return i.get ? i.get.call(n) : i.value;
                              }
                          })(e, t, n || e);
            }
            function U(e) {
                return (U = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function G(e, t) {
                return (G =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var J = (function(e) {
                function t() {
                    return (
                        (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    'Cannot call a class as a function',
                                );
                        })(this, t),
                        Y(this, U(t).apply(this, arguments))
                    );
                }
                var n, r, o;
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
                            t && G(e, t);
                    })(t, h),
                    (n = t),
                    (r = [
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e,
                                    n = ((e = regeneratorRuntime.mark(
                                        function e() {
                                            var n, r, i, o;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (e.next = 2),
                                                                    z(
                                                                        U(
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
                                                                    (r = this.getName()),
                                                                    (i = this.isUnique()),
                                                                    (o = this.isPreview()),
                                                                    i &&
                                                                        n.push({
                                                                            message:
                                                                                'The reference field should not be declared as unique',
                                                                            code:
                                                                                'field_reference_unique_conflict',
                                                                            fieldName: r,
                                                                        }),
                                                                    o &&
                                                                        n.push({
                                                                            message:
                                                                                'The reference field should not be declared as preview',
                                                                            code:
                                                                                'field_reference_preview_conflict',
                                                                            fieldName: r,
                                                                        }),
                                                                    e.abrupt(
                                                                        'return',
                                                                        n,
                                                                    )
                                                                );
                                                            case 9:
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
                                            var o = e.apply(t, n);
                                            function a(e) {
                                                L(o, r, i, a, u, 'next', e);
                                            }
                                            function u(e) {
                                                L(o, r, i, a, u, 'throw', e);
                                            }
                                            a(void 0);
                                        });
                                    });
                                return function() {
                                    return n.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'isReference',
                            value: function() {
                                return !0;
                            },
                        },
                        {
                            key: 'getReferencedEntityName',
                            value: function() {
                                return this.getActualType();
                            },
                        },
                        {
                            key: 'createValueItemValidator',
                            value: function() {
                                return i
                                    .string()
                                    .typeError(
                                        this.getTypeErrorMessage('a string'),
                                    );
                            },
                        },
                        {
                            key: 'castValueItem',
                            value: function(e) {
                                return null != e ? e.toString() : null;
                            },
                        },
                        {
                            key: 'castValue',
                            value: function(e) {
                                var t = this;
                                return this.isMultiple()
                                    ? f.isArray(e)
                                        ? f
                                              .unique(
                                                  e.map(function(e) {
                                                      return t.castValueItem(e);
                                                  }),
                                              )
                                              .filter(function(e) {
                                                  return !!e;
                                              })
                                        : []
                                    : this.castValueItem(e);
                            },
                        },
                    ]) && H(n.prototype, r),
                    o && H(n, o),
                    t
                );
            })();
            function B(e) {
                return (B =
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
            function K(e, t, n, r, i, o, a) {
                try {
                    var u = e[o](a),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function Q(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            function W(e, t) {
                return !t || ('object' !== B(t) && 'function' != typeof t)
                    ? (function(e) {
                          if (void 0 === e)
                              throw new ReferenceError(
                                  "this hasn't been initialised - super() hasn't been called",
                              );
                          return e;
                      })(e)
                    : t;
            }
            function X(e, t, n) {
                return (X =
                    'undefined' != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function(e, t, n) {
                              var r = (function(e, t) {
                                  for (
                                      ;
                                      !Object.prototype.hasOwnProperty.call(
                                          e,
                                          t,
                                      ) && null !== (e = Z(e));

                                  );
                                  return e;
                              })(e, t);
                              if (r) {
                                  var i = Object.getOwnPropertyDescriptor(r, t);
                                  return i.get ? i.get.call(n) : i.value;
                              }
                          })(e, t, n || e);
            }
            function Z(e) {
                return (Z = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function(e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                      })(e);
            }
            function $(e, t) {
                return ($ =
                    Object.setPrototypeOf ||
                    function(e, t) {
                        return (e.__proto__ = t), e;
                    })(e, t);
            }
            var ee = (function(e) {
                    function t() {
                        return (
                            (function(e, t) {
                                if (!(e instanceof t))
                                    throw new TypeError(
                                        'Cannot call a class as a function',
                                    );
                            })(this, t),
                            W(this, Z(t).apply(this, arguments))
                        );
                    }
                    var n, r, o;
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
                                t && $(e, t);
                        })(t, _),
                        (n = t),
                        (r = [
                            {
                                key: 'getHealth',
                                value: (function() {
                                    var e,
                                        n = ((e = regeneratorRuntime.mark(
                                            function e() {
                                                var n, r, i, o, a, u;
                                                return regeneratorRuntime.wrap(
                                                    function(e) {
                                                        for (;;)
                                                            switch (
                                                                (e.prev =
                                                                    e.next)
                                                            ) {
                                                                case 0:
                                                                    return (
                                                                        (e.next = 2),
                                                                        X(
                                                                            Z(
                                                                                t.prototype,
                                                                            ),
                                                                            'getHealth',
                                                                            this,
                                                                        ).call(
                                                                            this,
                                                                        )
                                                                    );
                                                                case 2:
                                                                    return (
                                                                        (n =
                                                                            e.sent),
                                                                        (r = this.getName()),
                                                                        (i = this.isSystem()),
                                                                        (o = this.isUnique()),
                                                                        (a = this.getLength()),
                                                                        i ||
                                                                            n.push(
                                                                                {
                                                                                    message: 'The field should be declared as system-reserved: '.concat(
                                                                                        r,
                                                                                    ),
                                                                                    code:
                                                                                        'field_not_system',
                                                                                    fieldName: r,
                                                                                },
                                                                            ),
                                                                        o ||
                                                                            n.push(
                                                                                {
                                                                                    message: 'System field "'.concat(
                                                                                        'id',
                                                                                        '" should be unique',
                                                                                    ),
                                                                                    code:
                                                                                        'field_id_not_unique',
                                                                                    fieldName: r,
                                                                                },
                                                                            ),
                                                                        'string' !==
                                                                            this.getActualType() &&
                                                                            n.push(
                                                                                {
                                                                                    message: 'System field "'.concat(
                                                                                        'id',
                                                                                        '" should be string',
                                                                                    ),
                                                                                    code:
                                                                                        'field_id_not_string',
                                                                                    fieldName: r,
                                                                                },
                                                                            ),
                                                                        this.isMultiple() &&
                                                                            n.push(
                                                                                {
                                                                                    message: 'System field "'.concat(
                                                                                        'id',
                                                                                        '" should not be multiple',
                                                                                    ),
                                                                                    code:
                                                                                        'field_id_multiple',
                                                                                    fieldName: r,
                                                                                },
                                                                            ),
                                                                        (u = parseInt(
                                                                            a,
                                                                            10,
                                                                        )),
                                                                        (Number.isNaN(
                                                                            u,
                                                                        ) ||
                                                                            32 !==
                                                                                u) &&
                                                                            n.push(
                                                                                {
                                                                                    message: 'System field "'
                                                                                        .concat(
                                                                                            'id',
                                                                                            '" should have length of ',
                                                                                        )
                                                                                        .concat(
                                                                                            32,
                                                                                        ),
                                                                                    code:
                                                                                        'field_id_illegal_length',
                                                                                    fieldName: r,
                                                                                },
                                                                            ),
                                                                        e.abrupt(
                                                                            'return',
                                                                            n,
                                                                        )
                                                                    );
                                                                case 14:
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
                                                var o = e.apply(t, n);
                                                function a(e) {
                                                    K(o, r, i, a, u, 'next', e);
                                                }
                                                function u(e) {
                                                    K(
                                                        o,
                                                        r,
                                                        i,
                                                        a,
                                                        u,
                                                        'throw',
                                                        e,
                                                    );
                                                }
                                                a(void 0);
                                            });
                                        });
                                    return function() {
                                        return n.apply(this, arguments);
                                    };
                                })(),
                            },
                            {
                                key: 'createValueItemValidator',
                                value: function() {
                                    return i
                                        .string()
                                        .length(
                                            32,
                                            "Field '"
                                                .concat(
                                                    this.getDisplayName(),
                                                    "' should be ",
                                                )
                                                .concat(32, ' characters long'),
                                        )
                                        .typeError(
                                            this.getTypeErrorMessage(
                                                'a string',
                                            ),
                                        );
                                },
                            },
                        ]) && Q(n.prototype, r),
                        o && Q(n, o),
                        t
                    );
                })(),
                te = void 0;
            function ne(e, t) {
                return (
                    (function(e) {
                        if (Array.isArray(e)) return e;
                    })(e) ||
                    (function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            o = void 0;
                        try {
                            for (
                                var a, u = e[Symbol.iterator]();
                                !(r = (a = u.next()).done) &&
                                (n.push(a.value), !t || n.length !== t);
                                r = !0
                            );
                        } catch (e) {
                            (i = !0), (o = e);
                        } finally {
                            try {
                                r || null == u.return || u.return();
                            } finally {
                                if (i) throw o;
                            }
                        }
                        return n;
                    })(e, t) ||
                    (function() {
                        throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance',
                        );
                    })()
                );
            }
            function re(e, t, n, r, i, o, a) {
                try {
                    var u = e[o](a),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function ie(e) {
                return function() {
                    var t = this,
                        n = arguments;
                    return new Promise(function(r, i) {
                        var o = e.apply(t, n);
                        function a(e) {
                            re(o, r, i, a, u, 'next', e);
                        }
                        function u(e) {
                            re(o, r, i, a, u, 'throw', e);
                        }
                        a(void 0);
                    });
                };
            }
            function oe(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var ae = (function() {
                function e(t) {
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        (this.declaration = t);
                }
                var t, n, o;
                return (
                    (t = e),
                    (n = [
                        {
                            key: 'getSanitizedDeclaration',
                            value: function(e) {
                                var t = e;
                                return (
                                    f.ione(t) || (t = {}),
                                    f.iane(t.schema) || (t.schema = []),
                                    {
                                        name: t.name || '',
                                        schema: t.schema.map(function(e) {
                                            return (function(e) {
                                                var t = e.type,
                                                    n = e.name;
                                                if (!t) return new _(e);
                                                f.isArray(t) &&
                                                    (t = ne(t, 1)[0]);
                                                return t
                                                    ? 'id' === n
                                                        ? new ee(e)
                                                        : 'string' === t
                                                        ? new _(e)
                                                        : 'boolean' === t
                                                        ? new S(e)
                                                        : 'integer' === t
                                                        ? new V(e)
                                                        : 'datetime' === t
                                                        ? new A(e)
                                                        : new J(e)
                                                    : new te(e);
                                            })(e);
                                        }),
                                    }
                                );
                            },
                        },
                        {
                            key: 'getHealth',
                            value: (function() {
                                var e = ie(
                                    regeneratorRuntime.mark(function e() {
                                        var t, n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            if (
                                                                ((t = []),
                                                                (n = this
                                                                    .declaration)
                                                                    .name
                                                                    .length ||
                                                                    t.push({
                                                                        message:
                                                                            'Entity does not have a name',
                                                                        code:
                                                                            'entity_name_empty',
                                                                        entityName:
                                                                            '',
                                                                    }),
                                                                n.schema.length)
                                                            ) {
                                                                e.next = 6;
                                                                break;
                                                            }
                                                            return (
                                                                t.push({
                                                                    message:
                                                                        'Entity does not have a single field',
                                                                    code:
                                                                        'entity_schema_empty',
                                                                    entityName:
                                                                        n.name ||
                                                                        '',
                                                                }),
                                                                e.abrupt(
                                                                    'return',
                                                                    t,
                                                                )
                                                            );
                                                        case 6:
                                                            return (
                                                                (r = {}),
                                                                n.schema.forEach(
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
                                                                                        e,
                                                                                        '" met several times',
                                                                                    ),
                                                                                    code:
                                                                                        'entity_field_duplicate',
                                                                                    fieldName: e,
                                                                                    entityName:
                                                                                        n.name ||
                                                                                        '',
                                                                                },
                                                                            );
                                                                    },
                                                                ),
                                                                r.id ||
                                                                    t.push({
                                                                        message:
                                                                            'Entity does not have id field',
                                                                        code:
                                                                            'entity_no_id_field',
                                                                        entityName:
                                                                            n.name ||
                                                                            '',
                                                                    }),
                                                                (e.next = 12),
                                                                Promise.all(
                                                                    n.schema.map(
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
                                                        case 12:
                                                            return e.abrupt(
                                                                'return',
                                                                t,
                                                            );
                                                        case 13:
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
                                return Object(r.convertToCamel)(
                                    this.getName().toLowerCase(),
                                );
                            },
                        },
                        {
                            key: 'getDisplayName',
                            value: function() {
                                return Object(r.uCFirst)(
                                    this.getName(),
                                ).replace(/_/g, ' ');
                            },
                        },
                        {
                            key: 'getFields',
                            value: function() {
                                return this.declaration.schema;
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                return this.getFields().filter(function(e) {
                                    return e.isReference();
                                });
                            },
                        },
                        {
                            key: 'getSingleReferences',
                            value: function() {
                                return this.getFields().filter(function(e) {
                                    return e.isReference() && !e.isMultiple();
                                });
                            },
                        },
                        {
                            key: 'getMultipleReferences',
                            value: function() {
                                return this.getFields().filter(function(e) {
                                    return e.isReference() && e.isMultiple();
                                });
                            },
                        },
                        {
                            key: 'getField',
                            value: function(e) {
                                return this.declaration.schema[e];
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declaration;
                            },
                        },
                        {
                            key: 'getPreviewField',
                            value: function() {
                                var e = this.declaration.schema.find(function(
                                    e,
                                ) {
                                    return (
                                        'string' === e.getType() &&
                                        'id' !== e.getName() &&
                                        e.isPreview()
                                    );
                                });
                                return (
                                    e ||
                                    (this.declaration.schema.find(function(e) {
                                        return (
                                            'string' === e.getType() &&
                                            'id' !== e.getName()
                                        );
                                    }) ||
                                        null)
                                );
                            },
                        },
                        {
                            key: 'getValidator',
                            value: function() {
                                var e = {};
                                return (
                                    this.declaration.schema.forEach(function(
                                        t,
                                    ) {
                                        e[t.getName()] = t.getValidator();
                                    }),
                                    i.object().shape(e)
                                );
                            },
                        },
                        {
                            key: 'castData',
                            value: function(e) {
                                var t = {};
                                return f.ione(e)
                                    ? (this.getFields().forEach(function(n) {
                                          var r = n.getName();
                                          r in e && (t[r] = n.castValue(e[r]));
                                      }),
                                      t)
                                    : t;
                            },
                        },
                        {
                            key: 'validateData',
                            value: (function() {
                                var e = ie(
                                    regeneratorRuntime.mark(function e(t) {
                                        var n;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (n = null),
                                                                (e.prev = 1),
                                                                (e.next = 4),
                                                                this.getValidator().validate(
                                                                    t,
                                                                    {
                                                                        abortEarly: !1,
                                                                    },
                                                                )
                                                            );
                                                        case 4:
                                                            e.next = 9;
                                                            break;
                                                        case 6:
                                                            (e.prev = 6),
                                                                (e.t0 = e.catch(
                                                                    1,
                                                                )),
                                                                (n = f.isArray(
                                                                    e.t0.inner,
                                                                )
                                                                    ? e.t0.inner.map(
                                                                          function(
                                                                              e,
                                                                          ) {
                                                                              return {
                                                                                  message:
                                                                                      e.message,
                                                                                  fieldName:
                                                                                      e.path,
                                                                              };
                                                                          },
                                                                      )
                                                                    : [
                                                                          {
                                                                              message:
                                                                                  'Internal error',
                                                                              fieldName:
                                                                                  '',
                                                                          },
                                                                      ]);
                                                        case 9:
                                                            return e.abrupt(
                                                                'return',
                                                                n,
                                                            );
                                                        case 10:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this,
                                            [[1, 6]],
                                        );
                                    }),
                                );
                                return function(t) {
                                    return e.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'declaration',
                            set: function(e) {
                                this.declarationInternal = this.getSanitizedDeclaration(
                                    e,
                                );
                            },
                            get: function() {
                                return this.declarationInternal;
                            },
                        },
                    ]) && oe(t.prototype, n),
                    o && oe(t, o),
                    e
                );
            })();
            function ue(e, t, n, r, i, o, a) {
                try {
                    var u = e[o](a),
                        c = u.value;
                } catch (e) {
                    return void n(e);
                }
                u.done ? t(c) : Promise.resolve(c).then(r, i);
            }
            function ce(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r);
                }
            }
            var le = (function() {
                function e() {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                    !(function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                'Cannot call a class as a function',
                            );
                    })(this, e),
                        (this.declaration = t);
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
                                                i = this;
                                            return regeneratorRuntime.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    ((t = []),
                                                                    (n = this.getSchema())
                                                                        .length)
                                                                ) {
                                                                    e.next = 4;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    t,
                                                                );
                                                            case 4:
                                                                return (
                                                                    (r = {}),
                                                                    n.forEach(
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
                                                                    Object.keys(
                                                                        r,
                                                                    ).forEach(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            r[
                                                                                e
                                                                            ] >
                                                                                1 &&
                                                                                t.push(
                                                                                    {
                                                                                        message: 'Entity "'.concat(
                                                                                            r[
                                                                                                e
                                                                                            ],
                                                                                            '" met several times',
                                                                                        ),
                                                                                        code:
                                                                                            'entity_duplicate',
                                                                                        entityName:
                                                                                            r[
                                                                                                e
                                                                                            ],
                                                                                    },
                                                                                );
                                                                        },
                                                                    ),
                                                                    (e.next = 9),
                                                                    Promise.all(
                                                                        n.map(
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
                                                            case 9:
                                                                return (
                                                                    this.getReferences().forEach(
                                                                        function(
                                                                            e,
                                                                        ) {
                                                                            var n = e.getReferenceFieldName();
                                                                            i.getEntity(
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
                                            var o = e.apply(t, n);
                                            function a(e) {
                                                ue(o, r, i, a, u, 'next', e);
                                            }
                                            function u(e) {
                                                ue(o, r, i, a, u, 'throw', e);
                                            }
                                            a(void 0);
                                        });
                                    });
                                return function() {
                                    return t.apply(this, arguments);
                                };
                            })(),
                        },
                        {
                            key: 'getSanitizedDeclaration',
                            value: function(e) {
                                f.ione(e) || (e = {}),
                                    f.iane(e.schema) || (e.schema = []);
                                var t = parseInt(e.version, 10);
                                return (
                                    Number.isNaN(t) && (t = 0),
                                    {
                                        schema: e.schema.map(function(e) {
                                            return new ae(e);
                                        }),
                                        version: t,
                                    }
                                );
                            },
                        },
                        {
                            key: 'toJSON',
                            value: function() {
                                return this.declarationInternal;
                            },
                        },
                        {
                            key: 'getDeclaration',
                            value: function() {
                                return this.declarationInternal;
                            },
                        },
                        {
                            key: 'get',
                            value: function() {
                                return this.declarationInternal;
                            },
                        },
                        {
                            key: 'getSchema',
                            value: function() {
                                return this.declaration.schema;
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
                                return this.declaration.schema.find(function(
                                    t,
                                ) {
                                    return t.getName() === e;
                                });
                            },
                        },
                        {
                            key: 'getReferences',
                            value: function() {
                                var e = [];
                                return (
                                    this.declaration.schema.forEach(function(
                                        t,
                                    ) {
                                        e = f.union(e, t.getReferences());
                                    }),
                                    e
                                );
                            },
                        },
                        {
                            key: 'isEmpty',
                            value: function() {
                                return !this.declaration.schema.length;
                            },
                        },
                        {
                            key: 'declaration',
                            set: function(e) {
                                this.declarationInternal = this.getSanitizedDeclaration(
                                    e,
                                );
                            },
                            get: function() {
                                return this.declarationInternal;
                            },
                        },
                    ]) && ce(t.prototype, n),
                    r && ce(t, r),
                    e
                );
            })();
            n.d(t, 'ENTITY_ID_FIELD_NAME', function() {
                return 'id';
            }),
                n.d(t, 'ENTITY_PK_FIELD_NAME', function() {
                    return 'idInternal';
                }),
                n.d(t, 'REFERENCE_ENTITY_PARENT_FIELD_NAME', function() {
                    return 'self';
                }),
                n.d(t, 'REFERENCE_ENTITY_CHILD_FIELD_NAME', function() {
                    return 'rel';
                }),
                n.d(t, 'ENTITY_ID_FIELD_LENGTH', function() {
                    return 32;
                }),
                n.d(t, 'FIELD_TYPE_STRING', function() {
                    return 'string';
                }),
                n.d(t, 'FIELD_TYPE_INTEGER', function() {
                    return 'integer';
                }),
                n.d(t, 'FIELD_TYPE_BOOLEAN', function() {
                    return 'boolean';
                }),
                n.d(t, 'FIELD_TYPE_DATETIME', function() {
                    return 'datetime';
                }),
                n.d(t, 'Schema', function() {
                    return le;
                }),
                n.d(t, 'Entity', function() {
                    return ae;
                }),
                n.d(t, 'StringField', function() {
                    return _;
                }),
                n.d(t, 'IdStringField', function() {
                    return ee;
                }),
                n.d(t, 'IntegerField', function() {
                    return V;
                }),
                n.d(t, 'BooleanField', function() {
                    return S;
                }),
                n.d(t, 'DateTimeField', function() {
                    return A;
                }),
                n.d(t, 'ReferenceField', function() {
                    return J;
                });
        },
    ]),
);
