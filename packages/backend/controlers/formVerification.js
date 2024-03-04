const yup = require('yup');

const { schema } = require('@socialapp-clone/shared/validationSchema');

const formVerification = (req, res) => {
  const data = req.body;
  schema
    .validate(data)
    .catch(err => {
      res.status(422).json( { message: err.errors } );
      console.log(err.errors);
    })
    .then(valid => {
      if (valid) {
        const status = 200;
        const message = "Form is valid!";
        res.status(200).json( { status, message } );
        console.log("Form is valid!");
      }
    });
}

module.exports = formVerification;