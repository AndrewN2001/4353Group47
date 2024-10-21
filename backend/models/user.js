const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    start: {
        type: String,
        default: "N/A",
    },
    end: {
        type: String,
        default: "N/A",
    }
})

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
    imageUrl: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Simple phone validation
    }, 
    skills:{
        type: [String],
        default: []
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
    },
    attendedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    availability: {
        monday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        tuesday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        wednesday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        thursday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        friday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        saturday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
        sunday: {
            type: availabilitySchema,
            default: {
                start: "N/A",
                end: "N/A"
            }
        },
    }
})

module.exports = mongoose.model("users", userSchema);