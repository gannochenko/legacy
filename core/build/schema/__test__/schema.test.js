"use strict";

var _schema = require("../schema");

var _constants = require("../../constants.both");

var _entity = require("../entity");

var _field = require("../field");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Schema', function () {
  describe('getHealth()', function () {
    it('should report invalid health check',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var schema, errors;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              schema = new _schema.Schema({
                schema: [{
                  name: 'entity_one'
                }, {
                  name: 'entity_two',
                  schema: [{
                    name: 'code',
                    type: 'string',
                    required: true,
                    unique: true,
                    length: 255
                  }, {
                    name: 'no_type'
                  }]
                }]
              });
              _context.next = 3;
              return schema.getHealth();

            case 3:
              errors = _context.sent;
              expect(errors).toMatchObjectInArray({
                code: 'entity_schema_empty',
                entityName: 'entity_one'
              });
              expect(errors).toMatchObjectInArray({
                code: "entity_no_".concat(_constants.ENTITY_ID_FIELD_NAME, "_field"),
                entityName: 'entity_two'
              });
              expect(errors).toMatchObjectInArray({
                code: 'field_type_empty',
                entityName: 'entity_two',
                fieldName: 'no_type'
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('getSanitizedDeclaration()', function () {
    it('should return skeleton declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var schema, declaration;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              schema = new _schema.Schema();
              declaration = schema.declaration;
              expect(declaration).toEqual({
                schema: [],
                version: 0
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should normalize declaration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var schema, declaration;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              schema = new _schema.Schema({
                schema: 'la',
                version: 'b'
              });
              declaration = schema.declaration;
              expect(declaration).toEqual({
                schema: [],
                version: 0
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should make instances of entities',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var schema, declaration;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              schema = new _schema.Schema({
                schema: [{
                  name: 'test',
                  schema: [{
                    name: 'entity_1',
                    schema: [{
                      name: 'field_1',
                      type: 'boolean'
                    }]
                  }]
                }],
                version: 10
              });
              declaration = schema.declaration;
              expect(declaration.schema[0]).toBeInstanceOf(_entity.Entity);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('getSchema()', function () {
    it('should return valid schema',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var schema;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              schema = new _schema.Schema({
                schema: [{
                  name: 'test',
                  schema: [{
                    name: 'entity_1',
                    schema: [{
                      name: 'field_1',
                      type: 'boolean'
                    }]
                  }]
                }],
                version: 10
              });
              expect(schema.getSchema()).toHaveLength(1);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('getVersion()', function () {
    it('should return schema version',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var schema;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              schema = new _schema.Schema({
                version: 5
              });
              expect(schema.getVersion()).toEqual(5);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('getEntity()', function () {
    it('should return entity by its name',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var schema, second;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              schema = new _schema.Schema({
                schema: [{
                  name: 'entity_one'
                }, {
                  name: 'entity_two',
                  schema: [{
                    name: 'code',
                    type: 'string',
                    required: true,
                    unique: true,
                    length: 255
                  }, {
                    name: 'no_type'
                  }]
                }]
              });
              second = schema.getEntity('entity_two');
              expect(second).toBeInstanceOf(_entity.Entity);
              expect(second.getName()).toEqual('entity_two');

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('getReferences()', function () {
    it('should return references of all entities',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var schema, references;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              schema = new _schema.Schema({
                schema: [{
                  name: 'entity_one',
                  schema: [{
                    name: 'reference_1',
                    type: ['reference_1']
                  }, {
                    name: 'string_1',
                    type: 'string'
                  }]
                }, {
                  name: 'entity_two',
                  schema: [{
                    name: 'reference_1',
                    type: 'reference_1'
                  }, {
                    name: 'number_1',
                    type: 'integer'
                  }]
                }]
              });
              references = schema.getReferences();
              expect(references).toHaveLength(2);
              expect(references[0]).toBeInstanceOf(_field.ReferenceField);
              expect(references[0].getName()).toEqual('reference_1');
              expect(references[1]).toBeInstanceOf(_field.ReferenceField);
              expect(references[1].getName()).toEqual('reference_1');

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('toJSON()', function () {
    it('should stringify to json', function () {
      var schema = new _schema.Schema({
        schema: [{
          name: 'entity_one'
        }, {
          name: 'entity_two',
          schema: [{
            name: 'code',
            type: 'string',
            required: true,
            unique: true,
            length: 255
          }]
        }]
      });
      var json = JSON.stringify(schema);
      var parsed = JSON.parse(json);
      expect(parsed).toMatchObject({
        schema: [{
          name: 'entity_one',
          schema: []
        }, {
          name: 'entity_two',
          schema: [{
            name: 'code',
            type: 'string',
            length: 255,
            required: true,
            unique: true
          }]
        }],
        version: 0
      });
    });
  });
});