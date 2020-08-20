const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token  || req.headers['x-access-token'] || req.headers['x-auth-token'] || req.headers['token']
    // decode token
    console.log(token)
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}