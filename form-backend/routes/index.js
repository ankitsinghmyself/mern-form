const express = require('express');
const router = express.Router();

const FormController = require('../controllers/formController');

router.post('/save', FormController.save);
router.get('/forms', FormController.forms);

module.exports = router;
