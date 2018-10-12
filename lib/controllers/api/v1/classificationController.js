const spawn = require("child_process").spawn;

async function create(request, response) {
  try {
    const { body: {text: words} } = request;
    // const classified = await spawn('python3', ['../utils/pythonScripts/classify.py', words]);
    let resp = await new Promise((resolve, reject) => {
      let process = spawn('python3', [__dirname + "/classify.py", words, 'true'] );
      process.stdout.on('data', (data) => {
        let classified = data.toString('utf8');
        classified = classified.replace(/'/g, '');
        classified = classified.replace(words, '');
        resolve(classified);
        // Do something with the data returned from python script
      });
      process.stderr.on('data', (data) => {
        // As said before, convert the Uint8Array to a readable string.
        console.log(data);
        reject(data);
      });
    });
    response.send(resp);
  } catch (error) {
    console.log(error);
    response.status(error.code).send(error.message);
  }
}


module.exports = {
  create,
};
