
const { response } = require('express');
// ...rest of the initial code omitted for simplicity.
//const { body, validationResult } = require('express-validator');

const { User } = require('./../../models');


const index = async (req, res) => {


    try {

        const users = await User.findAll();

        return res.status(200).json(users);

    } catch (error) {

        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const store = async (req, res) => {

    try {

        const { name, phone, password } = req.body;

        const new_user = {
            name,
            phone,
            password
        }

        const user = await User.create(new_user);

        return res.status(200).json(user);

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" });
    }
}

const update = async (req, res) => {

    const { id } = req.params;
    const { name, phone, password } = req.body;

    const user = await User.findOne({ where: { id } });


    try {

        const updated_user = await User.update({ name, phone, password }, { where: { id } })
        return res.status(200).json({ message: "Line executed successfully - User Updated!" })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    // const {name, phone, password} = req.body
    const user = await User.findOne({
        include: ['Contacts'],
        where: {
            id
        }
    });
    return res.json(user);
}

const destroy = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    User.destroy({ where: { id } })
    return res.status(204).json(true);
}

const profile = async (req, res) => {
    const { id } = req.user;

    const user = await User.findOne({
        where: {
            id
        }
    })

    return res.json(user);

}

module.exports = { index, store, update, show, destroy, profile };