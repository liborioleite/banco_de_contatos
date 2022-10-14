
const { User } = require('./../../models');
// const { Contact } = require('./../../models');
const jwt = require('jsonwebtoken');
const SECRET = 'agenda@app';

const login = async (req, res) => {
    const { phone, password } = req.body;

    const user = await User.findOne({
        where: {
            phone,
            password
        }
    })


    if (!user) {
        return res.status(401).json({ error: "Unauthorized Access" })
    }

    const payload = {
        type: user.type,
        name: user.name,
        phone: user.phone,
        id: user.id
    }

    jwt.sign(payload, SECRET, (err, token) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Ero ao gerar token" });
        }

        return res.json({
            payload,
            token
        })
    })
}

const register = async (req, res) => {
    const { name, phone, password } = req.body;

    const has_phone = await User.findOne({
        where: { phone }
    })

    if (has_phone) {
        return res.status(401).json({ error: "Phone Alredy exists!" });
    }
    const new_user = {
        type: 'guest',
        name,
        phone,
        password
    };

    const new_register = await User.create(new_user);

    return res.status(200).json({ message: "Registered" });
}

module.exports = { login, register };