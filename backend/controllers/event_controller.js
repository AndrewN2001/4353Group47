const eventModel = require('../models/event')
const userModel = require('../models/user')
const PDF = require('pdfkit');
const fs = require('fs');
const createCSV = require('csv-writer').createObjectCsvWriter;

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
    try {
        const testForm = req.body.eventData;
        const [loggedCity, loggedState] = testForm.location.split(', ').map(item => item.trim());
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
    } catch (error) {
        console.error("Validation error:", error.message);
        res.status(500).json({
            message: error.message || "Server Error",
        })
    }
}

const getAllEvents = async (req, res) => {
    try {
        const testForm = req.body;
        const events = await eventModel.find();
        res.json(events)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
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

const updateEvent = async (req, res) => {
    try {
        res.json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

const getEvents = async (req, res) => { // would get every event that the user signed up for
    try {
        const { userId } = req.params;
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
        const { userId } = req.params;
        const eventID = req.body._id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Message not found." });
        }

        if (!user.attendedEvents.includes(eventID)) {
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
    try {
        const { userId, eventId } = req.params;
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    attendedEvents: eventId
                }
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Event successfully removed from the user." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}

const eventsReports = async (req, res) => {
    try {
        const fileType = req.params.fileType;
        const reportData = await eventModel.find().populate("attendees");

        if (fileType === "csv") {
            const csvWriter = createCSV({
                path: 'events_report.csv',
                header: [
                    { id: 'event_name', title: 'Event Name' },
                    { id: 'event_description', title: 'Description' },
                    { id: 'location', title: 'Location' },
                    { id: 'date', title: 'Date' },
                    { id: 'attendees', title: 'Volunteers Asigned' }
                ]
            });

            const csvData = reportData.map(event => ({
                event_name: event.eventName,
                event_description: event.eventDescription,
                location: `${event.location.city}, ${event.location.state}`,
                date:
                    `${event.startDate.getUTCFullYear()}-${(event.startDate.getUTCMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${event.startDate.getUTCDate().toString().padStart(2, '0')} ${event.startDate
                            .getUTCHours()
                            .toString()
                            .padStart(2, '0')}:${event.startDate.getUTCMinutes().toString().padStart(2, '0')}`,
                attendees: event.attendees.map(a => {
                    return `${a.name.firstName} ${a.name.lastName}`;
                }).join(', ')

            }));
            console.log(csvData);
            await csvWriter.writeRecords(csvData);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="events_report.csv"');
            res.sendFile(`${process.cwd()}/events_report.csv`);
        }
        else if (fileType === "pdf") {
            console.log("pdf");
            const pdfPath = 'events_report.pdf';
            const doc = new PDF();
            // doc.pipe(fs.createWriteStream(pdfPath));
            doc.pipe(fs.createWriteStream(pdfPath).on('finish', () => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="events_report.pdf"');
                res.sendFile(`${process.cwd()}/events_report.pdf`);
            }));
            doc.fontSize(20).text('Events Report', { align: 'center' });
            doc.moveDown();
            reportData.forEach(event => {
                doc.fontSize(16).text(`Event Name: ${event.eventName}`);
                doc.fontSize(12).text(`Description: ${event.eventDescription}`);
                doc.text(`Location: ${event.location.city}, ${event.location.state}`);
                doc.text(`Date: ${event.startDate.getUTCFullYear()}-${(event.startDate.getUTCMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${event.startDate.getUTCDate().toString().padStart(2, '0')} ${event.startDate
                        .getUTCHours()
                        .toString()
                        .padStart(2, '0')}:${event.startDate.getUTCMinutes().toString().padStart(2, '0')}`);
                doc.text('Volunteers Assigned:');
                event.attendees.forEach(volunteer => {
                    doc.text(`${volunteer.name.firstName} ${volunteer.name.lastName}`);
                });
                doc.moveDown();
            });
            doc.end();
            // res.setHeader('Content-Type', 'text/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename="events_report.pdf"');
            // res.sendFile(`${process.cwd()}/events_report.pdf`);
        }
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Server Error" });
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
    eventWithdraw,
    eventsReports
    // sampleEvents
}