const request = require('supertest'); // Import supertest for making requests
const express = require('express');
const router = require('../routes/event_actions'); // Update with the correct path
const eventController = require('../controllers/event_controller'); // Update with the correct path

// Mock the createEvent function
jest.mock('../controllers/event_controller');

describe('POST /createevent', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json()); // Add middleware to parse JSON request bodies
        app.use('/api', router); // Use the router you want to test, prefix it with `/api` if necessary
    });

    beforeEach(() => {
        // Clear all mocks before each test to prevent test interference
        jest.clearAllMocks();
    });

    it('should call createEvent controller function when POST /createevent is hit', async () => {
        // Mock the createEvent function to return a successful response
        eventController.createEvent.mockImplementation((req, res) => {
            res.status(201).json({ message: 'Event created successfully' });
        });

        // Define the event data to be sent in the POST request
        const newEvent = {
            eventName: 'New Event',
            eventDate: '2024-10-18',
            location: 'Houston, Texas'
        };

        // Use supertest to simulate the POST request
        const response = await request(app)
            .post('/api/createevent')
            .send(newEvent)
            .expect(201); // Assert that we expect a 201 status

        // Ensure the mock function was called
        expect(eventController.createEvent).toHaveBeenCalledTimes(1);

        // Assert the response structure
        expect(response.body).toEqual({ message: 'Event created successfully' });
    });

    it('should handle errors in the controller and return a 500 status', async () => {
        // Mock createEvent to simulate an error
        eventController.createEvent.mockImplementation((req, res) => {
            res.status(500).json({ message: 'Server Error' });
        });

        // Send a POST request without any data
        const response = await request(app)
            .post('/api/createevent')
            .send({})
            .expect(500); // Expect a 500 status code

        // Ensure the mock function was called
        expect(eventController.createEvent).toHaveBeenCalledTimes(1);

        // Assert the response structure
        expect(response.body).toEqual({ message: 'Server Error' });
    });
});
