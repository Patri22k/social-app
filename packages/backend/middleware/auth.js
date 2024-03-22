const { decodeJwt } = require("../controlers/auth");

const jwtMW = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ status: 401, message: "Unauthorized" });
        return;
    }
    try {
        req.user = decodeJwt(req.headers.authorization.replace(" ")[1]);
        next();
    } catch (e) {
        res.status(401).json({ status: 401, message: "Unauthorized" });
    }
};

module.exports = { jwtMW };