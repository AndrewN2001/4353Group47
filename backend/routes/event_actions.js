const express = require('express')
const router = express.Router();
const eventController = require('../controllers/event_controller');

router.post('/createevent', eventController.createEvent);
router.get('/getallevents', eventController.getAllEvents);
router.delete('/deleteevent/:eventId', eventController.deleteEvent);
router.put('/updateevent/:eventId', eventController.updateEvent);
router.get('/eventsattending/:userId', eventController.getEvents);
router.post('/eventapply/:userId', eventController.EventSignUp);
router.delete('/withdrawEvent/:userId/:eventId', eventController.eventWithdraw);

module.exports = router;