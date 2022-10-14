const { Contact } = require('./../../models');


const index = async (req, res) => {

    try {

        const contacts = await Contact.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.status(200).json(contacts);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const store = async (req, res) => {

    const { icon, name, phone, type, } = req.body;
    const user_id = req.user.id;

    const new_contact = {
        icon,
        name,
        phone,
        type,
        userId: user_id
    }

    try {
        const contact = await Contact.create(new_contact);
        return res.status(200).json(contact);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const show = async (req, res) => {

    const { id } = req.params;

    try {

        const contact = await Contact.findOne({
            include: ['User'],

            where: {

                id,
                userId: req.user.id
            }

        })
        if (!contact) {

            return res.status(404).json({ error: "Not Found" });
        }

        return res.json(contact);

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" });
    }

}

const update = async (req, res) => {

    const { id } = req.params;
    const { icon, name, email, phone, type } = req.body;

    // console.log(contact);
    // return;
    const contact = await Contact.findOne({
        where: {
            id,
            userId: req.user.id
        }

    });

    try {

        if (!contact) {

            return res.status(404).json({ error: "Not Found" });

        } else {

            const updated_user = await Contact.update({ icon, name, email, phone, type }, { where: { id } });

            return res.json(true);
        }

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" });
    }
}

const destroy = async (req, res) => {

    const { id } = req.params;

    try {

        const contact = await Contact.destroy({ where: { id, userId: req.user.id } });

        if (!contact) {

            return res.status(404).json({ error: "Not Found" });
        } else {

            return res.status(201).json({ message: "Deleted" });
        }

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" });

    }
}

module.exports = { index, store, show, update, destroy };