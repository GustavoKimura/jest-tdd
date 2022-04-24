const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({message: 'Token not provided'});
    }

    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, process.env.APP_SECRET);

        return next();
    } catch (error) {
        return response.status(401).json({message: 'Token invalid'});
    }
}