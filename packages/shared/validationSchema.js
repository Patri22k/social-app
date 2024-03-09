const yup = require('yup');

/**
 * Type definition for the validation schema.
 * @typedef {Object} Schema
 * @property {string} username - The username field.
 * @property {string} password - The password field.
 */

/**
 * A Yup object schema for validating user input.
 * @type {Schema}
 */
const schema = yup.object({
    username: yup.string()
        .required('This is a required field')
        .min(6, 'Username must be at least 6 characters long')
        .max(20, 'Username must be at most 20 characters long'),
    password: yup.string()
        .required('This is a required field')
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long'),
});

module.exports = { schema };