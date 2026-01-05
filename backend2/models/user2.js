const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Personal Info
    name: { type: String },
    username: { type: String },
    email: { type: String, required: true },
    address: { type: String },
    invester_id: { type: String, unique: true, sparse: true },
    password: { type: String },
    
    // Investment Info
    investment_type: { type: String }, // SIP, FD, etc.
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    duration: { type: Number },
    return_rate: { type: Number },
    month: { type: Number },
    
    // Specific Amounts
    fd_amount: { type: Number, default: 0 },
    mutual_amount: { type: Number, default: 0 },
    retirement_amount: { type: Number, default: 0 },
    fixed_deposit_amount: { type: Number, default: 0 },
    fund_management_amount: { type: Number, default: 0 },

    // Admin Panel Custom Fields
    current_amount: { type: Number, default: 0 },
    profit_value: { type: Number, default: 0 },

    // KYC Info
    contact: { type: String, unique: true, sparse: true },
    pan: { type: String },
    aadhar: { type: String },

    // Investment Start Date
    start_date: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);