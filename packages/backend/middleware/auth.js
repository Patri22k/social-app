// Import the decodeJwt function from the auth controller
const { decodeJwt } = require("../controlers/auth");

// Define a middleware function for JWT authentication
const jwtMW = (req, res, next) => {
    // If the request doesn't have an Authorization header, return a 401 Unauthorized response
    if (!req.headers.authorization) {
        res.status(401).json({ status: 401, message: "Unauthorized" });
        return;
    }
    try {
        // Try to decode the JWT from the Authorization header
        // The JWT should be in the format "Bearer <token>", so we split on " " and take the second part
        req.user = decodeJwt(req.headers.authorization.split(" ")[1]);
        // If the JWT was successfully decoded, call the next middleware function
        // If not, return a 401 Unauthorized response with a message indicating that the token is invalid
        if (req.user) {
            next();
        } else {
            res.status(401).json({ status: 401, message: 'Invalid token' });
        }
    } catch (e) {
        // If an error occurred while trying to decode the JWT, return a 401 Unauthorized response
        res.status(401).json({ status: 401, message: "Unauthorized" });
    }
};

// Export the jwtMW middleware function
module.exports = { jwtMW };
