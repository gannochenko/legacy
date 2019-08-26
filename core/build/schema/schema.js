"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = void 0;

var _entity = require("./entity");

var _lodash = _interopRequireDefault(require("../lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Schema =
/*#__PURE__*/
function () {
  function Schema() {
    var declaration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Schema);

    this.declaration = declaration;
  }

  _createClass(Schema, [{
    key: "getHealth",
    value: function () {
      var _getHealth = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var errors, schema, times;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = [];
                schema = this.getSchema();

                if (schema.length) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", errors);

              case 4:
                // check health of each entity
                times = {};
                schema.forEach(function (entity) {
                  times[entity.getName()] = entity.getName() in times ? times[entity.getName()] + 1 : 1;
                });
                Object.keys(times).forEach(function (key) {
                  if (times[key] > 1) {
                    errors.push({
                      message: "Entity \"".concat(times[key], "\" met several times"),
                      code: 'entity_duplicate',
                      entityName: times[key]
                    });
                  }
                });
                _context.next = 9;
                return Promise.all(schema.map(function (entity) {
                  return entity.getHealth().then(function (entityErrors) {
                    entityErrors.forEach(function (entityError) {
                      errors.push(Object.assign({}, entityError));
                    });
                  });
                }));

              case 9:
                // check that all referenced fields are there
                this.getReferences().forEach(function (field) {
                  var rName = field.getReferenceFieldName();

                  if (!_this.getEntity(rName)) {
                    errors.push({
                      message: "Entity \"".concat(rName, "\" is referenced, but not created"),
                      code: 'field_broken_reference',
                      fieldName: rName
                    });
                  }
                });
                return _context.abrupt("return", errors);

              case 11:
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
  }, {
    key: "getSanitizedDeclaration",
    value: function getSanitizedDeclaration(declaration) {
      if (!_lodash["default"].ione(declaration)) {
        declaration = {};
      }

      if (!_lodash["default"].iane(declaration.schema)) {
        declaration.schema = [];
      }

      var version = parseInt(declaration.version, 10);

      if (Number.isNaN(version)) {
        version = 0;
      }

      return {
        schema: declaration.schema.map(function (entity) {
          return new _entity.Entity(entity);
        }),
        version: version
      };
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.declarationInternal;
    }
  }, {
    key: "getDeclaration",

    /**
     * @deprecated
     * @returns {{schema: Entity[], version: number}|*}
     */
    value: function getDeclaration() {
      return this.declarationInternal;
    }
    /**
     * @deprecated
     * @returns {{schema: Entity[], version: number}|*}
     */

  }, {
    key: "get",
    value: function get() {
      return this.declarationInternal;
    }
  }, {
    key: "getSchema",
    value: function getSchema() {
      return this.declaration.schema;
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.declaration.version;
    }
    /**
     * Returns entity by it's name
     * @param name
     * @returns {T | undefined}
     */

  }, {
    key: "getEntity",
    value: function getEntity(name) {
      // todo: make an index here
      return this.declaration.schema.find(function (entity) {
        return entity.getName() === name;
      });
    }
  }, {
    key: "getReferences",
    value: function getReferences() {
      var refs = [];
      this.declaration.schema.forEach(function (entity) {
        refs = _lodash["default"].union(refs, entity.getReferences());
      });
      return refs;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this.declaration.schema.length;
    }
  }, {
    key: "declaration",
    set: function set(declaration) {
      this.declarationInternal = this.getSanitizedDeclaration(declaration);
    },
    get: function get() {
      return this.declarationInternal;
    }
  }]);

  return Schema;
}();

exports.Schema = Schema;