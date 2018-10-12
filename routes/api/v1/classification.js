const express = require('express');
const router = express.Router();
const classificationController = require('../../../lib/controllers/api/v1/classificationController');

router.post('/classification', classificationController.create);

module.exports = router;
