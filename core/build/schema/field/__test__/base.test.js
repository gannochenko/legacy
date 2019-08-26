"use strict";

var _boolean = require("../boolean");

var _string = require("../string");

var _reference = require("../reference");

var _constants = require("../../../constants.both");

var _base = require("../base");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */
describe('BaseField', function () {
  // beforeAll(async () => {
  // });
  // beforeEach(async () => {
  // });
  // afterEach(async () => {
  // });
  describe('getSanitizedDeclaration()', function () {
    it('should remove all attributes with incorrect values',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var field;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = new _boolean.BooleanField({
                type: 100,
                name: 1000,
                length: 'a',
                label: 10,
                preview: 'a',
                required: 'b',
                unique: 'c',
                system: 'd'
              });
              expect(Object.keys(field.declaration)).toHaveLength(0);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should remove all redundant attributes', function () {
      var field = new _boolean.BooleanField({
        type: 'boolean',
        name: 'foo',
        length: 100,
        label: 'la',
        preview: true,
        required: true,
        unique: true,
        some: 'other',
        field: 'bar',
        system: true
      });
      expect(Object.keys(field.declaration)).toEqualArray(['type', 'name', 'length', 'label', 'preview', 'unique', 'required', 'system']);
    });
  });
  describe('getHealth()', function () {
    it('should report if there is neither name nor type defined',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              field = new _base.BaseField();
              _context2.next = 3;
              return field.getHealth();

            case 3:
              errors = _context2.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_name_empty',
                fieldName: ''
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_type_empty',
                fieldName: ''
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should report if field name is equal to ".concat(_constants.ENTITY_PK_FIELD_NAME, " (which is system-reserved)"),
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              field = new _base.BaseField({
                name: _constants.ENTITY_PK_FIELD_NAME,
                type: 'string'
              });
              _context3.next = 3;
              return field.getHealth();

            case 3:
              errors = _context3.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_name_illegal',
                fieldName: _constants.ENTITY_PK_FIELD_NAME
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should report multipe-unique conflict',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var field, errors;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              field = new _base.BaseField({
                name: 'blah',
                type: ['string'],
                unique: true
              });
              _context4.next = 3;
              return field.getHealth();

            case 3:
              errors = _context4.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_multiple_unique_conflict'
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('getType()', function () {
    it('should return correct type for single field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var field;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              field = new _boolean.BooleanField({
                type: 'boolean',
                name: 'foo'
              });
              expect(field.getType()).toEqual('boolean');

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return correct type for multiple field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var field;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              field = new _boolean.BooleanField({
                type: ['boolean'],
                name: 'foo'
              });
              expect(field.getType()).toEqual(['boolean']);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('getActualType()', function () {
    it('should return correct actual type for single field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var field;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              field = new _boolean.BooleanField({
                type: 'boolean',
                name: 'foo'
              });
              expect(field.getActualType()).toEqual('boolean');

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should return correct actual type for multiple field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var field;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              field = new _boolean.BooleanField({
                type: ['boolean'],
                name: 'foo'
              });
              expect(field.getActualType()).toEqual('boolean');

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('getLength()', function () {
    it('should return correct length',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var field;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              field = new _string.StringField({
                type: 'string',
                name: 'foo',
                length: 50
              });
              expect(field.getLength()).toEqual(50);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('getName()', function () {
    it('should return correct name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var field;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              field = new _string.StringField({
                type: 'string',
                name: 'foo'
              });
              expect(field.getName()).toEqual('foo');

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('getDisplayName()', function () {
    it('should return correct display name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var field;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              field = new _string.StringField({
                type: 'string',
                name: 'foo_bar_bazz'
              });
              expect(field.getDisplayName()).toEqual('Foo bar bazz');

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('isMultiple()', function () {
    it('should return false for a single field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var field;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              field = new _string.StringField({
                type: 'string',
                name: 'foo_bar_bazz'
              });
              expect(field.isMultiple()).toBeFalsy();

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should return true for a multiple field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var field;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              field = new _string.StringField({
                type: ['string'],
                name: 'foo_bar_bazz'
              });
              expect(field.isMultiple()).toBeTruthy();

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('isSortable()', function () {
    it('should return false for a multiple field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var field;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              field = new _base.BaseField({
                type: ['string'],
                name: 'foo_bar_bazz'
              });
              expect(field.isSortable()).toBeFalsy();

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should return false for a single non-reference field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var field;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              field = new _base.BaseField({
                type: 'string',
                name: 'foo_bar_bazz'
              });
              expect(field.isSortable()).toBeTruthy();

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe('isRequired()', function () {
    it('should return correct required flag',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var field;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              field = new _base.BaseField({
                type: ['string'],
                name: 'foo',
                required: true
              });
              expect(field.isRequired()).toBeTruthy();

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
  });
  describe('isPreview()', function () {
    it('should return correct preview flag',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var field;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              field = new _base.BaseField({
                type: ['string'],
                name: 'foo',
                preview: true
              });
              expect(field.isPreview()).toBeTruthy();

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  describe('isUnique()', function () {
    it('should return true for non-reference single field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var field;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              field = new _base.BaseField({
                type: 'string',
                name: 'foo',
                unique: true
              });
              expect(field.isUnique()).toBeTruthy();

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
  });
  describe('isSystem()', function () {
    it('should return true if the field is maked as system',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var field;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              field = new _base.BaseField({
                type: 'string',
                name: 'foo',
                system: true
              });
              expect(field.isSystem()).toBeTruthy();

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
  });
  describe('toJSON()', function () {
    it('should return return JSON declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var field;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              field = new _base.BaseField({
                type: 'string',
                name: 'foo',
                system: true
              });
              expect(JSON.stringify(field)).toEqual(JSON.stringify({
                type: 'string',
                name: 'foo',
                system: true
              }));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
  describe('castValue()', function () {
    it('should cast single value',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var field;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              field = new _base.BaseField({
                type: 'string',
                name: 'foo'
              });
              expect(field.castValue('lalala')).toEqual('lalala');

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    it('should cast multiple values throwing out nulls and undefineds',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var field;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              field = new _base.BaseField({
                type: ['string'],
                name: 'foo'
              });
              expect(field.castValue(['la', null, undefined, 'lo'])).toEqual(['la', 'lo']);

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it('should not cast multiple to single and back',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23() {
      var fieldSingle, fieldMultiple;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              fieldSingle = new _base.BaseField({
                type: 'string',
                name: 'foo'
              });
              expect(fieldSingle.castValue(['one', 'two'])).toEqual(['one', 'two']);
              fieldMultiple = new _base.BaseField({
                type: ['string'],
                name: 'foo'
              });
              expect(fieldMultiple.castValue('one')).toEqual('one');

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
  });
  describe('isReference()', function () {
    it('should return false for a non-reference field',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24() {
      var field;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              field = new _base.BaseField({
                type: ['string'],
                name: 'foo',
                preview: true
              });
              expect(field.isReference()).toBeFalsy();

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
  });
});