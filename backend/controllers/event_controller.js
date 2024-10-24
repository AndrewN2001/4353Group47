const eventModel = require('../models/event')

const sampleEvents = {
    event1: {
        eventName: "Animal Shelter",
        eventDescription: "asdlknasdklnasd",
        location: {
            city: "Houston",
            state: "TX"
        },
        requiredSkills: ["Test", "Test2", "Test3"],
        urgency: "low",
        startDate: '2024-10-15T09:00:00',
        endDate: '2024-10-15T12:00:00'
    },
    event2: {
        eventName: "Community Clean Up",
        eventDescription: "Join us for a community cleanup day!",
        location: {
            city: "Houston",
            state: "TX"
        },
        requiredSkills: ['cleaning', 'organization'],
        urgency: "medium",
        startDate: '2024-10-15T09:00:00',
        endDate: '2024-10-15T12:00:00'
    }
}

const createEvent = async (req, res) => {
    try{
        const testForm = req.body;
        res.json(testForm)
    } catch (error){
        console.error(error);
        res.status(500).json({
            message: "Server Error",
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

const deleteEvent = async(req, res) => {
    try{
        res.json(req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

const updateEvent = async(req, res) => {
    try{
        res.json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEvent,
    sampleEvents
}