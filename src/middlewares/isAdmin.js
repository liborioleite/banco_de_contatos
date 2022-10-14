
const isAdmin = (req, res, next) => {
    const {type} = req.user;

    if (type && type === 'admin') {
       next(); 
    }else {
        return res.status(403).json({error: "not enough privileges"});
    }
}

module.exports = {isAdmin};