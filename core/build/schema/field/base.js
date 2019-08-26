"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseField = void 0;

var _ewInternals = require("ew-internals");

var yup = _interopRequireWildcard(require("yup"));

var _constants = require("../../constants.both");

var _lodash = _interopRequireDefault(require("../../lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseField =
/*#__PURE__*/
function () {
  function BaseField() {
    var declaration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseField);

    this.declaration = declaration;
  }

  _createClass(BaseField, [{
    key: "getHealth",
    value: function () {
      var _getHealth = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var errors, name, type, isMultiple, isUnique;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = [];
                name = this.getName();
                type = this.getType();
                isMultiple = this.isMultiple();
                isUnique = this.isUnique(); // check that entity has a name

                if (!_lodash["default"].isne(name)) {
                  errors.push({
                    message: 'Field does not have a name',
                    code: 'field_name_empty',
                    fieldName: ''
                  });
                } // check that entity has a type


                if (!_lodash["default"].isne(type)) {
                  errors.push({
                    message: 'Field does not have a type',
                    code: 'field_type_empty',
                    fieldName: name || ''
                  });
                }

                if (isMultiple && isUnique) {
                  errors.push({
                    message: 'The field can not be both multiple and unique',
                    code: 'field_multiple_unique_conflict',
                    fieldName: name || ''
                  });
                }

                if (name === _constants.ENTITY_PK_FIELD_NAME) {
                  errors.push({
                    message: "The following name is system-reserved: ".concat(name),
                    code: 'field_name_illegal',
                    fieldName: name
                  });
                }

                return _context.abrupt("return", errors);

              case 10:
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
    key: "getSanitizedDeclaration",
    value: function getSanitizedDeclaration(declaration) {
      var legal = ['type', 'name', 'label', 'length', 'required', 'unique', 'preview', 'system'];
      var safeDeclaration = {};
      Object.keys(declaration).forEach(function (key) {
        if (legal.includes(key)) {
          safeDeclaration[key] = declaration[key];
        }
      });
      var validator = this.getDeclarationValidator();

      try {
        validator.validateSync(declaration, {
          abortEarly: false
        });
      } catch (validationErrors) {
        if (validationErrors instanceof yup.ValidationError) {
          validationErrors.inner.forEach(function (errorItem) {
            delete safeDeclaration[errorItem.path];
          });
        } else {
          throw validationErrors;
        }
      }

      var type = safeDeclaration.type; // check if type is string or [string] (not possible to do with yup?)

      if (!_lodash["default"].isne(type) && !(_lodash["default"].isArray(type) && type.length === 1 && _lodash["default"].isne(type[0]))) {
        delete safeDeclaration.type;
      }

      return safeDeclaration;
    }
  }, {
    key: "getDeclarationValidator",
    value: function getDeclarationValidator() {
      if (!this.fieldValidator) {
        this.fieldValidator = yup.object().shape({
          name: yup.string().typeError('Field name should be a string').strict(true).required('Field should have a name'),
          // // it is impossible in yup to write like this =(((
          // type: yup.mixed().oneOf([
          //     yup.string(),
          //     yup.array().of(yup.string()).min(1).max(1),
          // ], 'Field type should be of type string or an array of one string'),
          label: yup.string().typeError('Field label should be a string').strict(true),
          length: yup.number().typeError('Field length should be a number'),
          required: yup["boolean"]().typeError('Field required flag should be boolean'),
          unique: yup["boolean"]().typeError('Field unique flag should be boolean'),
          preview: yup["boolean"]().typeError('Field preview flag should be boolean'),
          system: yup["boolean"]().typeError('System flag should be boolean')
        });
      }

      return this.fieldValidator;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.declaration.type || null;
    }
  }, {
    key: "getActualType",
    value: function getActualType() {
      var type = this.getType();

      if (!type) {
        return null;
      }

      return this.isMultiple() ? type[0] : type;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return null;
    }
    /**
     * Returns field name, in snake_case
     * @returns {*|string}
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.declaration.name;
    }
    /**
     * Returns field name in Readable format with spaces
     * @returns {*}
     */

  }, {
    key: "getDisplayName",
    value: function getDisplayName() {
      return _lodash["default"].isne(this.declaration.label) ? this.declaration.label : (0, _ewInternals.uCFirst)(this.getName()).replace(/_/g, ' ');
    }
  }, {
    key: "getDeclaration",
    value: function getDeclaration() {
      return this.declaration;
    }
  }, {
    key: "isMultiple",
    value: function isMultiple() {
      return _lodash["default"].isArray(this.declaration.type);
    }
  }, {
    key: "isSortable",
    value: function isSortable() {
      return !(this.isMultiple() || this.isReference());
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      return this.declaration.required === true;
    }
  }, {
    key: "isPreview",
    value: function isPreview() {
      return this.declaration.preview === true;
    }
  }, {
    key: "isUnique",
    value: function isUnique() {
      return this.declaration.unique === true;
    }
  }, {
    key: "isSystem",
    value: function isSystem() {
      return this.declaration.system === true;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.declaration;
    }
  }, {
    key: "castValue",
    value: function castValue(value) {
      var _this = this;

      if (this.isMultiple()) {
        if (_lodash["default"].isArray(value)) {
          // cast & remove all nulls, does not make sense to keep them
          return value.map(function (subValue) {
            return _this.castValueItem(subValue);
          }).filter(function (x) {
            return x !== null && x !== undefined;
          });
        }

        return value;
      }

      return this.castValueItem(value);
    }
  }, {
    key: "castValueItem",
    value: function castValueItem(value) {
      return value;
    }
  }, {
    key: "getValidator",
    value: function getValidator() {
      var rule = this.createValueItemValidator(); // multiple

      if (this.isMultiple()) {
        rule = yup.array().of(rule);
      } // required


      if (this.isRequired()) {
        rule = rule.required("".concat(this.getDisplayName(), " is required"));
      } else {
        rule = rule.nullable();
      }

      return rule;
    }
  }, {
    key: "createValueItemValidator",
    value: function createValueItemValidator() {
      throw new Error('Not implemented');
    }
  }, {
    key: "getReferencedEntityName",
    value: function getReferencedEntityName() {
      return null;
    }
  }, {
    key: "isReference",
    value: function isReference() {
      return false;
    }
  }, {
    key: "getTypeErrorMessage",
    value: function getTypeErrorMessage(what) {
      return "The value of '".concat(this.getDisplayName(), "' is not ").concat(what);
    }
  }, {
    key: "declaration",
    set: function set(declaration) {
      this.declarationInternal = this.getSanitizedDeclaration(declaration);
    },
    get: function get() {
      return this.declarationInternal;
    }
  }]);

  return BaseField;
}();

exports.BaseField = BaseField;