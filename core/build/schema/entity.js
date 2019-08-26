"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

var _ewInternals = require("ew-internals");

var yup = _interopRequireWildcard(require("yup"));

var _type = require("./field/type");

var _constants = require("../constants.both");

var _lodash = _interopRequireDefault(require("../lodash"));

var _makeField = require("./field/make-field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity =
/*#__PURE__*/
function () {
  function Entity(declaration) {
    _classCallCheck(this, Entity);

    this.declaration = declaration;
  }

  _createClass(Entity, [{
    key: "getSanitizedDeclaration",
    value: function getSanitizedDeclaration(declaration) {
      var safeDeclaration = declaration;

      if (!_lodash["default"].ione(safeDeclaration)) {
        safeDeclaration = {};
      }

      if (!_lodash["default"].iane(safeDeclaration.schema)) {
        safeDeclaration.schema = [];
      }

      return {
        name: safeDeclaration.name || '',
        schema: safeDeclaration.schema.map(function (field) {
          return (0, _makeField.makeField)(field);
        })
      };
    }
  }, {
    key: "getHealth",
    value: function () {
      var _getHealth = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var errors, declaration, times;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = [];
                declaration = this.declaration; // check that entity has a name

                if (!declaration.name.length) {
                  errors.push({
                    message: 'Entity does not have a name',
                    code: 'entity_name_empty',
                    entityName: ''
                  });
                } // check schema


                if (declaration.schema.length) {
                  _context.next = 6;
                  break;
                }

                errors.push({
                  message: 'Entity does not have a single field',
                  code: 'entity_schema_empty',
                  entityName: declaration.name || ''
                });
                return _context.abrupt("return", errors);

              case 6:
                times = {};
                declaration.schema.forEach(function (field) {
                  times[field.getName()] = field.getName() in times ? times[field.getName()] + 1 : 1;
                });
                Object.keys(times).forEach(function (key) {
                  if (times[key] > 1) {
                    errors.push({
                      message: "Field \"".concat(key, "\" met several times"),
                      code: 'entity_field_duplicate',
                      fieldName: key,
                      entityName: declaration.name || ''
                    });
                  }
                }); // check that entity has legal entity id field

                if (!times[_constants.ENTITY_ID_FIELD_NAME]) {
                  errors.push({
                    message: "Entity does not have id field",
                    code: 'entity_no_id_field',
                    entityName: declaration.name || ''
                  });
                }

                _context.next = 12;
                return Promise.all(declaration.schema.map(function (field) {
                  return field.getHealth().then(function (fieldErrors) {
                    fieldErrors.forEach(function (fieldError) {
                      errors.push(Object.assign({}, fieldError, {
                        entityName: declaration.name
                      }));
                    });
                  });
                }));

              case 12:
                return _context.abrupt("return", errors);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getHealth() {
        return _getHealth.apply(this, arguments);
      }

      return getHealth;
    }()
    /**
     * Returns entity name, in snake_case
     * @returns {*|string}
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.declaration.name;
    }
    /**
     * Returns entity name in CamelCase
     * @returns {*}
     */

  }, {
    key: "getCamelName",
    value: function getCamelName() {
      return (0, _ewInternals.convertToCamel)(this.getName().toLowerCase());
    }
    /**
     * Returns entity name in Readable format with spaces
     * @returns {*}
     */

  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return (0, _ewInternals.uCFirst)(this.getName()).replace(/_/g, ' ');
    }
  }, {
    key: "getFields",
    value: function getFields() {
      return this.declaration.schema;
    }
  }, {
    key: "getReferences",
    value: function getReferences() {
      return this.getFields().filter(function (field) {
        return field.isReference();
      });
    }
  }, {
    key: "getSingleReferences",
    value: function getSingleReferences() {
      return this.getFields().filter(function (field) {
        return field.isReference() && !field.isMultiple();
      });
    }
  }, {
    key: "getMultipleReferences",
    value: function getMultipleReferences() {
      return this.getFields().filter(function (field) {
        return field.isReference() && field.isMultiple();
      });
    }
  }, {
    key: "getField",
    value: function getField(name) {
      return this.declaration.schema[name];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.declaration;
    }
  }, {
    key: "getPreviewField",
    value: function getPreviewField() {
      var preview = this.declaration.schema.find(function (field) {
        return field.getType() === _type.FIELD_TYPE_STRING && field.getName() !== _constants.ENTITY_ID_FIELD_NAME && field.isPreview();
      });

      if (preview) {
        return preview;
      }

      return this.declaration.schema.find(function (field) {
        return field.getType() === _type.FIELD_TYPE_STRING && field.getName() !== _constants.ENTITY_ID_FIELD_NAME;
      }) || null;
    }
  }, {
    key: "getValidator",
    value: function getValidator() {
      var shape = {};
      this.declaration.schema.forEach(function (field) {
        shape[field.getName()] = field.getValidator();
      });
      return yup.object().shape(shape);
    }
    /**
     * Before saving any data tries to cast every value that is possible to cast,
     * to make the API more tolerant and friendly
     * @param data
     * todo: better to name it "castData"
     */

  }, {
    key: "castData",
    value: function castData(data) {
      var processed = {};

      if (!_lodash["default"].ione(data)) {
        return processed;
      }

      this.getFields().forEach(function (field) {
        var name = field.getName();

        if (!(name in data)) {
          return;
        }

        processed[name] = field.castValue(data[name]);
      });
      return processed;
    }
  }, {
    key: "validateData",
    value: function () {
      var _validateData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(sourceData) {
        var errors;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                errors = null;
                _context2.prev = 1;
                _context2.next = 4;
                return this.getValidator().validate(sourceData, {
                  abortEarly: false // strict: true,

                });

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](1);

                if (_lodash["default"].isArray(_context2.t0.inner)) {
                  errors = _context2.t0.inner.map(function (error) {
                    return {
                      message: error.message,
                      fieldName: error.path
                    };
                  });
                } else {
                  errors = [{
                    message: 'Internal error',
                    fieldName: ''
                  }];
                }

              case 9:
                return _context2.abrupt("return", errors);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function validateData(_x) {
        return _validateData.apply(this, arguments);
      }

      return validateData;
    }()
  }, {
    key: "declaration",
    set: function set(declaration) {
      this.declarationInternal = this.getSanitizedDeclaration(declaration);
    },
    get: function get() {
      return this.declarationInternal;
    }
  }]);

  return Entity;
}();

exports.Entity = Entity;