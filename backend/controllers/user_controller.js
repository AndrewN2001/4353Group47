const userModel = require("../models/user")
const bcrypt = require('bcrypt')
const { events, volunteers } = require('../global_arrays/data');

const handleLogin = async (req, res) => {
    try {
        // const { email, password } = req.body.credentials.accountInfo;
        // const searchUser = await userModel.findOne({ 'accountInfo.email': email })
        // if (searchUser) {
            // const valid = await bcrypt.compare(password, searchUser.accountInfo.password);
            // if (valid){
            //     res.json({
            //         message: "login successful!",
            //         username: searchUser.accountInfo.username,
            //     })
            // } else{
            //     res.status(401).json({message: "Invalid password."})
            // }
            // if (password !== searchUser.accountInfo.password) {
            //     res.status(401).json({ message: "Invalid password." })
            // } else {
            //     res.json({
            //         message: "login successful!",
            //         accountInfo: searchUser.accountInfo,
            //     })
            // }
        res.json(req.body);
        // } else {
        //     res.status(401).json({ message: "User not found." })
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        const newUserData = req.body.accountForm;
        // res.json(newUserData.accountForm);
        const existingUser = await userModel.findOne({ 'accountInfo.emailAddress': newUserData.emailAddress })
        if (existingUser) {
            return res.status(409).json({
                message: "Account already exists!"
            })
        }
        const newUser = new userModel({
            name: {
                firstName: newUserData.name.firstName,
                lastName: newUserData.name.lastName
            },
            location: {
                city: newUserData.location.city,
                state: newUserData.location.state
            },
            phoneNumber: newUserData.phoneNumber,
            emailAddress: newUserData.emailAddress,
            password: newUserData.password
        });
        // const saveUser = await newUser.save();
        res.json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Account already exists!" })
        } else {
            console.error("Error saving user:", error)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

const getUserProfile = async (req, res) => {
    try {
        // For now, use a hardcoded user profile (replace with MongoDB query later)
        const userId = req.params.userId; // userId for when needed by DB later
        
        // Respond with the hardcoded user profile
        res.json(volunteers[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const handleNotifications = async (req, res) => {
    try {
        const { userID } = req.params; // email will need to be passed through the route
        const { newEventAssignments, newEventUpdates, newEventReminders } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            {
                notifications: {
                    newEventAssignments,
                    newEventUpdates,
                    newEventReminders
                }
            },
            {
                new: true //by default, findByIdAndUpdate returns the document before it's updated. This ensures that mongoose returns the document after it's updated
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Notification settings updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Something went wrong", error);
    }
}

const getVolunteerHistory = async (req, res) => {
    try {
        // Hardcoded sample volunteer history data
        const userId = req.params.userId;
        const volunteerHistory = [
            {
                eventName: "Community Cleanup",
                eventDescription: "A day to clean up the local park.",
                location: "Central Park",
                requiredSkills: "Physical endurance",
                urgency: "High",
                eventDate: "8-18-2024"
            },
            {
                eventName: "Food Drive",
                eventDescription: "Collecting food for the local food bank.",
                location: "City Hall",
                requiredSkills: "Organizational skills",
                urgency: "Medium",
                eventDate: "7-6-2024"
            },
            {
                eventName: "Community Garden Planting",
                eventDescription: "Help plant and maintain the community garden to promote green spaces in the neighborhood.",
                location: "Greenway Community Garden",
                requiredSkills: "Gardening knowledge, teamwork",
                urgency: "Low",
                eventDate: "6-15-2024"
            }
        ];

        // Respond with the hardcoded volunteer history
        res.json(volunteerHistory);
    } catch (error) {
        console.error("Error fetching volunteer history:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    handleLogin,
    handleRegister,
    getUserProfile,
    handleNotifications,
    getVolunteerHistory
}