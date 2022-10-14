const jwt = require('jsonwebtoken');
const SECRET = 'agenda@app';

const checkAuth = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "Not Authorized"
        });
    }
    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                error: "Not Authorized"
            })
        }

        req.user = user;
        next()
    })
}

module.exports = { checkAuth }