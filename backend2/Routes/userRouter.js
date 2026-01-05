const express = require('express');
const router = express.Router();
// Controller import kar rahe hain
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Routes define karein
router.get('/', getAllUsers);        // GET http://localhost:3002/users/
router.post('/', createUser);        // POST http://localhost:3002/users/
router.patch('/:id', updateUser);    // PATCH http://localhost:3002/users/:id
router.delete('/:id', deleteUser);   // DELETE http://localhost:3002/users/:id

module.exports = router;