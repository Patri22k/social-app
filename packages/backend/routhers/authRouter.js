const express = require('express');
const router = express.Router();
const formVerification = require('../controlers/formVerification');

router.post('/login', (req, res) => {
  formVerification(req, res);
});

router.post('/signup', (req, res) => {
  formVerification(req, res);
});

module.exports = router;