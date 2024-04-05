const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token: ', token);

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    try {
        const decoded = decodeJwt(token);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized! Session expired.' });
    }
};

module.exports = checkToken;
