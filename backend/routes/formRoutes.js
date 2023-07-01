const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

router.post('/', formController.submitForm);
router.get('/', formController.getFormData);

module.exports = router;
