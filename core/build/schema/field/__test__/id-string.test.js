"use strict";

var _idString = require("../id-string");

var _constants = require("../../../constants.both");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('IdStringField', function () {
  describe('getHealth()', function () {
    it("should report invalid ".concat(_constants.ENTITY_ID_FIELD_NAME, " field health check"),
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = new _idString.IdStringField({
                name: _constants.ENTITY_ID_FIELD_NAME,
                type: 'boolean'
              });
              _context.next = 3;
              return field.getHealth();

            case 3:
              errors = _context.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_not_system',
                fieldName: _constants.ENTITY_ID_FIELD_NAME
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_id_not_unique',
                fieldName: _constants.ENTITY_ID_FIELD_NAME
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_id_not_string',
                fieldName: _constants.ENTITY_ID_FIELD_NAME
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_id_illegal_length',
                fieldName: _constants.ENTITY_ID_FIELD_NAME
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});