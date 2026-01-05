const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserLogin = require("../models/user");
const User = require("../models/user2");

// signUp controller used by router
const signUp = async (req, res) => {
  try {

    // Accept 'name' and 'invester_id' from frontend
    const { name, invester_id, email, password } = req.body;

    if (!name || !invester_id || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserLogin.findOne({ invester_id });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserLogin({
      name,
      invester_id,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, invester_id: newUser.invester_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", access: token, user: { id: newUser._id, name: newUser.name, invester_id: newUser.invester_id } });
  } catch (err) {
    console.error("[authController.signUp] error:", err);
    // Handle duplicate key (unique email) from Mongo
    if (err.code === 11000) {
      return res.status(409).json({ message: "User already exists", error: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { invester_id, password } = req.body;
    if (!invester_id || !password) {
      return res.status(400).json({ message: "Invester ID and password required" });
    }

    // Try UserLogin (hashed password)
    let user = await UserLogin.findOne({ invester_id });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user._id, invester_id: user.invester_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ message: "Login successful", access: token, user: { id: user._id, name: user.name, invester_id: user.invester_id } });
    }

    // Try User (plain password)
    user = await User.findOne({ invester_id });
    if (user) {
      if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user._id, invester_id: user.invester_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ message: "Login successful", access: token, user: { id: user._id, name: user.name, invester_id: user.invester_id } });
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await UserLogin.findById(decoded.id).select('-password');
    if (!user) {
      // Try User collection if not found in UserLogin
      const User = require('../models/user2');
      user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }
    // Return all user fields except password
    const userObj = user.toObject ? user.toObject() : user;
    if (userObj.password) delete userObj.password;
    res.json({ user: userObj });
  } catch (err) {
    console.error('[authController.me] error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { signUp, login, me };
