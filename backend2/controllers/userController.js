const User = require('../models/user2');

// 1. Get All Users
const getAllUsers = async (req, res) => {
    try {
        // support optional search query param (q or search) to filter by name/email/username/contact
        const q = (req.query.q || req.query.search || '').toString().trim();
        let filter = {};
        if (q) {
            const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            filter = { $or: [ { name: re }, { username: re }, { email: re }, { contact: re } ] };
        }
        const users = await User.find(filter).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. Create User (Register)
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        // Handle duplicate key (unique index) errors
        if (err && err.code === 11000) {
            const dupKey = Object.keys(err.keyValue || {})[0] || 'field';
            return res.status(400).json({ message: `${dupKey} already exists`, field: dupKey });
        }
        res.status(500).json({ message: err.message });
    }
};

// 3. Update User (Edit)
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return updated document
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err && err.code === 11000) {
            const dupKey = Object.keys(err.keyValue || {})[0] || 'field';
            return res.status(400).json({ message: `${dupKey} already exists`, field: dupKey });
        }
        res.status(500).json({ message: err.message });
    }
};

// 4. Delete User (Optional)
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };