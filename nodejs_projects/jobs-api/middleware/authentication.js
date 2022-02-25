const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {

    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Invalid token");
    }
    const authToken = authHeaders.split(' ')[1];

    try {
        const payload = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.name };
        next()
    }
    catch (error) {
        console.log(error)
        throw new UnauthenticatedError("Invalid token");
    }

}

module.exports = auth;