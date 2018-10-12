const express = require('express');
const router = express.Router();
const v1 = require('./v1/v1');

/* GET home page. */
router.use('/api', v1);

module.exports = router;
