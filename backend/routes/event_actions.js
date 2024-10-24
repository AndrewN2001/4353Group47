const express = require('express')
const router = express.Router();
const eventController = require('../controllers/event_controller');

router.post('/createevent', eventController.createEvent);
router.get('/getallevents', eventController.getAllEvents);

module.exports = router;