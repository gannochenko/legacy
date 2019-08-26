"use strict";

var _makeField = require("../make-field");

var _string = require("../string");

var _boolean = require("../boolean");

var _integer = require("../integer");

var _datetime = require("../datetime");

var _reference = require("../reference");

var _constants = require("../../../constants.both");

var _idString = require("../id-string");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('MakeField', function () {
  describe('should create string field', function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var field;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'string',
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_string.StringField);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('after multiple declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var field;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: ['string'],
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_string.StringField);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('should create boolean field', function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var field;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'boolean',
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_boolean.BooleanField);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('after multiple declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var field;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: ['boolean'],
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_boolean.BooleanField);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('should create integer field', function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var field;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'integer',
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_integer.IntegerField);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('after multiple declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var field;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: ['integer'],
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_integer.IntegerField);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('should create datetime field', function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var field;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'datetime',
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_datetime.DateTimeField);

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('after multiple declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var field;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: ['datetime'],
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_datetime.DateTimeField);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('should create reference field', function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var field;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'ref',
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_reference.ReferenceField);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('after multiple declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var field;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: ['ref'],
                name: 'foo'
              });
              expect(field).toBeInstanceOf(_reference.ReferenceField);

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe("should create ".concat(_constants.ENTITY_ID_FIELD_NAME, " field"), function () {
    it('after single declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var field;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              field = (0, _makeField.makeField)({
                type: 'string',
                name: _constants.ENTITY_ID_FIELD_NAME
              });
              expect(field).toBeInstanceOf(_idString.IdStringField);

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
});