const { handleLogin, handleRegister, getUserProfile, handleNotifications, getVolunteerHistory, handleMatching, getData } = require('../controllers/user_controller');
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

// Test for handleLogin
describe('handleLogin', () => {
    it('should return the request body', async () => {
        mockReq.body = { test: 'data' };
        await handleLogin(mockReq, mockRes);
        expect(mockRes.json).toHaveBeenCalledWith({ test: 'data' });
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

    // it('should register a user successfully', async () => {
    //     const userData = {
    //       firstName: 'John',
    //       lastName: 'Doe',
    //       email: 'john.doe@example.com',
    //       password: 'password123',
    //       location: { city: 'New York', state: 'NY' },
    //       phoneNumber: '1234567890'
    //     };
    
    //     const response = await request(app).post('/register').send(userData);
        
    //     expect(response.body).toHaveProperty('message', 'User registered successfully');
    //   });
});

// Test for getUserProfile
describe('getUserProfile', () => {
    it('should return the first volunteer in the array', async () => {
        mockReq.params = { userId: '1' };

        await getUserProfile(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(volunteers[0]);
    });
});

// Test for handleMatching
describe('handleMatching', () => {
    it('should return matching volunteers with events', async () => {
        await handleMatching(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));  // Expecting array of matches
    });
});
