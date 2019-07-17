(function(e, a) {
    for (var i in a) e[i] = a[i];
})(
    exports,
    /******/ (function(modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/ var installedModules = {}; // The require function
        /******/
        /******/ /******/ function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) {
                /******/ return installedModules[moduleId].exports;
                /******/
            } // Create a new module (and put it into the cache)
            /******/ /******/ var module = (installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {},
                /******/
            }); // Execute the module function
            /******/
            /******/ /******/ modules[moduleId].call(
                module.exports,
                module,
                module.exports,
                __webpack_require__,
            ); // Flag the module as loaded
            /******/
            /******/ /******/ module.l = true; // Return the exports of the module
            /******/
            /******/ /******/ return module.exports;
            /******/
        } // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/ /******/ __webpack_require__.m = modules; // expose the module cache
        /******/
        /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
        /******/
        /******/ /******/ __webpack_require__.d = function(
            exports,
            name,
            getter,
        ) {
            /******/ if (!__webpack_require__.o(exports, name)) {
                /******/ Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter,
                });
                /******/
            }
            /******/
        }; // define __esModule on exports
        /******/
        /******/ /******/ __webpack_require__.r = function(exports) {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module',
                });
                /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            /******/
        }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
        /******/
        /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
            value,
            mode,
        ) {
            /******/ if (mode & 1) value = __webpack_require__(value);
            /******/ if (mode & 8) return value;
            /******/ if (
                mode & 4 &&
                typeof value === 'object' &&
                value &&
                value.__esModule
            )
                return value;
            /******/ var ns = Object.create(null);
            /******/ __webpack_require__.r(ns);
            /******/ Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value,
            });
            /******/ if (mode & 2 && typeof value != 'string')
                for (var key in value)
                    __webpack_require__.d(
                        ns,
                        key,
                        function(key) {
                            return value[key];
                        }.bind(null, key),
                    );
            /******/ return ns;
            /******/
        }; // getDefaultExport function for compatibility with non-harmony modules
        /******/
        /******/ /******/ __webpack_require__.n = function(module) {
            /******/ var getter =
                module && module.__esModule
                    ? /******/ function getDefault() {
                          return module['default'];
                      }
                    : /******/ function getModuleExports() {
                          return module;
                      };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
            /******/
        }; // Object.prototype.hasOwnProperty.call
        /******/
        /******/ /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }; // __webpack_public_path__
        /******/
        /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
        /******/
        /******/
        /******/ /******/ return __webpack_require__(
            (__webpack_require__.s = './src/index.js'),
        );
        /******/
    })(
        /************************************************************************/
        /******/ {
            /***/ './src/api/home.js':
                /*!*************************!*\
  !*** ./src/api/home.js ***!
  \*************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! ew-internals */ 'ew-internals',
                    );
                    /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        ew_internals__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var _hz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! ./hz */ './src/api/hz.ts',
                    );

                    const useHomeAPI = app => {
                        app.get(
                            '/',
                            Object(
                                ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                    'wrapError'
                                ],
                            )(async (req, res) => {
                                res.status(200).send('Hello');
                            }),
                        );
                    };

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = useHomeAPI;

                    /***/
                },

            /***/ './src/api/hz.ts':
                /*!***********************!*\
  !*** ./src/api/hz.ts ***!
  \***********************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    const hz = 1;
                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = hz;

                    /***/
                },

            /***/ './src/api/schema.js':
                /*!***************************!*\
  !*** ./src/api/schema.js ***!
  \***************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! ew-internals */ 'ew-internals',
                        );
                        /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            ew_internals__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__,
                        );
                        /* harmony import */ var _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                            /*! ../lib/schema-store */ './src/lib/schema-store.js',
                        );

                        // todo: move sendJSONResult() to ew-internals

                        const sendJSONResult = (res, result, code = null) => {
                            let status = 200;

                            if (code) {
                                status = code;
                            } else if (
                                result.errors.find(
                                    error => error.type === 'internal',
                                )
                            ) {
                                status = 500;
                            } else if (
                                result.errors.find(
                                    error => error.type === 'request',
                                )
                            ) {
                                status = 400;
                            }

                            return res
                                .header('Content-Type', 'application/json')
                                .status(status)
                                .send(JSON.stringify(result));
                        };

                        const useSchemaAPI = (app, params = {}) => {
                            const { connectionManager } = params;
                            /**
                             * Get schema entity (draft or actual)
                             */

                            app.get(
                                '/schema/:type/:entity',
                                Object(
                                    ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                        'wrapError'
                                    ],
                                )(async (req, res) => {
                                    const result = {
                                        errors: [],
                                        data: null,
                                    };

                                    const entity = _.get(req, 'params.entity');

                                    const type = _.get(req, 'params.type');

                                    if (type !== 'draft' && type !== 'actual') {
                                        result.errors.push({
                                            message: 'Illegal schema type',
                                            code: 'illegal_schema_type',
                                            type: 'request',
                                        });
                                        return sendJSONResult(res, result);
                                    }

                                    const schema = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__[
                                        'default'
                                    ].load(type, connectionManager);

                                    if (schema) {
                                        result.data = schema.getEntity(entity);
                                    }

                                    return sendJSONResult(
                                        res,
                                        result,
                                        !result.data ? 404 : null,
                                    );
                                }),
                            );
                            /**
                             * Get the entire schema (draft or actual)
                             */

                            app.get(
                                '/schema/:type',
                                Object(
                                    ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                        'wrapError'
                                    ],
                                )(async (req, res) => {
                                    const result = {
                                        errors: [],
                                        data: null,
                                    };

                                    const type = _.get(req, 'params.type');

                                    if (type !== 'draft' && type !== 'actual') {
                                        result.errors.push({
                                            message: 'Illegal schema type',
                                            code: 'illegal_schema_type',
                                            type: 'request',
                                        });
                                        return sendJSONResult(res, result);
                                    }

                                    result.data = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__[
                                        'default'
                                    ].load(type, connectionManager);
                                    return sendJSONResult(
                                        res,
                                        result,
                                        !result.data ? 404 : null,
                                    );
                                }),
                            );
                            /**
                             * Commit the draft schema to the actual schema
                             */

                            app.put(
                                '/schema',
                                Object(
                                    ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                        'wrapError'
                                    ],
                                )(async (req, res) => {
                                    const result = {
                                        errors: [],
                                    }; // replace an actual schema with a draft

                                    const draftSchema = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__[
                                        'default'
                                    ].load('draft', connectionManager);

                                    if (draftSchema) {
                                        result.errors = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__[
                                            'default'
                                        ].put(
                                            'actual',
                                            draftSchema,
                                            connectionManager,
                                        );
                                    }

                                    return sendJSONResult(res, result);
                                }),
                            );
                            /**
                             * Save draft schema
                             */

                            app.patch(
                                '/schema',
                                Object(
                                    ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                        'wrapError'
                                    ],
                                )(async (req, res) => {
                                    // save new schema as draft, check first
                                    const result = {
                                        errors: [],
                                    };

                                    const schema = _.get(req, 'body.schema');

                                    result.errors = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_2__[
                                        'default'
                                    ].put(
                                        'draft',
                                        new project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                            'Schema'
                                        ]({
                                            schema,
                                        }).getSchema(), // todo: this makes a vulnerability
                                        connectionManager,
                                    );
                                    return sendJSONResult(res, result);
                                }),
                            );
                        };

                        /* harmony default export */ __webpack_exports__[
                            'default'
                        ] = useSchemaAPI;
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/api/sync.js':
                /*!*************************!*\
  !*** ./src/api/sync.js ***!
  \*************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! ew-internals */ 'ew-internals',
                    );
                    /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        ew_internals__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var _lib_database_migrator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! ../lib/database/migrator */ './src/lib/database/migrator.js',
                    );

                    const useSyncAPI = (app, params = {}) => {
                        app.get(
                            '/sync',
                            Object(
                                ew_internals__WEBPACK_IMPORTED_MODULE_0__[
                                    'wrapError'
                                ],
                            )(async (req, res) => {
                                await _lib_database_migrator__WEBPACK_IMPORTED_MODULE_1__[
                                    'default'
                                ].migrate(params);
                                res.status(200).send(`<pre>1</pre>`);
                            }),
                        );
                    };

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = useSyncAPI;

                    /***/
                },

            /***/ './src/entity/schema.js':
                /*!******************************!*\
  !*** ./src/entity/schema.js ***!
  \******************************/
                /*! exports provided: schema, default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'schema',
                        function() {
                            return schema;
                        },
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! typeorm */ 'typeorm',
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        typeorm__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! project-minimum-core */ 'project-minimum-core',
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                        project_minimum_core__WEBPACK_IMPORTED_MODULE_1__,
                    );

                    const schema = {
                        name:
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                'DB_SCHEMA_TABLE_NAME'
                            ],
                        columns: {
                            id: {
                                primary: true,
                                type: 'integer',
                                generated: 'increment',
                                nullable: false,
                            },
                            draft: {
                                type: 'boolean',
                                nullable: false,
                            },
                            schema: {
                                type: 'json',
                                nullable: false,
                            },
                            version: {
                                type: 'integer',
                                defaultValue: 0,
                            },
                        },
                    };
                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = new typeorm__WEBPACK_IMPORTED_MODULE_0__[
                        'EntitySchema'
                    ](schema);

                    /***/
                },

            /***/ './src/graphql/resolvers/index.js':
                /*!****************************************!*\
  !*** ./src/graphql/resolvers/index.js ***!
  \****************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = [];

                    /***/
                },

            /***/ './src/graphql/types/error.graphql':
                /*!*****************************************!*\
  !*** ./src/graphql/types/error.graphql ***!
  \*****************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    var doc = {
                        kind: 'Document',
                        definitions: [
                            {
                                kind: 'ObjectTypeDefinition',
                                name: { kind: 'Name', value: 'Error' },
                                interfaces: [],
                                directives: [],
                                fields: [
                                    {
                                        kind: 'FieldDefinition',
                                        name: { kind: 'Name', value: 'code' },
                                        arguments: [],
                                        type: {
                                            kind: 'NonNullType',
                                            type: {
                                                kind: 'NamedType',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'String',
                                                },
                                            },
                                        },
                                        directives: [],
                                    },
                                    {
                                        kind: 'FieldDefinition',
                                        name: {
                                            kind: 'Name',
                                            value: 'message',
                                        },
                                        arguments: [],
                                        type: {
                                            kind: 'NamedType',
                                            name: {
                                                kind: 'Name',
                                                value: 'String',
                                            },
                                        },
                                        directives: [],
                                    },
                                    {
                                        kind: 'FieldDefinition',
                                        name: {
                                            kind: 'Name',
                                            value: 'subject',
                                        },
                                        arguments: [],
                                        type: {
                                            kind: 'NamedType',
                                            name: {
                                                kind: 'Name',
                                                value: 'String',
                                            },
                                        },
                                        directives: [],
                                    },
                                ],
                            },
                        ],
                        loc: { start: 0, end: 73 },
                    };
                    doc.loc.source = {
                        body:
                            'type Error {\n    code: String!\n    message: String\n    subject: String\n}\n',
                        name: 'GraphQL request',
                        locationOffset: { line: 1, column: 1 },
                    };

                    var names = {};
                    function unique(defs) {
                        return defs.filter(function(def) {
                            if (def.kind !== 'FragmentDefinition') return true;
                            var name = def.name.value;
                            if (names[name]) {
                                return false;
                            } else {
                                names[name] = true;
                                return true;
                            }
                        });
                    }

                    module.exports = doc;

                    /***/
                },

            /***/ './src/graphql/types/filter.graphql':
                /*!******************************************!*\
  !*** ./src/graphql/types/filter.graphql ***!
  \******************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    var doc = {
                        kind: 'Document',
                        definitions: [
                            {
                                kind: 'EnumTypeDefinition',
                                name: { kind: 'Name', value: 'FilterLogic' },
                                directives: [],
                                values: [
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'AND' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'OR' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'NAND' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'NOR' },
                                        directives: [],
                                    },
                                ],
                            },
                            {
                                kind: 'EnumTypeDefinition',
                                name: { kind: 'Name', value: 'FilterOperator' },
                                directives: [],
                                values: [
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'EQ' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'NE' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'IN' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'NIN' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'GT' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'LT' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'GTE' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'LTE' },
                                        directives: [],
                                    },
                                ],
                            },
                            {
                                kind: 'InputObjectTypeDefinition',
                                name: {
                                    kind: 'Name',
                                    value: 'IFilterFieldValue',
                                },
                                directives: [],
                                fields: [
                                    {
                                        kind: 'InputValueDefinition',
                                        name: {
                                            kind: 'Name',
                                            value: 'Operation',
                                        },
                                        type: {
                                            kind: 'NamedType',
                                            name: {
                                                kind: 'Name',
                                                value: 'FilterOperator',
                                            },
                                        },
                                        directives: [],
                                    },
                                    {
                                        kind: 'InputValueDefinition',
                                        name: { kind: 'Name', value: 'ValueA' },
                                        type: {
                                            kind: 'NamedType',
                                            name: {
                                                kind: 'Name',
                                                value: 'String',
                                            },
                                        },
                                        directives: [],
                                    },
                                    {
                                        kind: 'InputValueDefinition',
                                        name: { kind: 'Name', value: 'ValueB' },
                                        type: {
                                            kind: 'ListType',
                                            type: {
                                                kind: 'NamedType',
                                                name: {
                                                    kind: 'Name',
                                                    value: 'String',
                                                },
                                            },
                                        },
                                        directives: [],
                                    },
                                ],
                            },
                        ],
                        loc: { start: 0, end: 236 },
                    };
                    doc.loc.source = {
                        body:
                            'enum FilterLogic {\n    AND\n    OR\n    NAND\n    NOR\n}\n\nenum FilterOperator {\n    EQ\n    NE\n    IN\n    NIN\n    GT\n    LT\n    GTE\n    LTE\n}\n\ninput IFilterFieldValue {\n    Operation: FilterOperator\n    ValueA: String\n    ValueB: [String]\n}\n',
                        name: 'GraphQL request',
                        locationOffset: { line: 1, column: 1 },
                    };

                    var names = {};
                    function unique(defs) {
                        return defs.filter(function(def) {
                            if (def.kind !== 'FragmentDefinition') return true;
                            var name = def.name.value;
                            if (names[name]) {
                                return false;
                            } else {
                                names[name] = true;
                                return true;
                            }
                        });
                    }

                    module.exports = doc;

                    /***/
                },

            /***/ './src/graphql/types/index.js':
                /*!************************************!*\
  !*** ./src/graphql/types/index.js ***!
  \************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var _error_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! ./error.graphql */ './src/graphql/types/error.graphql',
                    );
                    /* harmony import */ var _error_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        _error_graphql__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var _sort_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! ./sort.graphql */ './src/graphql/types/sort.graphql',
                    );
                    /* harmony import */ var _sort_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                        _sort_graphql__WEBPACK_IMPORTED_MODULE_1__,
                    );
                    /* harmony import */ var _filter_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                        /*! ./filter.graphql */ './src/graphql/types/filter.graphql',
                    );
                    /* harmony import */ var _filter_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                        _filter_graphql__WEBPACK_IMPORTED_MODULE_2__,
                    );

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = [
                        _error_graphql__WEBPACK_IMPORTED_MODULE_0___default.a,
                        _sort_graphql__WEBPACK_IMPORTED_MODULE_1___default.a,
                        _filter_graphql__WEBPACK_IMPORTED_MODULE_2___default.a,
                    ];

                    /***/
                },

            /***/ './src/graphql/types/sort.graphql':
                /*!****************************************!*\
  !*** ./src/graphql/types/sort.graphql ***!
  \****************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    var doc = {
                        kind: 'Document',
                        definitions: [
                            {
                                kind: 'EnumTypeDefinition',
                                name: { kind: 'Name', value: 'SortOrder' },
                                directives: [],
                                values: [
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'ASC' },
                                        directives: [],
                                    },
                                    {
                                        kind: 'EnumValueDefinition',
                                        name: { kind: 'Name', value: 'DESC' },
                                        directives: [],
                                    },
                                ],
                            },
                        ],
                        loc: { start: 0, end: 36 },
                    };
                    doc.loc.source = {
                        body: 'enum SortOrder {\n    ASC\n    DESC\n}\n',
                        name: 'GraphQL request',
                        locationOffset: { line: 1, column: 1 },
                    };

                    var names = {};
                    function unique(defs) {
                        return defs.filter(function(def) {
                            if (def.kind !== 'FragmentDefinition') return true;
                            var name = def.name.value;
                            if (names[name]) {
                                return false;
                            } else {
                                names[name] = true;
                                return true;
                            }
                        });
                    }

                    module.exports = doc;

                    /***/
                },

            /***/ './src/index.js':
                /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
                /*! no exports provided */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(logger) {
                        /* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! @babel/polyfill */ '@babel/polyfill',
                        );
                        /* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! ew-internals */ 'ew-internals',
                        );
                        /* harmony import */ var ew_internals__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                            ew_internals__WEBPACK_IMPORTED_MODULE_1__,
                        );
                        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                            /*! path */ 'path',
                        );
                        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                            path__WEBPACK_IMPORTED_MODULE_2__,
                        );
                        /* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                            /*! helmet */ 'helmet',
                        );
                        /* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
                            helmet__WEBPACK_IMPORTED_MODULE_3__,
                        );
                        /* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                            /*! express */ 'express',
                        );
                        /* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(
                            express__WEBPACK_IMPORTED_MODULE_4__,
                        );
                        /* harmony import */ var _lib_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                            /*! ./lib/error-handler */ './src/lib/error-handler.js',
                        );
                        /* harmony import */ var _lib_cors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
                            /*! ./lib/cors */ './src/lib/cors.js',
                        );
                        /* harmony import */ var _lib_cache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
                            /*! ./lib/cache */ './src/lib/cache.js',
                        );
                        /* harmony import */ var _lib_database_connection_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
                            /*! ./lib/database/connection-manager */ './src/lib/database/connection-manager.js',
                        );
                        /* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
                            /*! ./api/home */ './src/api/home.js',
                        );
                        /* harmony import */ var _lib_graphql_apollo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
                            /*! ./lib/graphql/apollo */ './src/lib/graphql/apollo.js',
                        );
                        /* harmony import */ var _api_schema__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
                            /*! ./api/schema */ './src/api/schema.js',
                        );
                        /* harmony import */ var _api_sync__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
                            /*! ./api/sync */ './src/api/sync.js',
                        );

                        // import { InterCom } from './lib/intercom';

                        (async () => {
                            const app = express__WEBPACK_IMPORTED_MODULE_4___default()();
                            const settings = new ew_internals__WEBPACK_IMPORTED_MODULE_1__[
                                'Settings'
                            ]();
                            Object(
                                _lib_error_handler__WEBPACK_IMPORTED_MODULE_5__[
                                    'default'
                                ],
                            )(app);
                            const host = await settings.get(
                                'network.host',
                                'localhost',
                            );
                            const port =
                                process.env.PORT ||
                                (await settings.get('network.port', 3000));
                            app.set('host', host);
                            app.set('port', port); // app.set('query parser', query => {
                            //   return qs.parse(query, { allowPrototypes: false, depth: 10 });
                            // });

                            Object(
                                _lib_cors__WEBPACK_IMPORTED_MODULE_6__[
                                    'default'
                                ],
                            )(app, settings);
                            app.use(
                                express__WEBPACK_IMPORTED_MODULE_4___default.a.static(
                                    path__WEBPACK_IMPORTED_MODULE_2___default.a.join(
                                        process.cwd(),
                                        'public',
                                    ),
                                ),
                            );
                            app.use(
                                helmet__WEBPACK_IMPORTED_MODULE_3___default()(),
                            );
                            app.use(
                                express__WEBPACK_IMPORTED_MODULE_4___default.a.json(),
                            );
                            app.use(
                                express__WEBPACK_IMPORTED_MODULE_4___default.a.urlencoded(
                                    {
                                        extended: true,
                                    },
                                ),
                            );
                            const cache = await _lib_cache__WEBPACK_IMPORTED_MODULE_7__[
                                'default'
                            ].make({
                                settings,
                            });
                            const connectionManager = new _lib_database_connection_manager__WEBPACK_IMPORTED_MODULE_8__[
                                'default'
                            ]({
                                settings,
                            });
                            const systemConnection = await connectionManager.getSystem();
                            await systemConnection.runMigrations(); // const intercom = new InterCom({
                            //     url: await settings.get('intercom.url', ''),
                            // });
                            // await intercom.start();

                            Object(
                                _api_home__WEBPACK_IMPORTED_MODULE_9__[
                                    'default'
                                ],
                            )(app, {
                                cache,
                            });
                            Object(
                                _lib_graphql_apollo__WEBPACK_IMPORTED_MODULE_10__[
                                    'default'
                                ],
                            )(app, {
                                settings,
                                cache,
                                connectionManager,
                            });
                            Object(
                                _api_schema__WEBPACK_IMPORTED_MODULE_11__[
                                    'default'
                                ],
                            )(app, {
                                cache,
                                connectionManager,
                            });
                            Object(
                                _api_sync__WEBPACK_IMPORTED_MODULE_12__[
                                    'default'
                                ],
                            )(app, {
                                cache,
                                connectionManager,
                            }); // todo: temporary endpoint

                            app.listen(
                                {
                                    port,
                                },
                                () => {
                                    logger.info(
                                        `🚀 API server is ready at http://${host}:${port}`,
                                        !false,
                                    );
                                },
                            );
                        })();
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/lib/cache.js':
                /*!**************************!*\
  !*** ./src/lib/cache.js ***!
  \**************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'default',
                            function() {
                                return Cache;
                            },
                        );
                        /* harmony import */ var redis_tag_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! redis-tag-cache */ 'redis-tag-cache',
                        );
                        /* harmony import */ var redis_tag_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            redis_tag_cache__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! ./util */ './src/lib/util.js',
                        );
                        function _objectSpread(target) {
                            for (var i = 1; i < arguments.length; i++) {
                                var source =
                                    arguments[i] != null ? arguments[i] : {};
                                var ownKeys = Object.keys(source);
                                if (
                                    typeof Object.getOwnPropertySymbols ===
                                    'function'
                                ) {
                                    ownKeys = ownKeys.concat(
                                        Object.getOwnPropertySymbols(
                                            source,
                                        ).filter(function(sym) {
                                            return Object.getOwnPropertyDescriptor(
                                                source,
                                                sym,
                                            ).enumerable;
                                        }),
                                    );
                                }
                                ownKeys.forEach(function(key) {
                                    _defineProperty(target, key, source[key]);
                                });
                            }
                            return target;
                        }

                        function _defineProperty(obj, key, value) {
                            if (key in obj) {
                                Object.defineProperty(obj, key, {
                                    value: value,
                                    enumerable: true,
                                    configurable: true,
                                    writable: true,
                                });
                            } else {
                                obj[key] = value;
                            }
                            return obj;
                        }

                        /**
                         * A purpose of this class is to gracefully handle situations when
                         * no cache endpoint provided
                         */

                        class Cache {
                            static async make(params = {}) {
                                const { settings } = params;

                                if (!settings) {
                                    throw new Error('No settings provided');
                                }

                                const url = await settings.get(
                                    'cache.url',
                                    null,
                                );
                                const password = await settings.get(
                                    'cache.password',
                                    null,
                                );
                                return new this({
                                    url,
                                    password,
                                });
                            }

                            constructor(props = {}) {
                                const { url, password } = props;
                                this.cache = null;

                                if (_.isne(url)) {
                                    const sUrl = Object(
                                        _util__WEBPACK_IMPORTED_MODULE_1__[
                                            'decomposeURL'
                                        ],
                                    )(
                                        Object(
                                            _util__WEBPACK_IMPORTED_MODULE_1__[
                                                'injectPassword'
                                            ],
                                        )(url, password),
                                    );

                                    if (sUrl === null) {
                                        // logger.warn('Illegal URL passed, will proceed without cache');
                                        return;
                                    }

                                    this.cache = new redis_tag_cache__WEBPACK_IMPORTED_MODULE_0___default.a(
                                        {
                                            redis: _objectSpread({}, sUrl, {
                                                connectTimeout: 1000,
                                            }),
                                        },
                                    );
                                }
                            }

                            async get(...args) {
                                if (this.cache) {
                                    return this.cache.get(...args);
                                }

                                return null;
                            }

                            async set(...args) {
                                if (this.cache) {
                                    return this.cache.set(...args);
                                }

                                return null;
                            }

                            async invalidate(...args) {
                                if (this.cache) {
                                    return this.cache.invalidate(...args);
                                }

                                return null;
                            }
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/lib/cors.js':
                /*!*************************!*\
  !*** ./src/lib/cors.js ***!
  \*************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_, logger) {
                        /* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! cors */ 'cors',
                        );
                        /* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            cors__WEBPACK_IMPORTED_MODULE_0__,
                        );

                        const useCORS = (app, settings) => {
                            app.use(
                                cors__WEBPACK_IMPORTED_MODULE_0___default()({
                                    origin: (origin, cb) => {
                                        // allow requests with no origin, like mobile apps or curl requests
                                        if (!origin) {
                                            return cb(null, true);
                                        } // get cors settings on each hit, to be able to change it at the run-time

                                        settings
                                            .get('network.cors', null)
                                            .then(corsSettings => {
                                                if (corsSettings === '*') {
                                                    return cb(null, true);
                                                }

                                                const origins = _.isne(
                                                    corsSettings,
                                                )
                                                    ? corsSettings
                                                          .split(',')
                                                          .map(x => x.trim())
                                                    : [];
                                                let match = false;

                                                if (_.iane(origins)) {
                                                    // we have CORS settings
                                                    match =
                                                        origins.indexOf(
                                                            origin,
                                                        ) >= 0;
                                                }

                                                if (match) {
                                                    return cb(null, true);
                                                } else {
                                                    return cb(
                                                        new Error(
                                                            'CORS mismatch',
                                                        ),
                                                        false,
                                                    ); // todo: throw 403
                                                }
                                            })
                                            .catch(error => {
                                                logger.error(
                                                    'Error occurred when checking CORS',
                                                    error,
                                                );
                                                return cb(
                                                    new Error('CORS error'),
                                                    false,
                                                ); // todo: throw 500
                                            });
                                    },
                                }),
                            );
                        };

                        /* harmony default export */ __webpack_exports__[
                            'default'
                        ] = useCORS;
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/lib/database/code-id.js':
                /*!*************************************!*\
  !*** ./src/lib/database/code-id.js ***!
  \*************************************/
                /*! exports provided: CodeId */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'CodeId',
                        function() {
                            return CodeId;
                        },
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! typeorm */ 'typeorm',
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        typeorm__WEBPACK_IMPORTED_MODULE_0__,
                    );

                    class CodeId {
                        constructor({ connection } = {}) {
                            this.connection = connection;
                            this.codeToId = {};
                            this.codeToGet = {};
                            this.entities = {};
                        }

                        addCode(code, databaseEntity) {
                            if (this.codeToId[code]) {
                                return;
                            }

                            const entityName = databaseEntity.options.name;
                            this.entities[entityName] = databaseEntity;
                            this.codeToGet[entityName] =
                                this.codeToGet[entityName] || [];
                            this.codeToGet[entityName].push(code);
                        }

                        getId(code) {
                            return this.codeToId[code] || null;
                        }

                        async obtain() {
                            await Promise.all(
                                Object.keys(this.codeToGet).map(entityName => {
                                    const entity = this.entities[entityName];
                                    const repository = this.connection.getRepository(
                                        entity,
                                    );
                                    return repository
                                        .find({
                                            where: {
                                                code: Object(
                                                    typeorm__WEBPACK_IMPORTED_MODULE_0__[
                                                        'In'
                                                    ],
                                                )(this.codeToGet[entityName]),
                                            },
                                            select: ['id', 'code'],
                                        })
                                        .then(items => {
                                            items.forEach(item => {
                                                this.codeToId[item.code] =
                                                    item.id;
                                            });
                                        });
                                }),
                            );
                        }
                    }

                    /***/
                },

            /***/ './src/lib/database/connection-manager.js':
                /*!************************************************!*\
  !*** ./src/lib/database/connection-manager.js ***!
  \************************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'default',
                        function() {
                            return ConnectionManager;
                        },
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! typeorm */ 'typeorm',
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        typeorm__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var _entity_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! ../../entity/schema */ './src/entity/schema.js',
                    );
                    /* harmony import */ var _migrations_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                        /*! ../../migrations/index */ './src/migrations/index.js',
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                        /*! project-minimum-core */ 'project-minimum-core',
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
                        project_minimum_core__WEBPACK_IMPORTED_MODULE_3__,
                    );
                    /* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                        /*! ../util */ './src/lib/util.js',
                    );
                    function _objectSpread(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source =
                                arguments[i] != null ? arguments[i] : {};
                            var ownKeys = Object.keys(source);
                            if (
                                typeof Object.getOwnPropertySymbols ===
                                'function'
                            ) {
                                ownKeys = ownKeys.concat(
                                    Object.getOwnPropertySymbols(source).filter(
                                        function(sym) {
                                            return Object.getOwnPropertyDescriptor(
                                                source,
                                                sym,
                                            ).enumerable;
                                        },
                                    ),
                                );
                            }
                            ownKeys.forEach(function(key) {
                                _defineProperty(target, key, source[key]);
                            });
                        }
                        return target;
                    }

                    function _defineProperty(obj, key, value) {
                        if (key in obj) {
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: true,
                                configurable: true,
                                writable: true,
                            });
                        } else {
                            obj[key] = value;
                        }
                        return obj;
                    }

                    class ConnectionManager {
                        constructor({ settings }) {
                            this.settings = settings;
                            this.connections = {};
                        }
                        /**
                         * Creates a regular connection to get data over
                         * @param entities
                         * @param preConnect
                         * @returns {Promise<*>}
                         */

                        async get({ entities, preConnect }) {
                            if (!this.connections.entity) {
                                this.connections.entity = this.make({
                                    settings: this.settings,
                                    entities,
                                    preConnect,
                                });
                            }

                            return this.connections.entity;
                        }
                        /**
                         * Close current regular connection
                         * @returns {Promise<void>}
                         */

                        async close() {
                            if (this.connections.entity) {
                                await this.connections.entity.close();
                                this.connections.entity = null;
                            }
                        }
                        /**
                         * Creates a system connection to get the schema over
                         * @returns {Promise<*|CacheConfigurator.simple|buttonStyle.simple|{'&,&:focus,&:hover,&:visited', '&$primary', '&$info', '&$success', '&$warning', '&$rose', '&$danger', '&$twitter', '&$facebook', '&$google', '&$github'}>}
                         */

                        async getSystem() {
                            if (!this.connections.simple) {
                                this.connections.simple = this.make({
                                    name: 'system',
                                    settings: this.settings,
                                    entities: [
                                        _entity_schema__WEBPACK_IMPORTED_MODULE_1__[
                                            'default'
                                        ],
                                    ],
                                    migrationsTableName:
                                        project_minimum_core__WEBPACK_IMPORTED_MODULE_3__[
                                            'DB_MIGRATION_TABLE_NAME'
                                        ],
                                    migrations:
                                        _migrations_index__WEBPACK_IMPORTED_MODULE_2__[
                                            'default'
                                        ],
                                });
                            }

                            return this.connections.simple;
                        }

                        async invalidateConnections() {
                            await this.close();
                            this.connections = {};
                        }

                        async make(params = {}) {
                            const { settings } = params;

                            if (!settings) {
                                throw new Error('No settings provided');
                            }

                            const url = await settings.get('db.url', null);
                            const password = await settings.get(
                                'db.password',
                                null,
                            );
                            const sUrl = Object(
                                _util__WEBPACK_IMPORTED_MODULE_4__[
                                    'injectPassword'
                                ],
                            )(url, password);
                            return Object(
                                typeorm__WEBPACK_IMPORTED_MODULE_0__[
                                    'createConnection'
                                ],
                            )(
                                _objectSpread({}, params, {
                                    url: sUrl,
                                    type: 'postgres',
                                }),
                            );
                        }
                    }

                    /***/
                },

            /***/ './src/lib/database/data-loader-pool.js':
                /*!**********************************************!*\
  !*** ./src/lib/database/data-loader-pool.js ***!
  \**********************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'default',
                            function() {
                                return DataLoaderPool;
                            },
                        );
                        /* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! dataloader */ 'dataloader',
                        );
                        /* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            dataloader__WEBPACK_IMPORTED_MODULE_0__,
                        );

                        class DataLoaderPool {
                            constructor() {
                                this.pool = {};
                            }

                            get(loaderId, fn) {
                                if (
                                    !_.isne(loaderId) ||
                                    typeof fn !== 'function'
                                ) {
                                    return null;
                                }

                                if (!this.pool[loaderId]) {
                                    this.pool[
                                        loaderId
                                    ] = new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(
                                        fn,
                                    );
                                }

                                return this.pool[loaderId];
                            }
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/lib/database/entity-manager.js':
                /*!********************************************!*\
  !*** ./src/lib/database/entity-manager.js ***!
  \********************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'default',
                        function() {
                            return EntityManager;
                        },
                    );
                    /* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! md5 */ 'md5',
                    );
                    /* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        md5__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! typeorm */ 'typeorm',
                    );
                    /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                        typeorm__WEBPACK_IMPORTED_MODULE_1__,
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                        /*! project-minimum-core */ 'project-minimum-core',
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                        project_minimum_core__WEBPACK_IMPORTED_MODULE_2__,
                    );
                    function _objectSpread(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source =
                                arguments[i] != null ? arguments[i] : {};
                            var ownKeys = Object.keys(source);
                            if (
                                typeof Object.getOwnPropertySymbols ===
                                'function'
                            ) {
                                ownKeys = ownKeys.concat(
                                    Object.getOwnPropertySymbols(source).filter(
                                        function(sym) {
                                            return Object.getOwnPropertyDescriptor(
                                                source,
                                                sym,
                                            ).enumerable;
                                        },
                                    ),
                                );
                            }
                            ownKeys.forEach(function(key) {
                                _defineProperty(target, key, source[key]);
                            });
                        }
                        return target;
                    }

                    function _defineProperty(obj, key, value) {
                        if (key in obj) {
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: true,
                                configurable: true,
                                writable: true,
                            });
                        } else {
                            obj[key] = value;
                        }
                        return obj;
                    }

                    /**
                     * This class creates database entities based on the schema
                     */

                    class EntityManager {
                        /**
                         * @param entity Schema entity (not database entity)
                         * @param field
                         */
                        static getName(entity, field = null) {
                            if (
                                field &&
                                field.isReference() &&
                                field.isMultiple()
                            ) {
                                return `${entity.getName()}_2_${field.getName()}`;
                            }

                            return entity.getName();
                        }
                        /**
                         * @param entity Schema entity (not database entity)
                         */

                        static getTableName(entity) {
                            return `${
                                project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                    'DB_ENTITY_TABLE_PREFIX'
                                ]
                            }${entity.getName()}`.substr(
                                0,
                                project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                    'DB_IDENTIFIER_LENGTH'
                                ],
                            );
                        }
                        /**
                         * @param entity Schema entity (not database entity)
                         * @param field
                         */

                        static getReferenceTableName(entity, field) {
                            return `${
                                project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                    'DB_REF_TABLE_PREFIX'
                                ]
                            }${md5__WEBPACK_IMPORTED_MODULE_0___default()(
                                `${entity.getName()}_${field.getName()}`,
                            )}`;
                        }
                        /**
                         * Get database type by schema type
                         * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
                         * @param field
                         * @returns {string}
                         */

                        static getDBType(field) {
                            if (field.isReference()) {
                                return field.isMultiple() ? null : 'integer';
                            }

                            const type = field.getActualType();

                            switch (type) {
                                case 'string':
                                    return 'varchar';

                                case 'integer':
                                    return 'integer';

                                case 'datetime':
                                    return 'timestamp';

                                case 'boolean':
                                    return 'boolean';

                                default:
                                    return 'string';
                            }
                        }
                        /**
                         * Accepts a schema entity and returns a DDL structure of the table to create
                         */

                        static getDDLByEntity(entity) {
                            const table = {
                                name: this.getTableName(entity),
                                columns: [],
                            }; // add "system" field: id

                            table.columns.push({
                                isNullable: false,
                                isGenerated: true,
                                isPrimary: true,
                                isUnique: true,
                                isArray: false,
                                length: '',
                                zerofill: false,
                                unsigned: true,
                                name: 'id',
                                type: 'integer',
                                generated: 'increment',
                            });
                            entity.getFields().forEach(field => {
                                if (
                                    field.isReference() &&
                                    field.isMultipleField()
                                ) {
                                    // we do not create any fields for many-to-may relation. Instead, a table should be created
                                    return;
                                }

                                table.columns.push({
                                    isNullable: !field.isMandatory(),
                                    isGenerated: false,
                                    isPrimary: false,
                                    isUnique: field.isUnique(),
                                    isArray: field.isMultiple(),
                                    length: field.getLength(),
                                    zerofill: false,
                                    unsigned: false,
                                    name: field.getName(),
                                    type: this.getDBType(field),
                                });
                            });
                            return table;
                        }

                        constructor(schema) {
                            this.schema = schema;
                        }
                        /**
                         * Get all database entities by their schema definition
                         */

                        get() {
                            if (!this.entityList) {
                                let result = {};
                                this.schema.getSchema().forEach(entity => {
                                    result = _objectSpread(
                                        {},
                                        result,
                                        this.getForEntity(entity),
                                    );
                                });
                                this.entityList = result;
                            }

                            return this.entityList;
                        }

                        getByName(name) {
                            const all = this.get();
                            return all[name];
                        }

                        getByDefinition(entity, field = null) {
                            return this.getByName(
                                this.constructor.getName(entity, field),
                            );
                        }
                        /**
                         * @private
                         * @param entity
                         * @returns {EntitySchema}
                         */

                        getForEntity(entity) {
                            const result = {}; // get the entity itself

                            const columns = {
                                id: {
                                    primary: true,
                                    type: 'integer',
                                    generated: 'increment',
                                    nullable: false,
                                },
                                // todo: should we remove this?
                                code: {
                                    type: 'varchar',
                                    length:
                                        project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                            'DB_CODE_COLUMN_LENGTH'
                                        ],
                                    nullable: false,
                                },
                            };
                            const references = [];
                            entity.getFields().forEach(field => {
                                if (field.isReference() && field.isMultiple()) {
                                    // collect multiple references, don't create fields for it
                                    references.push(field);
                                    return;
                                }

                                const column = {
                                    type: this.constructor.getDBType(field),
                                    nullable: !field.isMandatory(),
                                    array: field.isMultiple(),
                                };
                                const length = field.getLength();

                                if (length !== null) {
                                    column.length = length;
                                }

                                columns[field.getName()] = column;
                            });
                            result[
                                this.constructor.getName(entity)
                            ] = new typeorm__WEBPACK_IMPORTED_MODULE_1__[
                                'EntitySchema'
                            ]({
                                name: this.constructor.getTableName(entity),
                                columns,
                            }); // we do not create any fields for many-to-may relation, but make another entity

                            references.forEach(field => {
                                result[
                                    this.constructor.getName(entity, field)
                                ] = new typeorm__WEBPACK_IMPORTED_MODULE_1__[
                                    'EntitySchema'
                                ]({
                                    name: this.constructor.getReferenceTableName(
                                        entity,
                                        field,
                                    ),
                                    columns: {
                                        self: {
                                            type: 'integer',
                                            nullable: false,
                                            primary: true,
                                        },
                                        rel: {
                                            type: 'integer',
                                            nullable: false,
                                            primary: true,
                                        },
                                    },
                                });
                            });
                            return result;
                        }
                    }

                    /***/
                },

            /***/ './src/lib/database/migrator.js':
                /*!**************************************!*\
  !*** ./src/lib/database/migrator.js ***!
  \**************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'default',
                            function() {
                                return Migrator;
                            },
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! typeorm */ 'typeorm',
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            typeorm__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__,
                        );
                        /* harmony import */ var _entity_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                            /*! ./entity-manager */ './src/lib/database/entity-manager.js',
                        );
                        /**
                         * https://typeorm.io/#/migrations
                         */

                        class Migrator {
                            static async getDelta({
                                schema,
                                connectionManager,
                            } = {}) {
                                const queryRunner = (await connectionManager.getSystem()).createQueryRunner(
                                    'master',
                                );
                                const tables = this.getTables(queryRunner);
                                const tablesToCreate = [];
                                let tableNamesToDrop = [];
                                const tablesToProbablyAlter = [];
                                const currentTables = {};
                                const futureTables = {};
                                tables.forEach(table => {
                                    currentTables[table.name] = table;
                                });
                                const entities = schema.getSchema();
                                const tableToEntity = {}; // tables

                                entities.forEach(entity => {
                                    const table = _entity_manager__WEBPACK_IMPORTED_MODULE_2__[
                                        'default'
                                    ].getDDLByEntity(entity);
                                    tableToEntity[table.name] = entity;
                                    futureTables[table.name] = table;

                                    if (!(table.name in currentTables)) {
                                        tablesToCreate.push(table);
                                    } else {
                                        tablesToProbablyAlter.push(table);
                                    }
                                });
                                Object.values(currentTables).forEach(table => {
                                    if (
                                        !(table.name in futureTables) &&
                                        !table.name.startsWith(
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                'DB_REF_TABLE_PREFIX'
                                            ],
                                        ) // not a reference
                                    ) {
                                        tableNamesToDrop.push(table.name);
                                    }
                                }); // fields

                                const tablesToAlter = {};

                                for (
                                    let i = 0;
                                    i < tablesToProbablyAlter.length;
                                    i += 1
                                ) {
                                    const futureTable =
                                        tablesToProbablyAlter[i];
                                    const currentTable =
                                        currentTables[futureTable.name];
                                    const tableFutureFieldNames = Object.keys(
                                        futureTable.columns.reduce(
                                            (result, item) => {
                                                result[item.name] = true;
                                                return result;
                                            },
                                            {},
                                        ),
                                    );
                                    const tableCurrentFieldNames = Object.keys(
                                        currentTable.columns.reduce(
                                            (result, item) => {
                                                result[item.name] = true;
                                                return result;
                                            },
                                            {},
                                        ),
                                    );

                                    const fieldsToAdd = _.difference(
                                        tableCurrentFieldNames,
                                        tableFutureFieldNames,
                                    );

                                    const fieldsToDelete = _.difference(
                                        tableFutureFieldNames,
                                        tableCurrentFieldNames,
                                    );

                                    for (
                                        let j = 0;
                                        j < futureTable.columns.length;
                                        j += 1
                                    ) {
                                        const field = futureTable.columns[j];

                                        if (fieldsToAdd.includes(field.name)) {
                                            tablesToAlter[
                                                futureTable.name
                                            ] = tablesToAlter[
                                                futureTable.name
                                            ] || {
                                                add: [],
                                                delete: [],
                                            };
                                            tablesToAlter[
                                                futureTable.name
                                            ].add.push(field);
                                        }
                                    }

                                    for (
                                        let j = 0;
                                        j < currentTable.columns.length;
                                        j += 1
                                    ) {
                                        const field = currentTable.columns[j];

                                        if (
                                            field.name !==
                                                project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                    'ENTITY_ID_FIELD_NAME'
                                                ] &&
                                            field.name !==
                                                project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                    'ENTITY_CODE_FIELD_NAME'
                                                ]
                                        ) {
                                            if (
                                                fieldsToDelete.includes(
                                                    field.name,
                                                )
                                            ) {
                                                tablesToAlter[
                                                    currentTable.name
                                                ] = tablesToAlter[
                                                    currentTable.name
                                                ] || {
                                                    add: [],
                                                    delete: [],
                                                };
                                                tablesToAlter[
                                                    currentTable.name
                                                ].delete.push(field);
                                            }
                                        }
                                    } // todo: support altering of fields
                                } // references

                                const currentReferences = Object.values(
                                    currentTables,
                                )
                                    .map(table =>
                                        table.name.startsWith(
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                'DB_REF_TABLE_PREFIX'
                                            ],
                                        )
                                            ? table.name
                                            : false,
                                    )
                                    .filter(x => x);
                                const futureReferences = []; // find all refs in future tables

                                Object.values(futureTables).forEach(table => {
                                    const entity = tableToEntity[table.name];
                                    entity
                                        .getMultipleReferences()
                                        .forEach(field => {
                                            const referenceTableName = _entity_manager__WEBPACK_IMPORTED_MODULE_2__[
                                                'default'
                                            ].getReferenceTableName(
                                                entity,
                                                field,
                                            );
                                            futureReferences.push(
                                                referenceTableName,
                                            );

                                            if (
                                                !currentReferences.includes(
                                                    referenceTableName,
                                                )
                                            ) {
                                                tablesToCreate.push({
                                                    name: referenceTableName,
                                                    columns: [
                                                        {
                                                            name:
                                                                project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                                    'REFERENCE_ENTITY_PARENT_FIELD_NAME'
                                                                ],
                                                            isNullable: false,
                                                            isPrimary: true,
                                                            type: 'integer',
                                                        },
                                                        {
                                                            name:
                                                                project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                                    'REFERENCE_ENTITY_CHILD_FIELD_NAME'
                                                                ],
                                                            isNullable: false,
                                                            isPrimary: true,
                                                            type: 'integer',
                                                        },
                                                    ],
                                                });
                                            }
                                        });
                                });
                                tableNamesToDrop = _.union(
                                    tableNamesToDrop,
                                    _.difference(
                                        currentReferences,
                                        futureReferences,
                                    ),
                                );
                                return {
                                    create: tablesToCreate,
                                    drop: tableNamesToDrop,
                                    alter: tablesToAlter,
                                };
                            }

                            static async migrate(params) {
                                const delta = await this.getDelta(params);
                            }

                            static async getTables(queryRunner) {
                                const entityTableNames = (await queryRunner.query(
                                    `select * from information_schema.tables where table_schema='public' and table_name like '${
                                        project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                            'DB_TABLE_PREFIX'
                                        ]
                                    }%'`,
                                )).map(t => t.table_name);
                                let tables = [];

                                if (entityTableNames.length) {
                                    tables = await queryRunner.getTables(
                                        entityTableNames,
                                    );
                                }

                                return tables;
                            }
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/lib/database/query.js':
                /*!***********************************!*\
  !*** ./src/lib/database/query.js ***!
  \***********************************/
                /*! exports provided: Query */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'Query',
                            function() {
                                return Query;
                            },
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        function _objectSpread(target) {
                            for (var i = 1; i < arguments.length; i++) {
                                var source =
                                    arguments[i] != null ? arguments[i] : {};
                                var ownKeys = Object.keys(source);
                                if (
                                    typeof Object.getOwnPropertySymbols ===
                                    'function'
                                ) {
                                    ownKeys = ownKeys.concat(
                                        Object.getOwnPropertySymbols(
                                            source,
                                        ).filter(function(sym) {
                                            return Object.getOwnPropertyDescriptor(
                                                source,
                                                sym,
                                            ).enumerable;
                                        }),
                                    );
                                }
                                ownKeys.forEach(function(key) {
                                    _defineProperty(target, key, source[key]);
                                });
                            }
                            return target;
                        }

                        function _defineProperty(obj, key, value) {
                            if (key in obj) {
                                Object.defineProperty(obj, key, {
                                    value: value,
                                    enumerable: true,
                                    configurable: true,
                                    writable: true,
                                });
                            } else {
                                obj[key] = value;
                            }
                            return obj;
                        }

                        /**
                         * https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
                         */

                        class Query {
                            static make({
                                args,
                                queryBuilder,
                                entity,
                                tableName,
                                parameters = {
                                    restrictLimit: true,
                                },
                            }) {
                                const { select, filter, sort } = args;
                                const tableNameSafe = this.sanitize(tableName);
                                const selectSafe = this.prepareSelect(
                                    select,
                                    entity,
                                    _objectSpread({}, parameters, {
                                        alias: tableNameSafe,
                                    }),
                                );
                                const orderBySafe = this.prepareOrderBy(
                                    sort,
                                    entity,
                                    _objectSpread({}, parameters, {
                                        alias: tableNameSafe,
                                    }),
                                );
                                const {
                                    limit,
                                    offset,
                                } = this.prepareLimitOffset(args, parameters); // todo: apply "where"

                                let query = queryBuilder
                                    .select(selectSafe)
                                    .skip(offset);

                                if (orderBySafe) {
                                    query = query.orderBy(orderBySafe);
                                }

                                if (limit !== null) {
                                    query = query.take(limit);
                                }

                                return {
                                    query,
                                    limit,
                                };
                            }

                            static prepareOrderBy(
                                order,
                                entity,
                                { alias = '' } = {},
                            ) {
                                if (!_.ione(order)) {
                                    return null;
                                }

                                const prefix = alias ? `${alias}.` : '';
                                const legalFields = this.getLegalFields(entity);
                                const keys = Object.keys(order).filter(
                                    fieldName =>
                                        legalFields.includes(fieldName),
                                );
                                return keys.reduce(
                                    (result, fieldName) =>
                                        _objectSpread(
                                            {
                                                [`${prefix}${fieldName}`]: order[
                                                    fieldName
                                                ],
                                            },
                                            result,
                                        ),
                                    {},
                                );
                            }

                            static prepareLimitOffset(
                                args,
                                parameters = {
                                    restrictLimit: true,
                                },
                            ) {
                                let { limit, offset, page, pageSize } = args;
                                limit = parseInt(limit, 10);

                                if (Number.isNaN(limit)) {
                                    if (parameters.restrictLimit) {
                                        limit =
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                                'QUERY_FIND_MAX_PAGE_SIZE'
                                            ];
                                    } else {
                                        limit = null;
                                    }
                                }

                                offset = parseInt(offset, 10);

                                if (Number.isNaN(offset)) {
                                    offset = 0;
                                }

                                pageSize = parseInt(pageSize, 10);

                                if (!Number.isNaN(pageSize)) {
                                    limit = pageSize;
                                    page = parseInt(page, 10);

                                    if (!Number.isNaN(page)) {
                                        offset = (page - 1) * pageSize;
                                    }
                                }

                                return {
                                    limit,
                                    offset,
                                };
                            }

                            static prepareSelect(
                                fields,
                                entity,
                                { alias = '' } = {},
                            ) {
                                const prefix = alias ? `${alias}.` : '';

                                const toSelect = _.intersection(
                                    fields,
                                    this.getLegalFields(entity),
                                ).map(fieldName => `${prefix}${fieldName}`);

                                if (!toSelect.includes(`${prefix}id`)) {
                                    toSelect.push(`${prefix}id`);
                                }

                                if (!toSelect.includes(`${prefix}code`)) {
                                    toSelect.push(`${prefix}code`);
                                }

                                return toSelect;
                            }

                            static getLegalFields(entity) {
                                return entity
                                    .getFields()
                                    .filter(
                                        field =>
                                            !(
                                                field.isReference() &&
                                                field.isMultiple()
                                            ),
                                    )
                                    .map(field => field.getName());
                            }

                            static sanitize(value) {
                                return value.replace(/[^a-zA-Z0-9_]/g, '');
                            }
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/lib/error-handler.js':
                /*!**********************************!*\
  !*** ./src/lib/error-handler.js ***!
  \**********************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(logger) {
                        const useErrorHandler = app => {
                            // catching async unhandled rejections
                            process
                                .on('unhandledRejection', err => {
                                    logger.error('Unhandled rejection', err);
                                })
                                .on('uncaughtException', err => {
                                    logger.error('Uncaught exception', err);
                                }); // catching normal unhandled exceptions

                            app.use((err, req, res, next) => {
                                logger.error('Uncaught exception', err);
                                res.send('Nasty error'); // todo: explain here
                            });
                        };

                        /* harmony default export */ __webpack_exports__[
                            'default'
                        ] = useErrorHandler;
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/lib/graphql/apollo.js':
                /*!***********************************!*\
  !*** ./src/lib/graphql/apollo.js ***!
  \***********************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! apollo-server-express */ 'apollo-server-express',
                    );
                    /* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        apollo_server_express__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var _apollographql_graphql_playground_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! @apollographql/graphql-playground-html */ '@apollographql/graphql-playground-html',
                    );
                    /* harmony import */ var _apollographql_graphql_playground_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                        _apollographql_graphql_playground_html__WEBPACK_IMPORTED_MODULE_1__,
                    );
                    /* harmony import */ var accepts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                        /*! accepts */ 'accepts',
                    );
                    /* harmony import */ var accepts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                        accepts__WEBPACK_IMPORTED_MODULE_2__,
                    );
                    /* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                        /*! merge-graphql-schemas */ 'merge-graphql-schemas',
                    );
                    /* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
                        merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_3__,
                    );
                    /* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                        /*! uuid/v4 */ 'uuid/v4',
                    );
                    /* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(
                        uuid_v4__WEBPACK_IMPORTED_MODULE_4__,
                    );
                    /* harmony import */ var _graphql_express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                        /*! ./graphql-express */ './src/lib/graphql/graphql-express.js',
                    );
                    /* harmony import */ var _lib_schema_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
                        /*! ../../lib/schema-store */ './src/lib/schema-store.js',
                    );
                    /* harmony import */ var _type_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
                        /*! ./type-generator */ './src/lib/graphql/type-generator.js',
                    );
                    /* harmony import */ var _resolver_generator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
                        /*! ./resolver-generator */ './src/lib/graphql/resolver-generator.js',
                    );
                    /* harmony import */ var _lib_database_entity_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
                        /*! ../../lib/database/entity-manager */ './src/lib/database/entity-manager.js',
                    );
                    /* harmony import */ var _lib_database_data_loader_pool__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
                        /*! ../../lib/database/data-loader-pool */ './src/lib/database/data-loader-pool.js',
                    );
                    /* harmony import */ var _graphql_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
                        /*! ../../graphql/types */ './src/graphql/types/index.js',
                    );
                    /* harmony import */ var _graphql_resolvers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
                        /*! ../../graphql/resolvers */ './src/graphql/resolvers/index.js',
                    );

                    let server = null;

                    const getServer = async ({ cache, connectionManager }) => {
                        if (
                            !server ||
                            !(await cache.get('apollo.server.ready'))
                        ) {
                            if (server) {
                                await server.stop();
                                await connectionManager.close();
                            }

                            const schema = await _lib_schema_store__WEBPACK_IMPORTED_MODULE_6__[
                                'default'
                            ].load('actual', connectionManager);
                            const databaseEntityManager = new _lib_database_entity_manager__WEBPACK_IMPORTED_MODULE_9__[
                                'default'
                            ](schema);
                            const connection = await connectionManager.get({
                                entities: Object.values(
                                    await databaseEntityManager.get(),
                                ),
                                preConnect: true,
                            });
                            const entityTypeDefs = _type_generator__WEBPACK_IMPORTED_MODULE_7__[
                                'default'
                            ].make(schema);
                            const eResolver = _resolver_generator__WEBPACK_IMPORTED_MODULE_8__[
                                'default'
                            ].make(schema, databaseEntityManager, connection); // now everything is ready to create the server

                            server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_0__[
                                'ApolloServer'
                            ]({
                                typeDefs: Object(
                                    merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_3__[
                                        'mergeTypes'
                                    ],
                                )(
                                    [
                                        ...entityTypeDefs,
                                        ..._graphql_types__WEBPACK_IMPORTED_MODULE_11__[
                                            'default'
                                        ],
                                    ],
                                    {
                                        all: true,
                                    },
                                ),
                                resolvers: Object(
                                    merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_3__[
                                        'mergeResolvers'
                                    ],
                                )([
                                    ...eResolver,
                                    ..._graphql_resolvers__WEBPACK_IMPORTED_MODULE_12__[
                                        'default'
                                    ],
                                ]),
                                context: async ({ req, res }) => {
                                    return {
                                        requestId: uuid_v4__WEBPACK_IMPORTED_MODULE_4___default()(),
                                        dataLoaderPool: new _lib_database_data_loader_pool__WEBPACK_IMPORTED_MODULE_10__[
                                            'default'
                                        ](),
                                    };
                                },
                                debug: true,
                            });
                            await cache.set('apollo.server.ready', true, [
                                'apollo',
                            ]);
                        }

                        return server;
                    };

                    const useGraphQL = (app, params = {}) => {
                        // server.applyMiddleware({ app, cors: false });
                        app.use('/graphql', async (req, res, next) => {
                            if (true && req.method === 'GET') {
                                const accept = accepts__WEBPACK_IMPORTED_MODULE_2___default()(
                                    req,
                                );
                                const types = accept.types();
                                const prefersHTML =
                                    types.find(
                                        x =>
                                            x === 'text/html' ||
                                            x === 'application/json',
                                    ) === 'text/html';

                                if (prefersHTML) {
                                    res.setHeader('Content-Type', 'text/html');
                                    const playground = Object(
                                        _apollographql_graphql_playground_html__WEBPACK_IMPORTED_MODULE_1__[
                                            'renderPlaygroundPage'
                                        ],
                                    )({
                                        endpoint: '/graphql',
                                    });
                                    return res.send(playground);
                                }
                            }

                            const serverInstance = await getServer(params);
                            return Object(
                                _graphql_express__WEBPACK_IMPORTED_MODULE_5__[
                                    'graphqlExpress'
                                ],
                            )(() => {
                                return serverInstance.createGraphQLServerOptions(
                                    req,
                                    res,
                                );
                            })(req, res, next);
                        });
                    };

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = useGraphQL;

                    /***/
                },

            /***/ './src/lib/graphql/ast.js':
                /*!********************************!*\
  !*** ./src/lib/graphql/ast.js ***!
  \********************************/
                /*! exports provided: getASTAt, getSelectionAt */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'getASTAt',
                        function() {
                            return getASTAt;
                        },
                    );
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'getSelectionAt',
                        function() {
                            return getSelectionAt;
                        },
                    );
                    const getASTAt = (ast, path = '') => {
                        if (!ast || !ast.fieldNodes || !ast.fieldNodes[0]) {
                            return null;
                        }

                        let node = ast.fieldNodes[0];

                        if (path.length) {
                            path = path.split('.');
                            let i = 0;

                            for (; i < path.length; i += 1) {
                                if (
                                    node.selectionSet &&
                                    node.selectionSet.selections
                                ) {
                                    node = node.selectionSet.selections.find(
                                        f => f.name.value === path[i],
                                    );
                                } else {
                                    break;
                                }
                            }

                            if (i === path.length) {
                                // found
                                return node;
                            }

                            return null;
                        }

                        return node || null;
                    };
                    const getSelectionAt = (ast, path = '') => {
                        try {
                            return getASTAt(
                                ast,
                                path,
                            ).selectionSet.selections.map(
                                field => field.name.value,
                            );
                        } catch (e) {
                            return {};
                        }
                    };

                    /***/
                },

            /***/ './src/lib/graphql/graphql-express.js':
                /*!********************************************!*\
  !*** ./src/lib/graphql/graphql-express.js ***!
  \********************************************/
                /*! exports provided: graphqlExpress */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'graphqlExpress',
                        function() {
                            return graphqlExpress;
                        },
                    );
                    /* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! apollo-server-core */ 'apollo-server-core',
                    );
                    /* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        apollo_server_core__WEBPACK_IMPORTED_MODULE_0__,
                    );

                    function graphqlExpress(options) {
                        if (!options) {
                            throw new Error('Apollo Server requires options.');
                        }

                        if (arguments.length > 1) {
                            // TODO: test this
                            throw new Error(
                                `Apollo Server expects exactly one argument, got ${
                                    arguments.length
                                }`,
                            );
                        }

                        return (req, res, next) => {
                            Object(
                                apollo_server_core__WEBPACK_IMPORTED_MODULE_0__[
                                    'runHttpQuery'
                                ],
                            )([req, res], {
                                method: req.method,
                                options: options,
                                query:
                                    req.method === 'POST'
                                        ? req.body
                                        : req.query,
                                request: Object(
                                    apollo_server_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'convertNodeHttpToRequest'
                                    ],
                                )(req),
                            }).then(
                                ({ graphqlResponse, responseInit }) => {
                                    if (responseInit.headers) {
                                        for (const [
                                            name,
                                            value,
                                        ] of Object.entries(
                                            responseInit.headers,
                                        )) {
                                            res.setHeader(name, value);
                                        }
                                    }

                                    res.write(graphqlResponse);
                                    res.end();
                                },
                                error => {
                                    if ('HttpQueryError' !== error.name) {
                                        return next(error);
                                    }

                                    if (error.headers) {
                                        for (const [
                                            name,
                                            value,
                                        ] of Object.entries(error.headers)) {
                                            res.setHeader(name, value);
                                        }
                                    }

                                    res.statusCode = error.statusCode;
                                    res.write(error.message);
                                    res.end();
                                },
                            );
                        };
                    }

                    /***/
                },

            /***/ './src/lib/graphql/resolver-generator.js':
                /*!***********************************************!*\
  !*** ./src/lib/graphql/resolver-generator.js ***!
  \***********************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_, logger) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'default',
                            function() {
                                return ResolverGenerator;
                            },
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! typeorm */ 'typeorm',
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            typeorm__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! uuid/v4 */ 'uuid/v4',
                        );
                        /* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                            uuid_v4__WEBPACK_IMPORTED_MODULE_1__,
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_2__,
                        );
                        /* harmony import */ var _ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                            /*! ./ast */ './src/lib/graphql/ast.js',
                        );
                        /* harmony import */ var _database_code_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                            /*! ../database/code-id */ './src/lib/database/code-id.js',
                        );
                        /* harmony import */ var _database_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                            /*! ../database/query */ './src/lib/database/query.js',
                        );
                        function _objectSpread(target) {
                            for (var i = 1; i < arguments.length; i++) {
                                var source =
                                    arguments[i] != null ? arguments[i] : {};
                                var ownKeys = Object.keys(source);
                                if (
                                    typeof Object.getOwnPropertySymbols ===
                                    'function'
                                ) {
                                    ownKeys = ownKeys.concat(
                                        Object.getOwnPropertySymbols(
                                            source,
                                        ).filter(function(sym) {
                                            return Object.getOwnPropertyDescriptor(
                                                source,
                                                sym,
                                            ).enumerable;
                                        }),
                                    );
                                }
                                ownKeys.forEach(function(key) {
                                    _defineProperty(target, key, source[key]);
                                });
                            }
                            return target;
                        }

                        function _defineProperty(obj, key, value) {
                            if (key in obj) {
                                Object.defineProperty(obj, key, {
                                    value: value,
                                    enumerable: true,
                                    configurable: true,
                                    writable: true,
                                });
                            } else {
                                obj[key] = value;
                            }
                            return obj;
                        }

                        /**
                         * https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
                         */

                        class ResolverGenerator {
                            static make(
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const entities = Object.values(
                                    schema.getSchema(),
                                );
                                return entities.map(entity =>
                                    this.makeForEntity(
                                        entity,
                                        schema,
                                        databaseEntityManager,
                                        connection,
                                    ),
                                );
                            }

                            static makeGetForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const databaseEntity = databaseEntityManager.getByDefinition(
                                    entity,
                                );
                                return async (source, args, context, info) => {
                                    const result = {
                                        errors: [],
                                        data: null,
                                    };
                                    const { code } = args;

                                    if (!_.isne(code)) {
                                        result.errors.push({
                                            code: 'code_missing',
                                            message:
                                                'Code is missing in the request',
                                        });
                                        return result;
                                    }

                                    const selectedFields = Object(
                                        _ast__WEBPACK_IMPORTED_MODULE_3__[
                                            'getSelectionAt'
                                        ],
                                    )(info, 'data');
                                    const repository = connection.getRepository(
                                        databaseEntity,
                                    );
                                    let dbItem = null;
                                    await this.wrap(async () => {
                                        dbItem = await repository.findOne({
                                            where: {
                                                code: code.trim(),
                                            },
                                            select: this.getRealFields(
                                                selectedFields,
                                                entity,
                                            ),
                                        });
                                    }, result.errors);

                                    if (!result.errors.length) {
                                        if (!dbItem) {
                                            result.errors.push({
                                                code: 'not_found',
                                                message: 'Element not found',
                                            });
                                        }
                                    }

                                    if (dbItem) {
                                        result.data = this.convertToPlain(
                                            dbItem,
                                            entity,
                                        );
                                    }

                                    return result;
                                };
                            }

                            static makeFindForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const databaseEntity = databaseEntityManager.getByDefinition(
                                    entity,
                                );
                                return async (source, args, context, info) => {
                                    const result = {
                                        errors: [],
                                        data: [],
                                        limit:
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                                'QUERY_FIND_MAX_PAGE_SIZE'
                                            ],
                                        offset: 0,
                                    };
                                    const { filter, search, sort } = args;
                                    const {
                                        limit,
                                        offset,
                                    } = this.getLimitOffset(args);

                                    if (
                                        limit >
                                        project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                            'QUERY_FIND_MAX_PAGE_SIZE'
                                        ]
                                    ) {
                                        result.errors.push({
                                            code: 'limit_too_high',
                                            message: 'Limit too high',
                                        });
                                        return result;
                                    }

                                    if (
                                        filter !== undefined &&
                                        search !== undefined
                                    ) {
                                        result.errors.push({
                                            code: 'search_filter_conflict',
                                            message:
                                                'You can not set both search and filter at the same time',
                                        });
                                        return result;
                                    }

                                    result.limit = limit;
                                    result.offset = offset;
                                    const selectedFields = Object(
                                        _ast__WEBPACK_IMPORTED_MODULE_3__[
                                            'getSelectionAt'
                                        ],
                                    )(info, 'data');
                                    const repository = connection.getRepository(
                                        databaseEntity,
                                    );
                                    const where = this.makeWhereFind(
                                        filter,
                                        search,
                                    );
                                    await this.wrap(async () => {
                                        result.data = (await repository.find({
                                            select: this.getRealFields(
                                                selectedFields,
                                                entity,
                                            ),
                                            where,
                                            order: _.ione(sort) ? sort : {},
                                            skip: result.offset,
                                            take: result.limit,
                                        })).map(item =>
                                            this.convertToPlain(item, entity),
                                        );
                                    }, result.errors);

                                    if (
                                        Object(
                                            _ast__WEBPACK_IMPORTED_MODULE_3__[
                                                'getASTAt'
                                            ],
                                        )(info, 'count')
                                    ) {
                                        // count asked
                                        await this.wrap(async () => {
                                            result.count = await repository.count(
                                                {
                                                    where,
                                                },
                                            );
                                        }, result.errors);
                                    }

                                    return result;
                                };
                            }

                            static makePutForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const databaseEntity = databaseEntityManager.getByDefinition(
                                    entity,
                                );
                                return async (source, args) => {
                                    const result = {
                                        errors: [],
                                        code: null,
                                        data: {},
                                    };
                                    let { code, data } = args;
                                    const repository = connection.getRepository(
                                        databaseEntity,
                                    );
                                    delete data.code; // there is no way to set the code manually

                                    let isNewItem = false;

                                    if (
                                        typeof code !== 'string' ||
                                        !code.length
                                    ) {
                                        code = uuid_v4__WEBPACK_IMPORTED_MODULE_1___default()();
                                        data.code = code;
                                        isNewItem = true;
                                    } // cast everything that is possible to cast

                                    data = entity.prepareData(data); // then validate

                                    const {
                                        errors,
                                        data: safeData,
                                    } = await entity.validateData(data);

                                    if (errors) {
                                        result.errors = errors.map(error => ({
                                            message: error.message,
                                            code: 'validation',
                                            reference: error.field,
                                        }));
                                        return result;
                                    }

                                    data = safeData;
                                    const singleReferences = entity.getSingleReferences();
                                    await this.wrap(async () => {
                                        const codeToId = new _database_code_id__WEBPACK_IMPORTED_MODULE_4__[
                                            'CodeId'
                                        ]({
                                            connection,
                                        }); // translate all single-reference codes to ids

                                        for (
                                            let i = 0;
                                            i < singleReferences.length;
                                            i += 1
                                        ) {
                                            const {
                                                referenceFieldName,
                                                referencedDatabaseEntity,
                                            } = this.getReferenceAttributes(
                                                singleReferences[i],
                                                databaseEntityManager,
                                                entity,
                                                schema,
                                            );

                                            if (referenceFieldName in data) {
                                                codeToId.addCode(
                                                    data[referenceFieldName],
                                                    referencedDatabaseEntity,
                                                );
                                            }
                                        }

                                        await codeToId.obtain();

                                        for (
                                            let i = 0;
                                            i < singleReferences.length;
                                            i += 1
                                        ) {
                                            const reference =
                                                singleReferences[i];
                                            const referenceFieldName = reference.getName();

                                            if (referenceFieldName in data) {
                                                data[
                                                    referenceFieldName
                                                ] = codeToId.getId(
                                                    data[referenceFieldName],
                                                );
                                            }
                                        }

                                        let databaseItem = null;

                                        if (isNewItem) {
                                            databaseItem = repository.create(
                                                data,
                                            );
                                        } else {
                                            // find id by code
                                            databaseItem = await repository.findOne(
                                                {
                                                    where: {
                                                        code: code.trim(),
                                                    },
                                                    select: ['id'],
                                                },
                                            );

                                            if (!databaseItem) {
                                                result.errors.push({
                                                    code: 'not_found',
                                                    message:
                                                        'Element not found',
                                                });
                                                return;
                                            }

                                            repository.merge(
                                                databaseItem,
                                                data,
                                            );
                                        }

                                        await repository.save(databaseItem);
                                        await this.manageMultipleReferences({
                                            entity,
                                            databaseEntityManager,
                                            connection,
                                            id: databaseItem.id,
                                            data,
                                            schema,
                                        });
                                        result.code = code;
                                        result.data = this.convertToPlain(
                                            databaseItem,
                                            entity,
                                        );
                                    }, result.errors);
                                    return result;
                                };
                            }

                            static makeDeleteForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const databaseEntity = databaseEntityManager.getByDefinition(
                                    entity,
                                );
                                return async (source, args) => {
                                    const result = {
                                        errors: [],
                                        code: null,
                                        data: {},
                                    };
                                    const { code } = args;

                                    if (
                                        typeof code !== 'string' ||
                                        !code.length
                                    ) {
                                        result.errors.push({
                                            code: 'illegal_code',
                                            message: 'Code is illegal',
                                        });
                                        return result;
                                    }

                                    result.code = code;
                                    const repository = connection.getRepository(
                                        databaseEntity,
                                    );
                                    const item = await repository.findOne({
                                        where: {
                                            code: code.trim(),
                                        },
                                        select: ['id'],
                                    });

                                    if (!item) {
                                        result.errors.push({
                                            code: 'not_found',
                                            message: 'Element not found',
                                        });
                                    } else {
                                        const id = repository.getId(item);
                                        await this.wrap(async () => {
                                            await repository.delete(id);
                                        }, result.errors); // drop reference data

                                        const references = entity.getMultipleReferences();

                                        for (
                                            let i = 0;
                                            i < references.length;
                                            i += 1
                                        ) {
                                            const referenceField =
                                                references[i];
                                            const {
                                                // referenceFieldName,
                                                referenceTableName,
                                                referenceDatabaseEntity, // referencedDatabaseEntity,
                                            } = this.getReferenceAttributes(
                                                referenceField,
                                                databaseEntityManager,
                                                entity,
                                                schema,
                                            );
                                            const referenceRepository = connection.getRepository(
                                                referenceDatabaseEntity,
                                            );
                                            const referenceQueryBuilder = referenceRepository.createQueryBuilder(
                                                referenceTableName,
                                            ); // delete all
                                            // eslint-disable-next-line no-await-in-loop

                                            await referenceQueryBuilder
                                                .delete()
                                                .from(referenceTableName)
                                                .where('self = :id', {
                                                    id,
                                                })
                                                .execute();
                                        }
                                    }

                                    return result;
                                };
                            }
                            /**
                             *
                             * @param entity
                             * @param schema
                             * @param databaseEntityManager
                             * @param connection
                             * @returns {*}
                             */

                            static makeForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const name = entity.getCamelName();
                                return {
                                    Query: {
                                        [`${name}Get`]: this.makeGetForEntity(
                                            entity,
                                            schema,
                                            databaseEntityManager,
                                            connection,
                                        ),
                                        [`${name}Find`]: this.makeFindForEntity(
                                            entity,
                                            schema,
                                            databaseEntityManager,
                                            connection,
                                        ),
                                    },
                                    Mutation: {
                                        [`${name}Put`]: this.makePutForEntity(
                                            entity,
                                            schema,
                                            databaseEntityManager,
                                            connection,
                                        ),
                                        [`${name}Delete`]: this.makeDeleteForEntity(
                                            entity,
                                            schema,
                                            databaseEntityManager,
                                            connection,
                                        ),
                                    },
                                    [name]: this.makeReferenceResolversForEntity(
                                        entity,
                                        schema,
                                        databaseEntityManager,
                                        connection,
                                    ),
                                };
                            }

                            static async manageMultipleReferences({
                                entity,
                                databaseEntityManager,
                                schema,
                                connection,
                                id,
                                data,
                            }) {
                                const references = entity.getMultipleReferences();

                                for (let i = 0; i < references.length; i += 1) {
                                    const referenceField = references[i];
                                    const {
                                        referenceFieldName,
                                        referenceTableName,
                                        referenceDatabaseEntity,
                                        referencedDatabaseEntity,
                                    } = this.getReferenceAttributes(
                                        referenceField,
                                        databaseEntityManager,
                                        entity,
                                        schema,
                                    );

                                    if (referenceFieldName in data) {
                                        const ids = [];
                                        const values = data[referenceFieldName];

                                        if (
                                            Array.isArray(values) &&
                                            values.length
                                        ) {
                                            const codeToId = new _database_code_id__WEBPACK_IMPORTED_MODULE_4__[
                                                'CodeId'
                                            ]({
                                                connection,
                                            });
                                            values.forEach(code =>
                                                codeToId.addCode(
                                                    code,
                                                    referencedDatabaseEntity,
                                                ),
                                            ); // eslint-disable-next-line no-await-in-loop

                                            await codeToId.obtain();
                                            values.forEach(code =>
                                                ids.push(codeToId.getId(code)),
                                            );
                                        }

                                        const referenceRepository = connection.getRepository(
                                            referenceDatabaseEntity,
                                        );
                                        const referenceQueryBuilder = referenceRepository.createQueryBuilder(
                                            referenceTableName,
                                        ); // delete all
                                        // eslint-disable-next-line no-await-in-loop

                                        await referenceQueryBuilder
                                            .delete()
                                            .from(referenceTableName)
                                            .where('self = :id', {
                                                id,
                                            })
                                            .execute(); // and re-create

                                        if (ids.length) {
                                            // eslint-disable-next-line no-await-in-loop
                                            await referenceQueryBuilder
                                                .insert()
                                                .into(referenceTableName)
                                                .values(
                                                    ids.map(referenceId => ({
                                                        self: id,
                                                        rel: referenceId,
                                                    })),
                                                )
                                                .execute();
                                        }
                                    }
                                }
                            }

                            static makeReferenceResolversForEntity(
                                entity,
                                schema,
                                databaseEntityManager,
                                connection,
                            ) {
                                const resolvers = {}; // get all references

                                const references = entity.getReferences();

                                if (!references.length) {
                                    return resolvers;
                                }

                                const args = {
                                    entity,
                                    schema,
                                    databaseEntityManager,
                                    connection,
                                };
                                references.forEach(referenceField => {
                                    resolvers[
                                        referenceField.getName()
                                    ] = referenceField.isMultiple()
                                        ? this.makeReferenceResolverMultiple(
                                              _objectSpread(
                                                  {
                                                      referenceField,
                                                  },
                                                  args,
                                              ),
                                          )
                                        : this.makeReferenceResolverSingle(
                                              _objectSpread(
                                                  {
                                                      referenceField,
                                                  },
                                                  args,
                                              ),
                                          );
                                });
                                return resolvers;
                            }

                            static makeReferenceResolverSingle({
                                referenceField,
                                entity,
                                databaseEntityManager,
                                schema,
                                connection,
                            }) {
                                return async (
                                    source,
                                    args,
                                    { dataLoaderPool },
                                    info,
                                ) => {
                                    const referenceFieldName = referenceField.getName(); // check if the parent item data does not have any value that we can reference with

                                    const referenceValue =
                                        source[referenceFieldName];

                                    if (!parseInt(referenceValue, 10)) {
                                        return null;
                                    }

                                    const {
                                        referencedDatabaseEntity,
                                        referencedEntityName,
                                    } = this.getReferenceAttributes(
                                        referenceField,
                                        databaseEntityManager,
                                        entity,
                                        schema,
                                    );
                                    const selectedFields = Object(
                                        _ast__WEBPACK_IMPORTED_MODULE_3__[
                                            'getSelectionAt'
                                        ],
                                    )(info);
                                    const select = this.getRealFields(
                                        selectedFields,
                                        entity,
                                    );
                                    const referencedRepository = connection.getRepository(
                                        referencedDatabaseEntity,
                                    );
                                    const key = `${referencedEntityName}__${select.join(
                                        '.',
                                    )}`;
                                    const loader = dataLoaderPool.get(
                                        key,
                                        async ids => {
                                            const errors = [];
                                            const map = {};

                                            try {
                                                const items = await referencedRepository.find(
                                                    {
                                                        where: {
                                                            id: Object(
                                                                typeorm__WEBPACK_IMPORTED_MODULE_0__[
                                                                    'In'
                                                                ],
                                                            )(ids),
                                                        },
                                                        select,
                                                    },
                                                );
                                                items.forEach(item => {
                                                    map[item.id] = item;
                                                });
                                            } catch (e) {
                                                errors.push({
                                                    code: 'internal',
                                                    message: true
                                                        ? e.message
                                                        : undefined,
                                                });
                                                logger.error(
                                                    'Unable to fetch some items',
                                                    e,
                                                );
                                            } // maintain the right order

                                            return ids.map(id => ({
                                                item:
                                                    id in map ? map[id] : null,
                                                errors,
                                            }));
                                        },
                                    );
                                    const item = await loader.load(
                                        referenceValue,
                                    );

                                    if (item.errors.length) {
                                        return null;
                                    }

                                    return item.item;
                                };
                            }

                            static makeReferenceResolverMultiple({
                                referenceField,
                                entity,
                                databaseEntityManager,
                                schema,
                                connection,
                            }) {
                                return async (source, args, context, info) => {
                                    // check if the parent item data does not have any value that we can reference with
                                    const referenceValue = source.id;

                                    if (!parseInt(referenceValue, 10)) {
                                        return [];
                                    }

                                    const {
                                        referenceFieldName,
                                        referenceTableName,
                                        referencedDatabaseEntity,
                                        referencedTableName,
                                        referencedEntity,
                                    } = this.getReferenceAttributes(
                                        referenceField,
                                        databaseEntityManager,
                                        entity,
                                        schema,
                                    );
                                    const referencedRepository = connection.getRepository(
                                        referencedDatabaseEntity,
                                    );
                                    const referencedQueryBuilder = referencedRepository.createQueryBuilder();
                                    let {
                                        query,
                                    } = _database_query__WEBPACK_IMPORTED_MODULE_5__[
                                        'Query'
                                    ].make({
                                        args: _objectSpread({}, args, {
                                            select: Object(
                                                _ast__WEBPACK_IMPORTED_MODULE_3__[
                                                    'getSelectionAt'
                                                ],
                                            )(info),
                                        }),
                                        queryBuilder: referencedQueryBuilder,
                                        entity: referencedEntity,
                                        tableName: referencedTableName,
                                        parameters: {
                                            restrictLimit: false,
                                        },
                                    }); // todo: this kind of query can be batched in some cases
                                    // const canBatch =
                                    //     typeof limit === 'undefined' && typeof offset === 'undefined';

                                    let items = [];
                                    const errors = [];

                                    try {
                                        const referencedTableNameSafe = _database_query__WEBPACK_IMPORTED_MODULE_5__[
                                            'Query'
                                        ].sanitize(referencedTableName);
                                        const referenceFieldNameSafe = _database_query__WEBPACK_IMPORTED_MODULE_5__[
                                            'Query'
                                        ].sanitize(referenceFieldName);
                                        query = query // filter by the relation
                                            .innerJoinAndSelect(
                                                referenceTableName,
                                                referenceFieldName,
                                                `${referenceFieldNameSafe}.rel = ${referencedTableNameSafe}.id and ${referenceFieldNameSafe}.self = :referenceValue`,
                                                {
                                                    referenceValue,
                                                },
                                            );
                                        items = await query.getMany(); // items = await query.getRawMany();
                                    } catch (e) {
                                        errors.push({
                                            code: 'internal',
                                            message: true
                                                ? e.message
                                                : undefined,
                                        });
                                        logger.error('Internal error', e);
                                    }

                                    if (errors.length) {
                                        return [];
                                    }

                                    return items;
                                };
                            }

                            static async wrap(fn, errors) {
                                try {
                                    await fn();
                                } catch (e) {
                                    errors.push({
                                        code: 'internal',
                                        message: true ? e.message : undefined,
                                    });
                                    logger.error('Internal error', e);
                                }
                            }

                            static makeWhereFind(filter, search) {
                                const where = {};

                                if (_.isne(search)) {
                                    // a very basic type of search - by the part of code
                                    where.code = Object(
                                        typeorm__WEBPACK_IMPORTED_MODULE_0__[
                                            'Like'
                                        ],
                                    )(
                                        `%${search.replace(
                                            /[^a-zA-Z0-9_-]/,
                                            '',
                                        )}%`,
                                    );
                                }

                                return where;
                            }

                            static convertToPlain(dbItem, entity) {
                                const plain = {};
                                entity.getFields().forEach(field => {
                                    const fieldName = field.getName();
                                    const fieldType = field.getActualType();
                                    const multiple = field.isMultiple();
                                    const fieldValue = dbItem[fieldName];

                                    if (
                                        typeof fieldValue !== 'undefined' &&
                                        fieldValue !== null
                                    ) {
                                        // todo: probably, apollo server is capable of casting Date to String by it's own?
                                        if (
                                            fieldType ===
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                                'TYPE_DATETIME'
                                            ]
                                        ) {
                                            if (multiple) {
                                                plain[
                                                    fieldName
                                                ] = fieldValue.map(subItem =>
                                                    subItem instanceof Date
                                                        ? subItem.toISOString()
                                                        : null,
                                                );
                                            } else {
                                                plain[fieldName] =
                                                    fieldValue instanceof Date
                                                        ? fieldValue.toISOString()
                                                        : null;
                                            }
                                        } else {
                                            plain[fieldName] = fieldValue;
                                        }
                                    } else if (fieldName in dbItem) {
                                        plain[fieldName] = null;
                                    }
                                }); // plus id, always there

                                if ('id' in dbItem) {
                                    plain.id = dbItem.id;
                                }

                                return plain;
                            }
                            /**
                             * @deprecated
                             * @param fields
                             * @param entity
                             * @returns {*}
                             */

                            static getRealFields(fields, entity) {
                                const realFields = entity
                                    .getFields()
                                    .filter(
                                        field =>
                                            !(
                                                field.isReference() &&
                                                field.isMultiple()
                                            ),
                                    )
                                    .map(field => field.getName());

                                const toSelect = _.intersection(
                                    fields,
                                    realFields,
                                );

                                if (!toSelect.includes('id')) {
                                    toSelect.push('id');
                                }

                                if (!toSelect.includes('code')) {
                                    toSelect.push('code');
                                }

                                return toSelect;
                            }
                            /**
                             * @deprecated
                             * @param args
                             * @returns {{offset: *, limit: *}}
                             */

                            static getLimitOffset(args) {
                                let { limit, offset, page, pageSize } = args;
                                limit = parseInt(limit, 10);

                                if (Number.isNaN(limit)) {
                                    limit =
                                        project_minimum_core__WEBPACK_IMPORTED_MODULE_2__[
                                            'QUERY_FIND_MAX_PAGE_SIZE'
                                        ];
                                }

                                offset = parseInt(offset, 10);

                                if (Number.isNaN(offset)) {
                                    offset = 0;
                                }

                                pageSize = parseInt(pageSize, 10);

                                if (!Number.isNaN(pageSize)) {
                                    limit = pageSize;
                                }

                                page = parseInt(page, 10);

                                if (!Number.isNaN(page)) {
                                    offset = (page - 1) * limit;
                                }

                                return {
                                    limit,
                                    offset,
                                };
                            }

                            static getReferenceAttributes(
                                referenceField,
                                databaseEntityManager,
                                entity,
                                schema,
                            ) {
                                // the name of the field we use to access this relation (e.g. "partner" or "pets")
                                const referenceFieldName = referenceField.getName(); // ///////////////////////////////////////
                                // ReferencED entity
                                // the database entity name, which we make a reference to (e.g. "person" or "pet")

                                const referencedEntityName = referenceField.getReferencedEntityName(); // the referenced schema entity

                                const referencedEntity = schema.getEntity(
                                    referencedEntityName,
                                ); // the referenced database entity

                                const referencedDatabaseEntity = databaseEntityManager.getByName(
                                    referencedEntityName,
                                ); // the table name of the referenced database entity (e.g. "eq_e_person" or "eq_e_pet")

                                const referencedTableName = databaseEntityManager.constructor.getTableName(
                                    referencedEntity,
                                ); // ///////////////////////////////////////
                                // Reference entity (only for multiple)

                                let referenceEntityName = null; // a database entity that is represented by this table

                                let referenceDatabaseEntity = null; // a table we use to store multiple references

                                let referenceTableName = null;

                                if (referenceField.isMultiple()) {
                                    referenceEntityName = databaseEntityManager.constructor.getName(
                                        entity,
                                        referenceField,
                                    );
                                    referenceTableName = databaseEntityManager.constructor.getReferenceTableName(
                                        entity,
                                        referenceField,
                                    ); // we need to get a database entity by its name

                                    referenceDatabaseEntity = databaseEntityManager.getByName(
                                        databaseEntityManager.constructor.getName(
                                            entity,
                                            referenceField,
                                        ),
                                    );
                                }

                                return {
                                    referenceFieldName,
                                    referencedEntity,
                                    referencedEntityName,
                                    referencedDatabaseEntity,
                                    referencedTableName,
                                    referenceEntityName,
                                    referenceDatabaseEntity,
                                    referenceTableName,
                                };
                            } // static getSingleReferences(entity) {
                            //     return entity
                            //         .getFields()
                            //         .filter(field => field.isReference() && !field.isMultiple());
                            // }
                            // static getMultipleReferences(entity) {
                            //     return entity
                            //         .getFields()
                            //         .filter(field => field.isReference() && field.isMultiple());
                            // }
                            // static getReferences(entity) {
                            //     return entity.getFields().filter(field => field.isReference());
                            // }
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/lib/graphql/type-generator.js':
                /*!*******************************************!*\
  !*** ./src/lib/graphql/type-generator.js ***!
  \*******************************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export (binding) */ __webpack_require__.d(
                        __webpack_exports__,
                        'default',
                        function() {
                            return TypeGenerator;
                        },
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! project-minimum-core */ 'project-minimum-core',
                    );
                    /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        project_minimum_core__WEBPACK_IMPORTED_MODULE_0__,
                    );

                    class TypeGenerator {
                        static make(schema) {
                            const gqlTypes = Object.values(
                                schema.getSchema(),
                            ).map(entity => this.makeForEntity(entity, schema));
                            return gqlTypes;
                        }
                        /**
                         * @private
                         * @param entity
                         * @param schema
                         * @returns {string}
                         */

                        static makeForEntity(entity, schema) {
                            const name = entity.getCamelName();
                            const tFields = [];
                            const iFields = [];
                            const fFields = [];
                            const sFields = [];
                            entity.getFields().forEach(field => {
                                tFields.push(
                                    `${this.getQueryFieldName(
                                        field,
                                        schema,
                                    )}: ${this.getGQLFieldType(field, schema)}`,
                                );
                                const fieldName = field.getName();

                                if (
                                    fieldName !==
                                    project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'ENTITY_CODE_FIELD_NAME'
                                    ]
                                ) {
                                    // code is a read-only field
                                    iFields.push(
                                        `${field.getName()}: ${this.getGQLFieldType(
                                            field,
                                            schema,
                                            true,
                                        )}${false ? undefined : ''}`,
                                    );
                                }

                                fFields.push(`${fieldName}: IFilterFieldValue`);
                                sFields.push(`${fieldName}: SortOrder`);
                            });
                            return `
type ${name}Result {
    errors: [Error]
    data: ${name}
}

type ${name}SearchResult {
    errors: [Error]
    data: [${name}]!
    limit: Int!
    offset: Int!
    count: Int
}

type ${name} {
${tFields.map(x => `    ${x}`).join('\n')}
}

input I${name} {
${iFields.map(x => `    ${x}`).join('\n')}
}

input I${name}Filter {
    SYSLogic: FilterLogic
    SYSSubFilter: [I${name}Filter]
${fFields.map(x => `    ${x}`).join('\n')}
}

input I${name}Sort {
${sFields.map(x => `    ${x}`).join('\n')}
}

type Query {
    ${name}Get(code: String!): ${name}Result
    ${name}Find(
        filter: I${name}Filter
        search: String
        sort: I${name}Sort
        limit: Int
        offset: Int
        page: Int
        pageSize: Int
        count: Boolean
    ): ${name}SearchResult
}

type Mutation {
    ${name}Delete(code: String!): ${name}Result
    ${name}Put(code: String, data: I${name}!): ${name}Result
}
        `;
                        }

                        static getGQLFieldType(field, schema, input = false) {
                            let gqlType = 'String';

                            if (field.isReference()) {
                                // reference, for input we accept codes, for types - just put type
                                if (input) {
                                    gqlType = 'String';
                                } else {
                                    const referencedEntityName = field.getReferencedEntityName();
                                    const referencedEntity = schema.getEntity(
                                        referencedEntityName,
                                    );
                                    gqlType = referencedEntity.getCamelName();
                                }
                            } else {
                                const type = field.getActualType();

                                switch (type) {
                                    case project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'TYPE_STRING'
                                    ]:
                                        gqlType = 'String';
                                        break;

                                    case project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'TYPE_INTEGER'
                                    ]:
                                        gqlType = 'Int';
                                        break;

                                    case project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'TYPE_DATETIME'
                                    ]:
                                        gqlType = 'String';
                                        break;

                                    case project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                        'TYPE_BOOLEAN'
                                    ]:
                                        gqlType = 'Boolean';
                                        break;

                                    default:
                                        gqlType = 'String';
                                }
                            }

                            if (field.isMultiple()) {
                                gqlType = `[${gqlType}]`;
                            }

                            return gqlType;
                        }

                        static getQueryFieldName(field, schema) {
                            if (field.isReference() && field.isMultiple()) {
                                const referencedEntityName = field.getReferencedEntityName();
                                const referencedEntity = schema.getEntity(
                                    referencedEntityName,
                                );
                                const referencedEntityNameCamel = referencedEntity.getCamelName();
                                return `${field.getName()}(
                filter: I${referencedEntityNameCamel}Filter
                sort: I${referencedEntityNameCamel}Sort
                limit: Int
                offset: Int
                page: Int
                pageSize: Int
                count: Int
            )`;
                            }

                            return field.getName();
                        }
                    }

                    /***/
                },

            /***/ './src/lib/lodash.js':
                /*!***************************!*\
  !*** ./src/lib/lodash.js ***!
  \***************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var lodash_isobject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! lodash.isobject */ 'lodash.isobject',
                    );
                    /* harmony import */ var lodash_isobject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_isobject__WEBPACK_IMPORTED_MODULE_0__,
                    );
                    /* harmony import */ var lodash_isfunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                        /*! lodash.isfunction */ 'lodash.isfunction',
                    );
                    /* harmony import */ var lodash_isfunction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_isfunction__WEBPACK_IMPORTED_MODULE_1__,
                    );
                    /* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                        /*! lodash.union */ 'lodash.union',
                    );
                    /* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_union__WEBPACK_IMPORTED_MODULE_2__,
                    );
                    /* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                        /*! lodash.intersection */ 'lodash.intersection',
                    );
                    /* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_intersection__WEBPACK_IMPORTED_MODULE_3__,
                    );
                    /* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                        /*! lodash.difference */ 'lodash.difference',
                    );
                    /* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_difference__WEBPACK_IMPORTED_MODULE_4__,
                    );
                    /* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                        /*! lodash.get */ 'lodash.get',
                    );
                    /* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_get__WEBPACK_IMPORTED_MODULE_5__,
                    );
                    /* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
                        /*! lodash.clonedeep */ 'lodash.clonedeep',
                    );
                    /* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __webpack_require__.n(
                        lodash_clonedeep__WEBPACK_IMPORTED_MODULE_6__,
                    );
                    // const random = require('lodash.random');
                    // const isNumber = require('lodash.isnumber');

                    // const deepFreeze = require('deep-freeze-node');
                    // const isEqual = require('lodash.isequal');

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = {
                        isArray: Array.isArray,
                        isObject: lodash_isobject__WEBPACK_IMPORTED_MODULE_0___default(),
                        isFunction: lodash_isfunction__WEBPACK_IMPORTED_MODULE_1___default(),
                        union: lodash_union__WEBPACK_IMPORTED_MODULE_2___default(),
                        intersection: lodash_intersection__WEBPACK_IMPORTED_MODULE_3___default(),
                        difference: lodash_difference__WEBPACK_IMPORTED_MODULE_4___default(),
                        cloneDeep: lodash_clonedeep__WEBPACK_IMPORTED_MODULE_6___default(),
                        get: lodash_get__WEBPACK_IMPORTED_MODULE_5___default(),
                        iane: arg => {
                            return Array.isArray(arg) && arg.length > 0;
                        },
                        ione: arg => {
                            return (
                                lodash_isobject__WEBPACK_IMPORTED_MODULE_0___default()(
                                    arg,
                                ) && Object.keys(arg).length > 0
                            );
                        },
                        isne: arg => {
                            return typeof arg === 'string' && !!arg.length;
                        },
                    };

                    /***/
                },

            /***/ './src/lib/schema-store.js':
                /*!*********************************!*\
  !*** ./src/lib/schema-store.js ***!
  \*********************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_, logger) {
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var _entity_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! ../entity/schema */ './src/entity/schema.js',
                        );

                        class SchemaStore {
                            static async load(type, connectionManager) {
                                const connection = await connectionManager.getSystem();
                                const schema = await connection
                                    .getRepository(
                                        _entity_schema__WEBPACK_IMPORTED_MODULE_1__[
                                            'default'
                                        ],
                                    )
                                    .findOne({
                                        draft: type === 'draft',
                                    });

                                if (!schema) {
                                    return null;
                                }

                                return new project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                    'Schema'
                                ](schema);
                            }

                            static async put(type, schema, connectionManager) {
                                const errors = await schema.checkHealth();

                                if (!_.iane(errors)) {
                                    const connection = await connectionManager.getSystem();
                                    const repo = connection.getRepository(
                                        _entity_schema__WEBPACK_IMPORTED_MODULE_1__[
                                            'default'
                                        ],
                                    ); // get current

                                    let current = await connection
                                        .getRepository(
                                            _entity_schema__WEBPACK_IMPORTED_MODULE_1__[
                                                'default'
                                            ],
                                        )
                                        .findOne({
                                            draft: false,
                                        });

                                    if (current) {
                                        const currentSchema = new project_minimum_core__WEBPACK_IMPORTED_MODULE_0__[
                                            'Schema'
                                        ](current); // have current => update

                                        repo.merge(current, {
                                            version:
                                                currentSchema.getVersion() + 1,
                                            declaration: schema.getSchema(),
                                        });
                                    } else {
                                        // else => create
                                        current = repo.create({
                                            draft: false,
                                            version: 0,
                                            declaration: schema.getSchema(),
                                        });
                                    }

                                    try {
                                        // store
                                        await repo.save(current);
                                    } catch (error) {
                                        logger.error(
                                            'Unable to save schema to the database',
                                            error,
                                        );
                                        errors.push({
                                            message: true
                                                ? error.message
                                                : undefined,
                                            code: 'internal_db_error',
                                            type: 'internal',
                                        });
                                    }
                                }

                                return errors;
                            }
                        }

                        /* harmony default export */ __webpack_exports__[
                            'default'
                        ] = SchemaStore;
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/lib/util.js':
                /*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
                /*! exports provided: injectPassword, decomposeURL, convertToCamel */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(_) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'injectPassword',
                            function() {
                                return injectPassword;
                            },
                        );
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'decomposeURL',
                            function() {
                                return decomposeURL;
                            },
                        );
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'convertToCamel',
                            function() {
                                return convertToCamel;
                            },
                        );
                        /* harmony import */ var naming_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! naming-style */ 'naming-style',
                        );
                        /* harmony import */ var naming_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            naming_style__WEBPACK_IMPORTED_MODULE_0__,
                        );

                        const injectPassword = (url, password = null) => {
                            if (_.isne(password)) {
                                const oUrl = new URL(url);
                                oUrl.password = password;
                                url = oUrl.toString();
                            }

                            return url;
                        };
                        const decomposeURL = url => {
                            const oUrl = new URL(url);
                            const parts = {
                                host: oUrl.hostname,
                                port: oUrl.port,
                                password: oUrl.password,
                            };

                            if (!_.isne(parts.host)) {
                                // invalid url
                                return null;
                            }

                            if (Number.isNaN(parts.port)) {
                                delete parts.port;
                            }

                            return parts;
                        };
                        /**
                         * @deprecated
                         * @param str
                         * @returns {string}
                         */

                        const convertToCamel = str => {
                            str = Object(
                                naming_style__WEBPACK_IMPORTED_MODULE_0__[
                                    'camel'
                                ],
                            )(str.toLowerCase());
                            return `${str
                                .substr(0, 1)
                                .toUpperCase()}${str.substr(
                                1,
                                str.length - 1,
                            )}`;
                        };
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(
                            /*! ./src/lib/lodash.js */ './src/lib/lodash.js',
                        )['default'],
                    ));

                    /***/
                },

            /***/ './src/migrations/1517934720430-Seed.js':
                /*!**********************************************!*\
  !*** ./src/migrations/1517934720430-Seed.js ***!
  \**********************************************/
                /*! exports provided: Seed1517934720430 */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* WEBPACK VAR INJECTION */ (function(logger) {
                        /* harmony export (binding) */ __webpack_require__.d(
                            __webpack_exports__,
                            'Seed1517934720430',
                            function() {
                                return Seed1517934720430;
                            },
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                            /*! typeorm */ 'typeorm',
                        );
                        /* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                            typeorm__WEBPACK_IMPORTED_MODULE_0__,
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                            /*! project-minimum-core */ 'project-minimum-core',
                        );
                        /* harmony import */ var project_minimum_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__,
                        );

                        /**
                         * https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
                         */

                        class Seed1517934720430 {
                            async up(queryRunner) {
                                await queryRunner.createTable(
                                    new typeorm__WEBPACK_IMPORTED_MODULE_0__[
                                        'Table'
                                    ]({
                                        name:
                                            project_minimum_core__WEBPACK_IMPORTED_MODULE_1__[
                                                'DB_SCHEMA_TABLE_NAME'
                                            ],
                                        columns: [
                                            {
                                                name: 'id',
                                                type: 'integer',
                                                isNullable: false,
                                                isGenerated: true,
                                                isPrimary: true,
                                                isUnique: true,
                                                isArray: false,
                                                length: '',
                                                zerofill: false,
                                                unsigned: true,
                                                generated: 'increment',
                                            },
                                            {
                                                name: 'draft',
                                                type: 'boolean',
                                                isNullable: false,
                                                isGenerated: false,
                                                isPrimary: false,
                                                isUnique: false,
                                                isArray: false,
                                                length: '',
                                                zerofill: false,
                                                unsigned: true,
                                            },
                                            {
                                                name: 'declaration',
                                                type: 'json',
                                                isNullable: false,
                                                isGenerated: false,
                                                isPrimary: false,
                                                isUnique: false,
                                                isArray: false,
                                                length: '',
                                                zerofill: false,
                                                unsigned: true,
                                            },
                                            {
                                                name: 'version',
                                                type: 'integer',
                                                isNullable: true,
                                                isGenerated: false,
                                                isPrimary: false,
                                                isUnique: false,
                                                isArray: false,
                                                length: '',
                                                zerofill: false,
                                                unsigned: true,
                                            },
                                        ],
                                    }),
                                    true,
                                ); // todo: users
                                // todo: groups

                                logger.info('🌱 Seed migration applied');
                            }

                            async down(queryRunner) {}
                        }
                        /* WEBPACK VAR INJECTION */
                    }.call(
                        this,
                        __webpack_require__(/*! ew-internals */ 'ew-internals')[
                            'logger'
                        ],
                    ));

                    /***/
                },

            /***/ './src/migrations/index.js':
                /*!*********************************!*\
  !*** ./src/migrations/index.js ***!
  \*********************************/
                /*! exports provided: default */
                /***/ function(
                    module,
                    __webpack_exports__,
                    __webpack_require__,
                ) {
                    'use strict';
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony import */ var _1517934720430_Seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                        /*! ./1517934720430-Seed */ './src/migrations/1517934720430-Seed.js',
                    );

                    /* harmony default export */ __webpack_exports__[
                        'default'
                    ] = [
                        _1517934720430_Seed__WEBPACK_IMPORTED_MODULE_0__[
                            'Seed1517934720430'
                        ],
                    ];

                    /***/
                },

            /***/ '@apollographql/graphql-playground-html':
                /*!*********************************************************!*\
  !*** external "@apollographql/graphql-playground-html" ***!
  \*********************************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('@apollographql/graphql-playground-html');

                    /***/
                },

            /***/ '@babel/polyfill':
                /*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('@babel/polyfill');

                    /***/
                },

            /***/ accepts:
                /*!**************************!*\
  !*** external "accepts" ***!
  \**************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('accepts');

                    /***/
                },

            /***/ 'apollo-server-core':
                /*!*************************************!*\
  !*** external "apollo-server-core" ***!
  \*************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('apollo-server-core');

                    /***/
                },

            /***/ 'apollo-server-express':
                /*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('apollo-server-express');

                    /***/
                },

            /***/ cors:
                /*!***********************!*\
  !*** external "cors" ***!
  \***********************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('cors');

                    /***/
                },

            /***/ dataloader:
                /*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('dataloader');

                    /***/
                },

            /***/ 'ew-internals':
                /*!*******************************!*\
  !*** external "ew-internals" ***!
  \*******************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('ew-internals');

                    /***/
                },

            /***/ express:
                /*!**************************!*\
  !*** external "express" ***!
  \**************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('express');

                    /***/
                },

            /***/ helmet:
                /*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('helmet');

                    /***/
                },

            /***/ 'lodash.clonedeep':
                /*!***********************************!*\
  !*** external "lodash.clonedeep" ***!
  \***********************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.clonedeep');

                    /***/
                },

            /***/ 'lodash.difference':
                /*!************************************!*\
  !*** external "lodash.difference" ***!
  \************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.difference');

                    /***/
                },

            /***/ 'lodash.get':
                /*!*****************************!*\
  !*** external "lodash.get" ***!
  \*****************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.get');

                    /***/
                },

            /***/ 'lodash.intersection':
                /*!**************************************!*\
  !*** external "lodash.intersection" ***!
  \**************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.intersection');

                    /***/
                },

            /***/ 'lodash.isfunction':
                /*!************************************!*\
  !*** external "lodash.isfunction" ***!
  \************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.isfunction');

                    /***/
                },

            /***/ 'lodash.isobject':
                /*!**********************************!*\
  !*** external "lodash.isobject" ***!
  \**********************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.isobject');

                    /***/
                },

            /***/ 'lodash.union':
                /*!*******************************!*\
  !*** external "lodash.union" ***!
  \*******************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('lodash.union');

                    /***/
                },

            /***/ md5:
                /*!**********************!*\
  !*** external "md5" ***!
  \**********************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('md5');

                    /***/
                },

            /***/ 'merge-graphql-schemas':
                /*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('merge-graphql-schemas');

                    /***/
                },

            /***/ 'naming-style':
                /*!*******************************!*\
  !*** external "naming-style" ***!
  \*******************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('naming-style');

                    /***/
                },

            /***/ path:
                /*!***********************!*\
  !*** external "path" ***!
  \***********************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('path');

                    /***/
                },

            /***/ 'project-minimum-core':
                /*!***************************************!*\
  !*** external "project-minimum-core" ***!
  \***************************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('project-minimum-core');

                    /***/
                },

            /***/ 'redis-tag-cache':
                /*!**********************************!*\
  !*** external "redis-tag-cache" ***!
  \**********************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('redis-tag-cache');

                    /***/
                },

            /***/ typeorm:
                /*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('typeorm');

                    /***/
                },

            /***/ 'uuid/v4':
                /*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
                /*! no static exports found */
                /***/ function(module, exports) {
                    module.exports = require('uuid/v4');

                    /***/
                },

            /******/
        },
    ),
);
//# sourceMappingURL=index.js.map
