const eventModel = require('../models/event')
const userModel = require('../models/user')

const combineDateTime = (date, time) => {
    return new Date(`${date}T${time}:00`);
}

// const sampleEvents = {
//     event1: {
//         eventName: "Animal Shelter",
//         eventDescription: "asdlknasdklnasd",
//         location: {
//             city: "Houston",
//             state: "TX"
//         },
//         requiredSkills: ["Test", "Test2", "Test3"],
//         urgency: "low",
//         startDate: '2024-10-15T09:00:00',
//         endDate: '2024-10-15T12:00:00'
//     },
//     event2: {
//         eventName: "Community Clean Up",
//         eventDescription: "Join us for a community cleanup day!",
//         location: {
//             city: "Houston",
//             state: "TX"
//         },
//         requiredSkills: ['cleaning', 'organization'],
//         urgency: "medium",
//         startDate: '2024-10-15T09:00:00',
//         endDate: '2024-10-15T12:00:00'
//     }
// }

const createEvent = async (req, res) => {
    try{
        const testForm = req.body.eventData;
        const [loggedCity, loggedState] = testForm.location.split(', '). map(item => item.trim());
        const newEvent = new eventModel({
            eventName: testForm.eventName,
            eventDescription: testForm.eventDescription,
            location: {
                city: loggedCity,
                state: loggedState
            },
            requiredSkills: testForm.requiredSkills,
            urgency: testForm.urgency,
            startDate: combineDateTime(testForm.startDate, testForm.startTime),
            endDate: combineDateTime(testForm.endDate, testForm.endTime)
        })
        await newEvent.validate();
        const saveEvent = await newEvent.save();
        console.log(newEvent);
        res.json(newEvent);
    } catch (error){
        console.error("Validation error:", error.message);
        res.status(500).json({
            message: error.message || "Server Error",
        })
    }
}

const getAllEvents = async (req, res) => {
    try{
        const testForm = req.body;
        const events = await eventModel.find();
        res.json(events)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const deletedEvent = await eventModel.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully", deletedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateEvent = async(req, res) => {
    try{
        res.json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

const getEvents = async (req, res) => { // would get every event that the user signed up for
    try {
        const { userId }  = req.params;
        const user = await userModel.findById(userId, 'attendedEvents').populate('attendedEvents');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json(user.attendedEvents);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            message: "Server Error",
        })
    }
}

const EventSignUp = async (req, res) => { // called when user signs up for specific event and adds it to their appliedEvents field
    try {
        const {userId} = req.params;
        const eventID = req.body._id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Message not found."});
        }

        if (!user.attendedEvents.includes(eventID)){
            user.attendedEvents.push(eventID);
            await user.save();
        }

        res.status(200).json({
            message: "Event added to user successfully", userId, eventID
        })
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            message: "Server Error",
        })
    }
}

const eventWithdraw = async (req, res) => {
    try{
        const {userId, eventId} = req.params;
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $pull: {
                attendedEvents: eventId
            }},
            { new : true }
        );
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({message: "Event successfully removed from the user."});
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    combineDateTime,
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    getEvents,
    EventSignUp,
    eventWithdraw
    // sampleEvents
}