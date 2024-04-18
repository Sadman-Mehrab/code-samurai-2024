const User = require('../models/userModel');
const mongoose = require('mongoose');


const createUser = async (req, res) => {

    const { user_id, user_name, balance } = req.body;
    try {
        const user = await User.create({ user_id, user_name, balance });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { createUser }