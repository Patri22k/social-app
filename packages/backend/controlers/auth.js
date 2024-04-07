const { getUser, saveUser } = require("../datasource/relational");
const { createHash, randomBytes } = require("crypto");
const { sign, verify } = require("jsonwebtoken");

const secret = randomBytes(32).toString("hex");

const hashPwd = (pwd) => {
    return createHash("md5").update(pwd).digest("hex");
};

const encodeJwt = ({ id, name }) => {
    return sign({ id, name }, secret, { expiresIn: "1h" });
};

const decodeJwt = (jwt) => {
    try {
        return verify(jwt, secret);
    } catch (e) {
        return null;
    }
};

const handleLogin = ({ usr, pwd }, req, res) => {
    getUser(usr, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: "Database is offline" });
        }
        
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        } else if (user.credentials.hash !== hashPwd(pwd)) {
            return res.status(401).json({ status: 401, message: "Invalid password" });
        } else {
            return res.status(200).json({ status: 200, jwt: encodeJwt(user), user: { id: user.id, name: user.name } });
        }
    }, true);
};

const handleSignup = ({ usr, pwd }, req, res) => {
    getUser(usr, (user) => {
        if (user) {
            res.status(409).json({ status: 409, message: "User does exist." });
            return;
        }
        saveUser({
            name: usr,
            credentials: { create: { hash: hashPwd(pwd) } }
        }, ({ id, name }) => {
            res.status(200).json({ status: 200, jwt: encodeJwt({ id, name }), user: { id, name } });
        });
    });
};

module.exports = { handleLogin, handleSignup, decodeJwt };
