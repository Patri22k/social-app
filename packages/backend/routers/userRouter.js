// Import the express module
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the getUser function from the relational data source
const { getUser } = require("../datasource/relational");

// Define a GET route for '/user/@me'
router.get('/user/@me', (req, res) => {
    // Call the getUser function with the username from the request
    // The getUser function takes a callback function as its second argument
    getUser(req.user.name, (user) => {
        // If a user was found, return a 200 OK response with the user data
        if (user) {
            res.status(200).json({ status: 200, user });
        } else {
            // If no user was found, return a 404 Not Found response with a message
            res.status(404).json({ status: 404, message: 'User not found in database' });
        }
    });
});

// Export the router object
module.exports = router;
