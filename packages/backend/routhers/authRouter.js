/**
 * Express router for handling authentication routes.
 * @module authRouter
 */

const express = require('express');
const router = express.Router();
const formVerification = require('../controlers/formVerification');

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/login', (req, res) => {
  formVerification(req, res);
});

/**
 * Route for user signup.
 * @name POST /signup
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/signup', (req, res) => {
  formVerification(req, res);
});

module.exports = router;