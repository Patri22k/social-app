const express = require('express');
const router = express.Router();
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

router.post('/login', (req, res) => {
    const data = req.body;
    schema
    .validate(data)
    .catch(err => {
        console.log(err.errors);
    })
    .then(valid => {
        if (valid) {
            console.log("Form is valid!");
        }
    });
});

module.exports = router;