const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        }, 
        lastName: {
            type: String,
            required: true
        }
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        required: true,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Simple phone validation
    }, 
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Email validation
    },
    password: {
        type: String,
        required: true,
    },
    notifications: {
        newEventAssignments:{
            type: Boolean,
            default: true
        },
        newEventUpdates:{
            type: Boolean,
            default: true
        },
        newEventReminders:{
            type: Boolean,
            default: true
        }
    }
})

module.exports = mongoose.model("users", userSchema);