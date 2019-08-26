"use strict";

var _entity = require("../entity");

var _constants = require("../../constants.both");

var _field = require("../field");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Entity', function () {
  describe('getSanitizedDeclaration()', function () {
    it('should normalize declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var entity;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              entity = new _entity.Entity();
              expect(entity.declaration).toMatchObject({
                name: '',
                schema: []
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should make instances of fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var entity, declaration;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'i_have_a_name',
                  type: 'string'
                }]
              });
              declaration = entity.declaration;
              expect(declaration.schema[0]).toBeInstanceOf(_field.BooleanField);
              expect(declaration.schema[1]).toBeInstanceOf(_field.StringField);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('getHealth()', function () {
    it('should report on nameless entity',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var entity, errors;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              entity = new _entity.Entity({
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }]
              });
              _context3.next = 3;
              return entity.getHealth();

            case 3:
              errors = _context3.sent;
              expect(errors).toMatchObjectInArray({
                code: 'entity_name_empty'
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should report on empty entity',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var entity, errors;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              entity = new _entity.Entity({
                schema: []
              });
              _context4.next = 3;
              return entity.getHealth();

            case 3:
              errors = _context4.sent;
              expect(errors).toMatchObjectInArray({
                code: 'entity_schema_empty'
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should report on duplicate fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var entity, errors;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: _constants.ENTITY_ID_FIELD_NAME,
                  type: 'string',
                  system: true,
                  unique: true,
                  length: _constants.ENTITY_ID_FIELD_LENGTH
                }, {
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'i_have_a_name',
                  type: 'string'
                }]
              });
              _context5.next = 3;
              return entity.getHealth();

            case 3:
              errors = _context5.sent;
              expect(errors).toMatchObjectInArray({
                code: 'entity_field_duplicate',
                fieldName: 'i_have_a_name'
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("should report absence of ".concat(_constants.ENTITY_ID_FIELD_NAME, " field"),
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var name, entity, errors;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              name = 'test';
              entity = new _entity.Entity({
                name: name,
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }]
              });
              _context6.next = 4;
              return entity.getHealth();

            case 4:
              errors = _context6.sent;
              expect(errors).toMatchObjectInArray({
                code: 'entity_no_id_field'
              });

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should report invalid fieldset health check',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var name, entity, errors;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              name = 'test';
              entity = new _entity.Entity({
                name: name,
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: _constants.ENTITY_ID_FIELD_NAME,
                  type: 'boolean'
                }, {
                  name: '',
                  type: 'string'
                }]
              });
              _context7.next = 4;
              return entity.getHealth();

            case 4:
              errors = _context7.sent;
              expect(errors).toMatchObjectInArray({
                code: 'field_name_empty',
                fieldName: ''
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_not_system',
                fieldName: _constants.ENTITY_ID_FIELD_NAME
              });

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('castData()', function () {
    it('should cast several fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var entity, data;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'test',
                schema: [{
                  name: 'bool_field',
                  type: 'boolean'
                }, {
                  name: 'integer_field',
                  type: 'integer'
                }]
              });
              data = entity.castData({
                bool_field: '1111',
                integer_field: '1000'
              });
              expect(data).toEqual({
                bool_field: true,
                integer_field: 1000
              });

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('validateData()', function () {
    it('should validate several fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var entity, errors;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'test',
                schema: [{
                  name: 'bool_field',
                  type: 'boolean'
                }, {
                  name: 'integer_field',
                  type: 'integer'
                }]
              });
              _context9.next = 3;
              return entity.validateData({
                bool_field: '1111',
                integer_field: 'aaaa'
              });

            case 3:
              errors = _context9.sent;
              expect(errors).toMatchObjectInArray({
                fieldName: 'bool_field'
              });
              expect(errors).toMatchObjectInArray({
                fieldName: 'integer_field'
              });

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('getName()', function () {
    it('should return correct snake case name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var entity;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'my_name_is_alice',
                schema: []
              });
              expect(entity.getName()).toEqual('my_name_is_alice');

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('getCamelName()', function () {
    it('should return correct camel case name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var entity;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'my_name_is_alice',
                schema: []
              });
              expect(entity.getCamelName()).toEqual('MyNameIsAlice');

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('getDisplayName()', function () {
    it('should return correct space-separated name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var entity;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'my_name_is_alice',
                schema: []
              });
              expect(entity.getDisplayName()).toEqual('My name is alice');

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('getReferences()', function () {
    it('should return references',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var entity, result;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'single_ref',
                  type: 'referenced_entity_1'
                }, {
                  name: 'multiple_ref',
                  type: ['referenced_entity_2']
                }]
              });
              result = entity.getReferences();
              expect(result).toHaveLength(2);
              expect(result[0]).toBeInstanceOf(_field.ReferenceField);
              expect(result[0].getName()).toEqual('single_ref');
              expect(result[1]).toBeInstanceOf(_field.ReferenceField);
              expect(result[1].getName()).toEqual('multiple_ref');

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('getSingleReferences()', function () {
    it('should return references',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var entity, result;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'single_ref',
                  type: 'referenced_entity_1'
                }, {
                  name: 'multiple_ref',
                  type: ['referenced_entity_2']
                }]
              });
              result = entity.getSingleReferences();
              expect(result).toHaveLength(1);
              expect(result[0]).toBeInstanceOf(_field.ReferenceField);
              expect(result[0].getName()).toEqual('single_ref');

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
  });
  describe('getMultipleReferences()', function () {
    it('should return references',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var entity, result;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'single_ref',
                  type: 'referenced_entity_1'
                }, {
                  name: 'multiple_ref',
                  type: ['referenced_entity_2']
                }]
              });
              result = entity.getMultipleReferences();
              expect(result).toHaveLength(1);
              expect(result[0]).toBeInstanceOf(_field.ReferenceField);
              expect(result[0].getName()).toEqual('multiple_ref');

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe('getPreviewField()', function () {
    it('should take first single string field as presentational',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var entity, result;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'single_ref',
                  type: 'referenced_entity_1'
                }, {
                  name: 'i_am_presentational',
                  type: 'string'
                }]
              });
              result = entity.getPreviewField();
              expect(result).toBeInstanceOf(_field.StringField);
              expect(result.getName()).toEqual('i_am_presentational');

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should take specified field as presentational',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var entity, result;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              entity = new _entity.Entity({
                name: 'sample',
                schema: [{
                  name: 'i_have_a_name',
                  type: 'boolean'
                }, {
                  name: 'single_ref',
                  type: 'referenced_entity_1'
                }, {
                  name: 'i_am_not_presentational',
                  type: 'string'
                }, {
                  name: 'i_am_presentational',
                  type: 'string',
                  preview: true
                }]
              });
              result = entity.getPreviewField();
              expect(result).toBeInstanceOf(_field.StringField);
              expect(result.getName()).toEqual('i_am_presentational');

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
});