const {createEvent, getAllEvents, deleteEvent, updateEvent, sampleEvents} = require('../controllers/event_controller');
const userModel = require('../models/user'); // mock this
const { events, volunteers } = require('../global_arrays/data');

// Mock dependencies
jest.mock('../models/event');
jest.mock('bcrypt');

// Mock response and request objects
const mockReq = {
    body: {},
    params: {},
};
const mockRes = {
    json: jest.fn(),
    status: jest.fn(() => mockRes),
};

describe('createEvent', () => {
    it('should return the applied event', async () => {
        mockReq.body = { userId: '1' };

        await createEvent(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await createEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('getAllEvents', () => {
    it('should return the applied event', async () => {
        mockReq.body = { userId: '1' };

        await getAllEvents(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(sampleEvents);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await getAllEvents(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('deleteEvent', () => {
    it('should return the applied event', async () => {
        mockReq.body = { userId: '1' };

        await deleteEvent(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(sampleEvents);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await deleteEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('updateEvent', () => {
    it('should return the applied event', async () => {
        mockReq.body = { userId: '1' };

        await updateEvent(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(sampleEvents);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await updateEvent(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});