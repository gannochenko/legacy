"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.isobject"));

var _lodash2 = _interopRequireDefault(require("lodash.union"));

var _lodash3 = _interopRequireDefault(require("lodash.uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint import/no-unresolved: 0 */
var _default = {
  isArray: Array.isArray,
  isString: function isString(arg) {
    return typeof arg === 'string';
  },
  isObject: _lodash["default"],
  union: _lodash2["default"],
  iane: function iane(arg) {
    return Array.isArray(arg) && arg.length > 0;
  },
  ione: function ione(arg) {
    return (0, _lodash["default"])(arg) && Object.keys(arg).length > 0;
  },
  isne: function isne(arg) {
    return typeof arg === 'string' && arg.length > 0;
  },
  unique: _lodash3["default"]
};
exports["default"] = _default;