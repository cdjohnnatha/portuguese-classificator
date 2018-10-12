const { Validator } = require('jsonschema');
const { UnprocessableEntity, NotAcceptable } = require('houston-errors').houstonClientErrors;
const logger = require('node-color-log');
const jsonApiPath = require('../models/schemas/json-api-schema.json');

const Validate = new Validator();
Validate.addSchema(jsonApiPath);
const InstanceFilter = 'instance.data.attributes';

/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
async function ValidateRequestInput(params, schema, type) {
  if (Object.keys(params).length === 0 && params.constructor === Object) {
    throw NotAcceptable();
  }
  const validation = Validate.validate(params, schema).errors;
  if (validation.length !== 0) {
    let errorMessage = 'required: ';
    let argument;
    logger.warn(validation);
    await validation.forEach((error) => {
      if (error.property === InstanceFilter) {
        argument = Array.isArray(error.stack) ? error.stack[0] : error.stack;
        errorMessage += argument.replace(/["']/g, '');
        errorMessage += ', ';
      }
    });
    errorMessage = errorMessage.substr(0, (errorMessage.length - 2));
    logger.debug(errorMessage);
    throw UnprocessableEntity({ message: errorMessage });
  }
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    if (value === '') {
      const errorFields = `Required field ${key} cannot be empty`;
      logger.debug(errorFields);
      throw NotAcceptable({ message: errorFields });
    }
  });
  if (params.data.type !== type) {
    throw UnprocessableEntity({ message: 'Wrong object type' });
  }
}

module.exports = ValidateRequestInput;
