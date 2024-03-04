const yup = require('yup');

const schema = yup.object().shape({
  username: yup.string()
    .required("Username required!")
    .min(6, "Username is too short!")
    .max(20, "Username is too long!"),
  password: yup.string()
    .required("Password required!")
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});

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