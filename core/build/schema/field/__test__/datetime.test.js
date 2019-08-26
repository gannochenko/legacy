"use strict";

var _datetime = require("../datetime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */
describe('DateTimeField', function () {
  describe('castValue()', function () {
    it('should cast values to legal',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var field;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = new _datetime.DateTimeField({
                type: 'datetime',
                name: 'foo'
              });
              expect(field.castValueItem('2019-06-12T18:20:48.394Z')).toEqual('2019-06-12T18:20:48.394Z');
              expect(field.castValueItem('1560364245420')).toEqual('2019-06-12T18:30:45.420Z');
              expect(field.castValueItem(1560364245420)).toEqual('2019-06-12T18:30:45.420Z');
              expect(field.castValueItem(new Date(1560364245420))).toEqual('2019-06-12T18:30:45.420Z');
              expect(field.castValueItem('not_a_date')).toEqual('not_a_date');
              expect(field.castValueItem(null)).toEqual(null);
              expect(field.castValueItem(undefined)).toEqual(null);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('getValidator()', function () {
    it('should report illegal data',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              field = new _datetime.DateTimeField({
                type: 'datetime',
                name: 'foo'
              });
              errors = null;
              _context2.prev = 2;
              _context2.next = 5;
              return field.getValidator().validate('not_a_date', {
                abortEarly: false // strict: true,

              });

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](2);
              errors = _context2.t0.inner.map(function (error) {
                return {
                  message: error.message,
                  fieldName: error.path
                };
              });

            case 10:
              expect(errors).toHaveLength(1);
              expect(errors[0]).toEqual({
                message: "The value of 'Foo' is not a date",
                fieldName: undefined
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 7]]);
    })));
    it('should not report legal data',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              field = new _datetime.DateTimeField({
                type: 'datetime',
                name: 'foo'
              });
              errors = null;
              _context3.prev = 2;
              _context3.next = 5;
              return field.getValidator().validate('2019-06-12T18:20:48.394Z', {
                abortEarly: false // strict: true,

              });

            case 5:
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](2);
              errors = _context3.t0.inner.map(function (error) {
                return {
                  message: error.message,
                  fieldName: error.path
                };
              });

            case 10:
              expect(errors).toEqual(null);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 7]]);
    })));
  });
});