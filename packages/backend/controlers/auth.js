// Import the 'getUser' and 'saveUser' functions from the '../datasource/relational' module.
// These functions are used to interact with a relational database.
const { getUser, saveUser } = require("../datasource/relational");

// Import the 'createHash' and 'randomBytes' functions from the 'crypto' module.
// These functions are used for cryptographic operations.
const { createHash, randomBytes } = require("crypto");

// Import the 'sign' and 'verify' functions from the 'jsonwebtoken' module.
// 'sign' is used to create JSON Web Tokens (JWTs), and 'verify' is used to verify the signature of a JWT and decode it.
const { sign, verify } = require("jsonwebtoken");

// Generate a 32-byte random value and convert it to a hexadecimal string.
// This value is used as the secret key for signing and verifying JWTs.
const secret = randomBytes(32).toString("hex");

// Define a function 'hashPwd' that takes a password and returns its MD5 hash.
// Note: MD5 is not secure for password storage and should not be used in a production environment.
const hashPwd = (pwd) => {
    return createHash("md5").update(pwd).digest("hex");
};

// Define a function 'encodeJwt' that takes an object with 'id' and 'name' properties and returns a JWT.
// The JWT is signed with the secret key and expires in 1 hour.
const encodeJwt = ({ id, name }) => {
    return sign({ id, name }, secret, { expiresIn: "1h" });
};

// Define a function 'decodeJwt' that takes a JWT and returns the decoded payload.
// If the JWT is invalid, the function returns null.
function decodeJwt(jwt) {
    try {
        return verify(jwt, secret);
    } catch (e) {
        return null;
    }
}

// Define a function 'handleLogin' that takes a username and password, and a request and response object.
// The function checks if the user exists in the database and if the password is correct.
/**
 * Handles the login process.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.usr - The username.
 * @param {string} credentials.pwd - The password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the appropriate status and message.
 */
const handleLogin = ({ usr, pwd }, req, res) => {
    getUser(usr, (err, user) => {
        // If there's an error (e.g., the database is offline), log the error and return a 500 status code.
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: "Database is offline" });
        }
        
        // If the user doesn't exist, return a 404 status code.
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        // If the hashed password doesn't match the user's hashed password, return a 401 status code.
        else if (user.credentials.hash !== hashPwd(pwd)) {
            return res.status(401).json({ status: 401, message: "Invalid password" });
        }
        // If the user exists and the password is correct, return a 200 status code and a JWT.
        else {
            return res.status(200).json({ status: 200, jwt: encodeJwt(user), user: { id: user.id, name: user.name } });
        }
    }, true);
};

// Define a function 'handleSignup' that takes a username and password, and a request and response object.
// The function checks if the user already exists in the database and saves the user if not.
/**
 * Handles the signup process.
 *
 * @param {Object} credentials - The user's signup credentials.
 * @param {string} credentials.usr - The username.
 * @param {string} credentials.pwd - The password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the appropriate status and message.
 */
const handleSignup = ({ usr, pwd }, req, res) => {
    getUser(usr, (user) => {
        // If the user already exists, return a 409 Conflict response.
        if (user) {
            res.status(409).json({ status: 409, message: "User does exist." });
            return;
        }
        // When a new user is saved, their password is hashed and they are returned a JWT.
        saveUser({
            name: usr,
            credentials: { create: { hash: hashPwd(pwd) } }
        }, ({ id, name }) => {
            res.status(200).json({ status: 200, jwt: encodeJwt({ id, name }), user: { id, name } });
        });
    });
};

export { handleLogin, handleSignup, decodeJwt };
