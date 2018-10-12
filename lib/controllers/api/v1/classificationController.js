const spawn = require("child_process").spawn;
const classificationSerializer = require('../../../serializers/classificationSerializer');
const logger = require('node-color-log');
const path = require('path');
const pythonFile = path.join(__dirname, '../../../utils', 'classify.py');

async function create(request, response) {
  try {
    const { body: {text: words} } = request;
    // const classified = await spawn('python3', ['../utils/pythonScripts/classify.py', words]);
    let resp = await new Promise((resolve, reject) => {
      let process = spawn('python3', [pythonFile, words, 'true'] );
      process.stdout.on('data', (data) => {
        let classified = data.toString('utf8');
        classified = classified.replace(/'/g, '');
        classified = classified.replace(words, '');
        resolve(classified);
      });
      process.stderr.on('data', (data) => {
        logger.error(data);
        reject(data);
      });
    });
    response.send(classificationSerializer(resp));
  } catch (error) {
    logger.error(error);
    response.status(error.code).send(error.message);
  }
}


module.exports = {
  create,
};
