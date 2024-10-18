const request = require('supertest');
const express = require('express');
const router = require('../routes/user_actions'); // Update with your actual router path
const userController = require('../controllers/user_controller'); // Update with your actual controller path

// Mock all controller methods
jest.mock('../controllers/user_controller');

describe('User Routes', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api', router); // Use the router you want to test
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call handleLogin when POST /login is hit', async () => {
        userController.handleLogin.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Login successful' });
        });

        const response = await request(app)
            .post('/api/login')
            .send({ username: 'testUser', password: 'password123' })
            .expect(200);

        expect(userController.handleLogin).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ message: 'Login successful' });
    });

    it('should call handleRegister when POST /register is hit', async () => {
        userController.handleRegister.mockImplementation((req, res) => {
            res.status(201).json({ message: 'User registered successfully' });
        });

        const response = await request(app)
            .post('/api/register')
            .send({ username: 'newUser', password: 'password123' })
            .expect(201);

        expect(userController.handleRegister).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ message: 'User registered successfully' });
    });

    it('should call getUserProfile when GET /profile/:userID is hit', async () => {
        userController.getUserProfile.mockImplementation((req, res) => {
            res.status(200).json({ username: 'testUser', userId: req.params.userID });
        });

        const response = await request(app)
            .get('/api/profile/12345')
            .expect(200);

        expect(userController.getUserProfile).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ username: 'testUser', userId: '12345' });
    });

    it('should call handleNotifications when PATCH /notifications/:userID is hit', async () => {
        userController.handleNotifications.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Notifications updated' });
        });

        const response = await request(app)
            .patch('/api/notifications/12345')
            .send({ notifications: [] })
            .expect(200);

        expect(userController.handleNotifications).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ message: 'Notifications updated' });
    });

    it('should call getVolunteerHistory when GET /volunteer-history/:userID is hit', async () => {
        userController.getVolunteerHistory.mockImplementation((req, res) => {
            res.status(200).json({ events: ['event1', 'event2'] });
        });

        const response = await request(app)
            .get('/api/volunteer-history/12345')
            .expect(200);

        expect(userController.getVolunteerHistory).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ events: ['event1', 'event2'] });
    });

    it('should call handleMatching when GET /volunteer-matching is hit', async () => {
        userController.handleMatching.mockImplementation((req, res) => {
            res.status(200).json({ matches: [] });
        });

        const response = await request(app)
            .get('/api/volunteer-matching')
            .expect(200);

        expect(userController.handleMatching).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ matches: [] });
    });

    it('should call getData when GET /data is hit', async () => {
        userController.getData.mockImplementation((req, res) => {
            res.status(200).json({ data: [] });
        });

        const response = await request(app)
            .get('/api/data')
            .expect(200);

        expect(userController.getData).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ data: [] });
    });

    it('should call EventSignUp when POST /eventapply is hit', async () => {
        userController.EventSignUp.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Event signup successful' });
        });

        const response = await request(app)
            .post('/api/eventapply')
            .send({ eventID: '12345' })
            .expect(200);

        expect(userController.EventSignUp).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ message: 'Event signup successful' });
    });

    it('should call getEvents when GET /eventsattending is hit', async () => {
        userController.getEvents.mockImplementation((req, res) => {
            res.status(200).json({ events: ['event1', 'event2'] });
        });

        const response = await request(app)
            .get('/api/eventsattending')
            .expect(200);

        expect(userController.getEvents).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ events: ['event1', 'event2'] });
    });
});
