// Import the yup library for schema validation
const yup = require('yup');

// Import the validation schema from the shared module
const { schema } = require('@socialapp-clone/shared/validationSchema');
const { handleLogin, handleSignup } = require('./auth');

/**
 * Middleware function for form validation.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 */
const formVerification = (req, res, action) => {
  // Extract the data from the request body
  const data = req.body;

  // Validate the data against the schema
  schema
    .validate(data)
    .catch(err => {
      // If validation fails, send a 422 status code and the validation error messages
      res.status(422).json({ status: 422, message: err.errors });
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        const cred = {
          usr: data.username,
          pwd: data.password
        };

        if (action === "login") {
          // Login handle
          handleLogin(cred, req, res);
        } else if (action === "signup") {
          // Signup handle
          handleSignup(cred, req, res);
        } else {
          throw new Error("Invalid action");
        }
      } else {
        res.status(400).json({ status: 400, message: "Invalid request" });
      }
    });
}

// Export the formVerification function as a module
module.exports = formVerification;
