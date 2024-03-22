const express = require('express');
const router = express.Router();
const { getUser } = require("../datasource/relational");

router.get('/user/@me', (req, res) => {
    res.status(200).json({ status: 200, user: getUser(req.user.name) });
});

module.exports = router;