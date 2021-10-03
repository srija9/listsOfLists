const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('not authorizated.');
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
    decodedToken = jwt.verify(token, procee.env.TOKEN_SECRET);
    }catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('not authorizated');
        err.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId
}