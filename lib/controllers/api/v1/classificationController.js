const spawn = require("child_process").spawn;
const classificationSerializer = require('../../../serializers/classificationSerializer');
const logger = require('node-color-log');
const path = require('path');
const pythonFile = path.join(__dirname, '../../../utils', 'classify.py');
const { Error, Deserializer } = require('jsonapi-serializer');
const inputHelper = require('../../../helpers/inputHelper');
const classificationSchema = require('../../../models/schemas/classification.json');

async function create(request, response) {
  try {
    console.log(request.body);
    await inputHelper(request.body, classificationSchema, 'classification');
    const { input_text: inputText } = await new Deserializer({keyForAttribute: 'underscore_case'}).deserialize(request.body);
    let resp = await new Promise((resolve, reject) => {
      let process = spawn('python3', [pythonFile, inputText, 'true'] );
      process.stdout.on('data', (data) => {
        let classified = data.toString('utf8');
        classified = classified.replace(/'/g, '');
        classified = classified.replace(inputText, '');
        resolve(classified);
      });
      process.stderr.on('data', (data) => {
        logger.error(data);
        reject(data);
      });
    });
    response.status(200).send(classificationSerializer(resp));
  } catch (error) {
    logger.error(JSON.stringify(error));
    const errors = new Error({
      code: error.code || 500,
      source: { 'classification': '/classification' },
      detail: error.message
    });
    response.status(error.code || 500).send(errors);
  }
}


module.exports = {
  create,
};
