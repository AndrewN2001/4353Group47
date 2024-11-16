const userModel = require("../models/user")
const eventModel = require('../models/event')
const bcrypt = require('bcrypt')
const PDF = require('pdfkit');
const fs = require('fs');
const createCSV = require('csv-writer').createObjectCsvWriter;
const { events, volunteers } = require('../global_arrays/data');

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body.credentials.accountInfo;
        const searchUser = await userModel.findOne({ 'emailAddress': email })
        if (searchUser) {
            const valid = await bcrypt.compare(password, searchUser.password);
            if (valid) {
                res.json(searchUser);
            } else {
                res.status(400).json({ message: "Invalid password." })
            }
        } else {
            res.status(401).json({ message: "User not found." })
        }
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
        const existingUser = await userModel.findOne({ 'accountInfo.emailAddress': newUserData.emailAddress })
        if (existingUser) {
            return res.status(409).json({ message: "Account already exists!" });
        }
        const hashedPassword = await bcrypt.hash(newUserData.password, 10);
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
            password: hashedPassword
        });
        await newUser.validate()
        const saveUser = await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.error("Error saving user:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userID = req.params.userID;
        const userProfile = await userModel.findById(userID);
        if (!userProfile) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getNotifications = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await userModel.findById(userID, 'notifications')
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user.notifications);
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }

}

const handleNotifications = async (req, res) => { // edits notification settings for user
    try {
        const { userID } = req.params; // email will need to be passed through the route
        const { newEventAssignments, newEventUpdates, newEventReminders } = req.body.notifications;

        const newNotifications = {
            newEventAssignments: newEventAssignments,
            newEventUpdates: newEventUpdates,
            newEventReminders: newEventReminders
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            { $set: { ["notifications"]: newNotifications } },
            { new: true } //by default, findByIdAndUpdate returns the document before it's updated. This ensures that mongoose returns the document after it's updated
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser.notifications);
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const addSkill = async (req, res) => {
    const { userID } = req.params;
    const { newSkill } = req.body;

    try {
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }
        if (!user.skills.includes(newSkill)) {
            user.skills.push(newSkill);
        }
        await user.save();
        res.status(200).json(user.skills);
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const removeSkill = async (req, res) => {
    try {
        const { userID, skill } = req.params;
        const user = await userModel.findByIdAndUpdate(
            userID,
            { $pull: { skills: skill } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "Skill removed", user });
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getVolunteerHistory = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await userModel.findById(userID).populate("attendedEvents");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user.attendedEvents);
    } catch (error) {
        console.error("Error fetching volunteer history:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const handleMatching = async (req, res) => {
    try {
        const events = await eventModel.find();
        const volunteers = await userModel.find();

        let matches = [];

        const getDayOfWeek = (date) => {
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return days[date.getUTCDay()];
        };

        volunteers.forEach(volunteer => {
            if (volunteer.role === "Volunteer") {
                let volunteerMatches = {
                    volunteerName: {
                        firstName: volunteer.name.firstName,
                        lastName: volunteer.name.lastName
                    },
                    matchedEvents: []
                };
                events.forEach(event => {
                    const eventDay = getDayOfWeek(event.startDate);

                    const hours = event.startDate.getUTCHours().toString().padStart(2, '0');
                    const minutes = event.startDate.getUTCMinutes().toString().padStart(2, '0');
                    const eventStartTime = `${hours}:${minutes}`;

                    if (volunteer.location.city === event.location.city &&
                        volunteer.availability[eventDay] &&
                        volunteer.availability[eventDay].start <= eventStartTime &&
                        volunteer.availability[eventDay].end > eventStartTime) {

                        const hasSkills = event.requiredSkills.every(skill =>
                            volunteer.skills.includes(skill)
                        );

                        if (hasSkills) {
                            volunteerMatches.matchedEvents.push(event.eventName);
                        }
                    }
                });
                matches.push(volunteerMatches);
            }
        });
        res.json(matches);

    } catch (error) {
        console.error("Error fetching volunteer matching:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getData = async (req, res) => { // gets all available events and volunteers
    try {
        const events = await eventModel.find();
        const volunteers = await userModel.find();
        res.json({ events, volunteers });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const editUserInfo = async (req, res) => {
    try {
        const { userID } = req.params;
        const { newValues } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const editAvailability = async (req, res) => {
    try {
        const { userID } = req.params;
        const { key, start, end } = req.body.dayData;
        const newAvailability = {
            start: start,
            end: end
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            { $set: { [`availability.${key}`]: newAvailability } },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

const volunteerReporting = async (req, res) => {
    try {
        const reportData = await userModel.find({ role: "Volunteer" }).populate("attendedEvents");

        const csvWriter = createCSV({
            path: 'volunteer_report.csv',
            header: [
                { id: 'first_name', title: 'First Name' },
                { id: 'last_name', title: 'Last Name' },
                { id: 'email', title: 'Email' },
                { id: 'phoneNumber', title: 'Phone Number' },
                { id: 'events', title: 'Attended Events' }
            ]
        });

        const csvData = reportData.map(volunteer => ({
            first_name: volunteer.name.firstName,
            last_name: volunteer.name.lastName,
            email: volunteer.email,
            phoneNumber: volunteer.phoneNumber,
            events: volunteer.attendedEvents.map(e => {
                const location = `${e.location.city}, ${e.location.state}`;
                const eventStartTime = e.startDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                return `${e.eventName} (${eventStartTime}) at ${location}`;
            }).join('; ')

        }));
        console.log(csvData);
        await csvWriter.writeRecords(csvData);
      
        res.json({ message: "Report generated successfully!", files: { csv: 'volunteer_report.csv'}});

        // const pdfPath = 'volunteer_report.pdf';
        // const doc = new PDF();
        // doc.pipe(fs.createWriteStream(pdfPath));
        // doc.fontSize(20).text('Volunteer Report', { align: 'center' });
        // doc.moveDown();
        // reportData.forEach(vol => {
        //     doc.fontSize(16).text(`Name: ${vol.name}`);
        //     doc.fontSize(12).text(`Email: ${vol.email}`);
        //     doc.text(`Phone: ${vol.phoneNumber}`);
        //     doc.text('Events Attended:');
        //     vol.attendedEvents.forEach(event => {
        //         doc.text(`  - ${event.eventName} (${event.eventDate}) at ${event.eventLocation}`);
        //     });
        //     doc.moveDown();
        // });
        // doc.end();

        // res.json({ message: "Report generated successfully!", files: { csv: '/path/to/volunteer_report.csv', pdf: '/path/to/volunteer_report.pdf' } });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    handleLogin,
    handleRegister,
    getUserProfile,
    getNotifications,
    handleNotifications,
    getVolunteerHistory,
    handleMatching,
    getData,
    addSkill,
    removeSkill,
    editUserInfo,
    editAvailability,
    volunteerReporting
}