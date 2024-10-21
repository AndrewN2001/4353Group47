const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userCredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String, required: true
    }
});

// Before saving, encrypt the password
userCredentialsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('UserCredentials', userCredentialsSchema);
