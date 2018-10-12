const express = require('express');
const router = express.Router();
const v1ClassificationController = require('./classification');

/* GET home page. */
router.use('/v1', v1ClassificationController);

module.exports = router;
