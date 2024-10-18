const { handleLogin, handleRegister, getUserProfile, handleNotifications, getVolunteerHistory, handleMatching, getData, EventSignUp, getEvents } = require('../controllers/user_controller');
const userModel = require('../models/user'); // mock this
const { events, volunteers } = require('../global_arrays/data');

// Mock dependencies
jest.mock('../models/user');
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

beforeEach(() => {
    jest.clearAllMocks();
});

// Test for handleLogin
describe('handleLogin', () => {
    it('should return the request body', async () => {
        mockReq.body = { credentials: { email: 'test@example.com', password: 'password123' } };
        await handleLogin(mockReq, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
    });

    it('should handle errors and return a 500 status code', async () => {
        // Simulate an error by passing null req.body (you can simulate other errors as needed)
        const req = null;
        const res = mockRes;

        // Mock console.error to suppress error output during the test
        console.error = jest.fn();

        await handleLogin(req, res);

        // Check if res.status was called with 500 and res.json with the error message
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });

        // Check if console.error was called
        expect(console.error).toHaveBeenCalled();
    });

});

// Test for handleRegister
describe('handleRegister', () => {
    it('should return 409 if account already exists', async () => {
        // Mock an existing user found by userModel.findOne
        userModel.findOne.mockResolvedValue({ emailAddress: 'test@example.com' });
        mockReq.body = { accountForm: { emailAddress: 'test@example.com' } };

        await handleRegister(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(409);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Account already exists!" });
    });

    it('should register a user successfully', async () => {
        const userData = {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            location: {
                city: "Houston",
                state: "TX"
            },
            phoneNumber: '1234567890',
            emailAddress: 'john.doe@example.com',
            password: 'password123'
        };
    
        // Mock user not found
        userModel.findOne.mockResolvedValue(null);
        
        // Mock user creation
        const newUserMock = { ...userData, _id: '1234' };
        userModel.mockReturnValue(newUserMock); // Mock constructor to return new user object

        mockReq.body.accountForm = userData;
        await handleRegister(mockReq, mockRes);
    
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            location: {
                city: "Houston",
                state: "TX"
            },
            phoneNumber: '1234567890',
            emailAddress: 'john.doe@example.com',
            password: 'password123'
        }));
    });
    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await handleRegister(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('handleNotifications', () => {
    it('should update notification settings for a user', async () => {
        const mockUserID = '1'; // Mock user ID
        const mockUser = {
            _id: mockUserID,
            notifications: {
                newEventAssignments: true,
                newEventUpdates: false,
                newEventReminders: true
            }
        };

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = {
            newEventAssignments: true,
            newEventUpdates: false,
            newEventReminders: true
        };

        // Mock userModel behavior
        userModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        await handleNotifications(mockReq, mockRes);

        // Expectations for response
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Notification settings updated successfully',
            user: mockUser
        });
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '1';

        // Mock request parameters
        mockReq.params = { userID: mockUserID };
        mockReq.body = {
            newEventAssignments: true,
            newEventUpdates: false,
            newEventReminders: true
        };

        // Simulate user not found
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        await handleNotifications(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await handleNotifications(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
        });
        expect(console.error).toHaveBeenCalled();
    });
});


// Test for getUserProfile
describe('getUserProfile', () => {
    it('should return the first volunteer in the array', async () => {
        mockReq.params = { userId: '1' };

        await getUserProfile(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(volunteers[0]);
    });
    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await getUserProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

// Test for volunteerHistory
describe('getVolunteerHistory', () => {
    it('should return all events', async () => {
        mockReq.params = { userId: '1' };

        await getVolunteerHistory(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(events);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await getVolunteerHistory(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

// Test for handleMatching
describe('handleMatching', () => {
    it('should return matching volunteers with events', async () => {
        await handleMatching(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));  // Expecting array of matches
    });
    it('should handle errors and return a 500 status code', async () => {
        // Simulate the req and res objects
        const req = mockReq;
        const res = mockRes;

        // Mock an error in the function by throwing it manually or mocking dependencies
        jest.spyOn(global, 'Date').mockImplementation(() => {
            throw new Error('Simulated error');
        });

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        // Call handleMatching and expect it to handle the error case
        await handleMatching(req, res);

        // Check that res.status was called with 500
        expect(res.status).toHaveBeenCalledWith(500);
        // Check that res.json was called with the error message
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });

        // Verify that console.error was called (error logging)
        expect(console.error).toHaveBeenCalled();

        // Restore Date after test
        global.Date.mockRestore();
    });
});

describe('getData', () => {
    it('should return all events and volunteers', async () => {
        mockReq.params = { userId: '1' };

        await getData(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ events, volunteers });
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await getData(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('EventSignUp', () => {
    it('should return the req', async () => {
        mockReq.params = { userId: '1' };

        await EventSignUp(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await EventSignUp(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});

describe('getEvents', () => {
    it('should return the applied event', async () => {
        mockReq.params = { userId: '1' };

        await getEvents(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(volunteers[0].appliedEvents);
    });

    it('should handle errors and return a 500 status code', async () => {
        const req = null;
        const res = mockRes;
        console.error = jest.fn();
        await getEvents(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalled();
    });
});