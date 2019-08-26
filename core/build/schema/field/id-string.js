"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdStringField = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _string = require("./string");

var _constants = require("../../constants.both");

var _type = require("./type");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IdStringField =
/*#__PURE__*/
function (_StringField) {
  _inherits(IdStringField, _StringField);

  function IdStringField() {
    _classCallCheck(this, IdStringField);

    return _possibleConstructorReturn(this, _getPrototypeOf(IdStringField).apply(this, arguments));
  }

  _createClass(IdStringField, [{
    key: "getHealth",

    /**
     * In this function we assume that the name of the field is equal to ENTITY_ID_FIELD_NAME constant value
     * @returns {Promise<Array>}
     */
    value: function () {
      var _getHealth = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var errors, name, system, unique, length, len;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(_getPrototypeOf(IdStringField.prototype), "getHealth", this).call(this);

              case 2:
                errors = _context.sent;
                name = this.getName();
                system = this.isSystem();
                unique = this.isUnique();
                length = this.getLength();

                if (!system) {
                  errors.push({
                    message: "The field should be declared as system-reserved: ".concat(name),
                    code: "field_not_system",
                    fieldName: name
                  });
                } // check that it is unique


                if (!unique) {
                  errors.push({
                    message: "System field \"".concat(_constants.ENTITY_ID_FIELD_NAME, "\" should be unique"),
                    code: 'field_id_not_unique',
                    fieldName: name
                  });
                } // check that it has type of string


                if (this.getActualType() !== _type.FIELD_TYPE_STRING) {
                  errors.push({
                    message: "System field \"".concat(_constants.ENTITY_ID_FIELD_NAME, "\" should be string"),
                    code: 'field_id_not_string',
                    fieldName: name
                  });
                } // check that it is not multiple


                if (this.isMultiple()) {
                  errors.push({
                    message: "System field \"".concat(_constants.ENTITY_ID_FIELD_NAME, "\" should not be multiple"),
                    code: 'field_id_multiple',
                    fieldName: name
                  });
                } // check that it has length


                len = parseInt(length, 10);

                if (Number.isNaN(len) || len !== _constants.ENTITY_ID_FIELD_LENGTH) {
                  errors.push({
                    message: "System field \"".concat(_constants.ENTITY_ID_FIELD_NAME, "\" should have length of ").concat(_constants.ENTITY_ID_FIELD_LENGTH),
                    code: 'field_id_illegal_length',
                    fieldName: name
                  });
                }

                return _context.abrupt("return", errors);

              case 14:
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
    key: "createValueItemValidator",
    value: function createValueItemValidator() {
      // todo: check for uuid
      return yup.string().length(_constants.ENTITY_ID_FIELD_LENGTH, "Field '".concat(this.getDisplayName(), "' should be ").concat(_constants.ENTITY_ID_FIELD_LENGTH, " characters long")).typeError(this.getTypeErrorMessage('a string'));
    }
  }]);

  return IdStringField;
}(_string.StringField);

exports.IdStringField = IdStringField;