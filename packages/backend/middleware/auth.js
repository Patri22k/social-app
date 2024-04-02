const { decodeJwt } = require("../controlers/auth");

const jwtMW = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ status: 401, message: "Unauthorized" });
        return;
    }
    try {
        req.user = decodeJwt(req.headers.authorization.split(" ")[1]);
        if (req.user) {
            next();
        } else {
            res.status(401).json({ status: 401, message: 'Invalid token' });
        }
    } catch (e) {
        if (e.message === 'Failed to decode JWT') {
            res.status(503).json({ status: 503, message: 'Service Unavailable'});
        } else {
            res.status(401).json({ status: 401, message: "Unauthorized" });
        }
    }
};

module.exports = { jwtMW };
