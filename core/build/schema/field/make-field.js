"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeField = void 0;

var _lodash = _interopRequireDefault(require("../../lodash"));

var _type3 = require("./type");

var _constants = require("../../constants.both");

var _string = require("./string");

var _boolean = require("./boolean");

var _integer = require("./integer");

var _datetime = require("./datetime");

var _reference = require("./reference");

var _idString = require("./id-string");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var makeField = function makeField(declaration) {
  var type = declaration.type;
  var name = declaration.name;

  if (!type) {
    return new _string.StringField(declaration);
  }

  if (_lodash["default"].isArray(type)) {
    var _type = type;

    var _type2 = _slicedToArray(_type, 1);

    type = _type2[0];
  }

  if (!type) {
    return new _this(declaration);
  }

  if (name === _constants.ENTITY_ID_FIELD_NAME) {
    return new _idString.IdStringField(declaration);
  }

  if (type === _type3.FIELD_TYPE_STRING) {
    return new _string.StringField(declaration);
  }

  if (type === _type3.FIELD_TYPE_BOOLEAN) {
    return new _boolean.BooleanField(declaration);
  }

  if (type === _type3.FIELD_TYPE_INTEGER) {
    return new _integer.IntegerField(declaration);
  }

  if (type === _type3.FIELD_TYPE_DATETIME) {
    return new _datetime.DateTimeField(declaration);
  }

  return new _reference.ReferenceField(declaration);
};

exports.makeField = makeField;