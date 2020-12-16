const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token  || req.headers['x-access-token'] || req.headers['x-auth-token'] || req.headers['token']
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({ error: "Acesso negado.", message: 'Invalid token' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        console.log('Error 403: Access Denied - No token provided')
        return res.status(403).send({
            error: 'Unauthorized access.',
            message: 'No token provided.'
        });
    }
}