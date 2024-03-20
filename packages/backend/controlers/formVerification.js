// Import the yup library for schema validation
const yup = require('yup');

// Import the validation schema from the shared module
const { schema } = require('@socialapp-clone/shared/validationSchema');

/**
 * Middleware function for form validation.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 */
const formVerification = (req, res) => {
  // Extract the data from the request body
  const data = req.body;

  // Validate the data against the schema
  schema
    .validate(data)
    .catch(err => {
      // If validation fails, send a 422 status code and the validation error messages
      res.status(422).json({ message: err.errors });
      console.log(err.errors);
    })
    .then(valid => {
      // If validation succeeds, send a 200 status code and a success message
      if (valid) {
        const status = 200;
        const message = "Form is valid!";
        res.status(200).json({ status, message });
        console.log("Form is valid!");
      }
    });
}

// Export the formVerification function as a module
module.exports = formVerification;