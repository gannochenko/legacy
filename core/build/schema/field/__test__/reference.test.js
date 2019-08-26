"use strict";

var _reference = require("../reference");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */
describe('ReferenceField', function () {
  describe('getHealth()', function () {
    it('should report invalid reference field health check',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = new _reference.ReferenceField({
                name: 'reference',
                type: 'reference',
                unique: true,
                preview: true
              });
              _context.next = 3;
              return field.getHealth();

            case 3:
              errors = _context.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_reference_unique_conflict',
                fieldName: 'reference'
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_reference_preview_conflict',
                fieldName: 'reference'
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('isReference()', function () {
    it('should return true for a reference field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var field;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              field = new _reference.ReferenceField({
                type: ['reference'],
                name: 'foo',
                preview: true
              });
              expect(field.isReference()).toBeTruthy();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('isSortable()', function () {
    it('should not return true for reference fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var field;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              field = new _reference.ReferenceField({
                name: 'reference',
                type: 'reference'
              });
              expect(field.isSortable()).toBeFalsy();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});