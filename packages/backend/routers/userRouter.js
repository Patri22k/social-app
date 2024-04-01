const express = require('express');
const router = express.Router();
const { jwtMW } = require('../middleware/auth');
const { getUser } = require("../datasource/relational");

router.get('/user/@me', jwtMW, (req, res) => {
    getUser(req.user.name, (user) => {
        if (user) {
            res.status(200).json({ status: 200, user });
        } else {
            res.status(404).json({ status: 404, message: 'User not found in database' });
        }
    });
});

module.exports = router;
