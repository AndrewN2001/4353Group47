const { handleLogin, handleRegister, getUserProfile, getNotifications, handleNotifications, addSkill, removeSkill, getVolunteerHistory, handleMatching, getData, editUserInfo, editAvailability } = require('../controllers/user_controller');
const userModel = require('../models/user'); // mock this
const eventModel = require('../models/event');
const { events, volunteers } = require('../global_arrays/data');
const bcrypt = require('bcrypt');

// Mock dependencies
jest.mock('../models/user');
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

beforeEach(() => {
    jest.clearAllMocks();
});

describe('handleLogin', () => {
    it('should return the user data if login is successful', async () => {
        const mockUser = { emailAddress: 'test@example.com', password: 'hashedPassword123' };
        mockReq.body = { credentials: { accountInfo: { email: 'test@example.com', password: 'password123' } } };

        userModel.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        await handleLogin(mockReq, mockRes);

        expect(userModel.findOne).toHaveBeenCalledWith({ emailAddress: 'test@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 400 if the password is invalid', async () => {
        const mockUser = { emailAddress: 'test@example.com', password: 'hashedPassword123' };
        mockReq.body = { credentials: { accountInfo: { email: 'test@example.com', password: 'wrongPassword' } } };

        userModel.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        await handleLogin(mockReq, mockRes);

        expect(userModel.findOne).toHaveBeenCalledWith({ emailAddress: 'test@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword123');
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid password." });
    });

    it('should return 401 if the user is not found', async () => {
        mockReq.body = { credentials: { accountInfo: { email: 'nonexistent@example.com', password: 'password123' } } };

        userModel.findOne.mockResolvedValue(null);

        await handleLogin(mockReq, mockRes);

        expect(userModel.findOne).toHaveBeenCalledWith({ emailAddress: 'nonexistent@example.com' });
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it('should handle errors and return a 500 status code', async () => {
        const error = new Error('Database connection error');
        mockReq.body = { credentials: { accountInfo: { email: 'test@example.com', password: 'password123' } } };

        userModel.findOne.mockRejectedValue(error);
        console.error = jest.fn();

        await handleLogin(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith(error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
});

describe('handleRegister', () => {
    it('should return 409 if account already exists', async () => {
        // Mock an existing user found by userModel.findOne to simulate duplicate email
        const existingUser = { emailAddress: 'test@example.com' };
        userModel.findOne.mockResolvedValue(existingUser); // Simulate finding a user

        mockReq.body = { accountForm: { emailAddress: 'test@example.com' } };

        await handleRegister(mockReq, mockRes);

        // Check if the 409 status and appropriate message are sent
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

        // Mock hashed password
        const hashedPassword = 'hashedPassword123';
        bcrypt.hash.mockResolvedValue(hashedPassword);

        // Mock save method to return user data
        const newUserMock = { ...userData, password: hashedPassword, _id: '1234' };
        userModel.prototype.save = jest.fn().mockResolvedValue(newUserMock);

        mockReq.body.accountForm = userData;
        await handleRegister(mockReq, mockRes);

        expect(userModel.findOne).toHaveBeenCalledWith({ 'accountInfo.emailAddress': 'john.doe@example.com' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
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
        }));
    });

    it('should handle errors and return a 500 status code', async () => {
        mockReq.body = { accountForm: { emailAddress: 'error@example.com' } };

        // Simulate a database error by mocking findOne to throw an error
        const error = new Error('Database connection error');
        userModel.findOne.mockRejectedValue(error);

        console.error = jest.fn(); // Suppress console error in test

        await handleRegister(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith("Error saving user:", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
});

describe('getNotifications', () => {
    it('should return notifications if user is found', async () => {
        const mockNotifications = [
            { message: "You have a new message", date: "2023-10-01" },
            { message: "Your profile was viewed", date: "2023-10-02" }
        ];

        mockReq.params = { userID: '1' };
        userModel.findById.mockResolvedValue({ _id: '1', notifications: mockNotifications });

        await getNotifications(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith('1', 'notifications');
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockNotifications);
    });

    it('should return 404 if user is not found', async () => {
        mockReq.params = { userID: '1' };
        userModel.findById.mockResolvedValue(null); // Simulate user not found

        await getNotifications(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith('1', 'notifications');
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it('should handle errors and return a 500 status code', async () => {
        const error = new Error('Database error');
        mockReq.params = { userID: '1' };
        userModel.findById.mockRejectedValue(error); // Simulate database error

        console.error = jest.fn(); // Mock console.error to suppress error output during test

        await getNotifications(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith("Error getting user profile:", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
});

describe('handleNotifications', () => {
    it('should update notification settings for a user', async () => {
        const mockUserID = '1';
        const mockUpdatedNotifications = {
            newEventAssignments: true,
            newEventUpdates: false,
            newEventReminders: true
        };

        const mockUser = {
            _id: mockUserID,
            notifications: mockUpdatedNotifications
        };

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = { notifications: mockUpdatedNotifications };

        // Mock userModel behavior
        userModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        await handleNotifications(mockReq, mockRes);

        // Expectations for response
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $set: { notifications: mockUpdatedNotifications } },
            { new: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser.notifications);
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '1';

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = {
            notifications: {
                newEventAssignments: true,
                newEventUpdates: false,
                newEventReminders: true
            }
        };

        // Simulate user not found
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        await handleNotifications(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '1';
        const error = new Error('Database error');

        // Mock request parameters
        mockReq.params = { userID: mockUserID };
        mockReq.body = {
            notifications: {
                newEventAssignments: true,
                newEventUpdates: false,
                newEventReminders: true
            }
        };

        // Simulate a database error
        userModel.findByIdAndUpdate.mockRejectedValue(error);
        console.error = jest.fn();

        await handleNotifications(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith("Something went wrong", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Something went wrong" });
    });
});


describe('getUserProfile', () => {
    it('should return the user profile if user is found', async () => {
        const mockUserProfile = {
            _id: '1',
            name: {
                firstName: 'John',
                lastName: 'Doe'
            },
            location: {
                city: 'Houston',
                state: 'TX'
            },
            emailAddress: 'john.doe@example.com',
            phoneNumber: '1234567890'
        };

        mockReq.params = { userID: '1' };
        userModel.findById.mockResolvedValue(mockUserProfile);

        await getUserProfile(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith('1');
        expect(mockRes.json).toHaveBeenCalledWith(mockUserProfile);
    });

    it('should return 404 if user is not found', async () => {
        mockReq.params = { userID: '1' };
        userModel.findById.mockResolvedValue(null); // Simulate user not found

        await getUserProfile(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith('1');
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it('should handle errors and return a 500 status code', async () => {
        const error = new Error('Database error');
        mockReq.params = { userID: '1' };
        userModel.findById.mockRejectedValue(error); // Simulate database error

        console.error = jest.fn(); // Mock console.error to suppress error output during test

        await getUserProfile(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith("Error fetching user profile:", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
});

describe('addSkill', () => {
    it('should add a new skill if it does not exist in user\'s skills array', async () => {
        const mockUserID = '1';
        const mockNewSkill = 'JavaScript';
        const mockUser = {
            _id: mockUserID,
            skills: ['HTML', 'CSS'],
            save: jest.fn().mockResolvedValue() // mock save function
        };

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newSkill: mockNewSkill };

        userModel.findById.mockResolvedValue(mockUser);

        await addSkill(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith(mockUserID);
        expect(mockUser.skills).toContain(mockNewSkill);
        expect(mockUser.save).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser.skills);
    });

    it('should not add a skill if it already exists in user\'s skills array', async () => {
        const mockUserID = '1';
        const mockExistingSkill = 'JavaScript';
        const mockUser = {
            _id: mockUserID,
            skills: ['HTML', 'CSS', mockExistingSkill],
            save: jest.fn().mockResolvedValue() // mock save function
        };

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newSkill: mockExistingSkill };

        userModel.findById.mockResolvedValue(mockUser);

        await addSkill(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith(mockUserID);
        expect(mockUser.skills.filter(skill => skill === mockExistingSkill).length).toBe(1);
        expect(mockUser.save).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser.skills);
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '1';
        const mockNewSkill = 'JavaScript';

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newSkill: mockNewSkill };

        userModel.findById.mockResolvedValue(null); // Simulate user not found

        await addSkill(mockReq, mockRes);

        expect(userModel.findById).toHaveBeenCalledWith(mockUserID);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '1';
        const mockNewSkill = 'JavaScript';
        const error = new Error('Database error');

        // Mock request parameters and body
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newSkill: mockNewSkill };

        userModel.findById.mockRejectedValue(error); // Simulate database error
        console.error = jest.fn();

        await addSkill(mockReq, mockRes);

        expect(console.error).toHaveBeenCalledWith("Something went wrong", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Something went wrong" });
    });
});

describe('removeSkill', () => {
    it('should remove the specified skill from the user\'s skills array', async () => {
        const mockUserID = '1';
        const mockSkill = 'JavaScript';
        const mockUser = {
            _id: mockUserID,
            skills: ['HTML', 'CSS'], // Updated skills after removal
        };

        // Mock request parameters
        mockReq.params = { userID: mockUserID, skill: mockSkill };

        // Mock userModel behavior
        userModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        await removeSkill(mockReq, mockRes);

        // Expectations for successful removal
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $pull: { skills: mockSkill } },
            { new: true }
        );
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Skill removed",
            user: mockUser,
        });
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '1';
        const mockSkill = 'JavaScript';

        // Mock request parameters
        mockReq.params = { userID: mockUserID, skill: mockSkill };

        // Simulate user not found
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        await removeSkill(mockReq, mockRes);

        // Expectations for 404 response
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $pull: { skills: mockSkill } },
            { new: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '1';
        const mockSkill = 'JavaScript';
        const error = new Error('Database error');

        // Mock request parameters
        mockReq.params = { userID: mockUserID, skill: mockSkill };

        // Simulate database error
        userModel.findByIdAndUpdate.mockRejectedValue(error);
        console.error = jest.fn();

        await removeSkill(mockReq, mockRes);

        // Expectations for 500 response
        expect(console.error).toHaveBeenCalledWith("Something went wrong", error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Something went wrong" });
    });
});

// describe('getVolunteerHistory', () => {
//     it('should return the attended events for a user', async () => {
//         const mockUserID = '1';
//         const mockUser = {
//           _id: mockUserID,
//           attendedEvents: [
//             { eventName: "Event 1", date: "2024-01-01" },
//             { eventName: "Event 2", date: "2024-02-01" }
//           ]
//         };

//         // Mock request parameters
//         mockReq.params = { userID: mockUserID };

//         // Mock userModel behavior
//         userModel.findById.mockResolvedValue(mockUser);

//         await getVolunteerHistory(mockReq, mockRes);

//         // Assertions
//         expect(userModel.findById).toHaveBeenCalledWith(mockUserID);
//         expect(mockRes.json).toHaveBeenCalledWith(mockUser.attendedEvents);
//       });

//     it('should return 404 if user is not found', async () => {
//         const mockUserID = '1';

//         // Mock request parameters
//         mockReq.params = { userID: mockUserID };

//         // Simulate user not found
//         userModel.findById.mockResolvedValue(null);

//         await getVolunteerHistory(mockReq, mockRes);

//         // Expectations for 404 response
//         expect(mockRes.status).toHaveBeenCalledWith(404);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
//     });

//     it('should handle errors and return a 500 status code', async () => {
//         const req = null;
//         const res = mockRes;
//         console.error = jest.fn();

//         await getVolunteerHistory(req, res);

//         // Expectations for 500 response
//         expect(console.error).toHaveBeenCalled();
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
//     });
// });


// // Test for handleMatching
describe('handleMatching', () => {
    it('should return matching volunteers with events', async () => {
        // Mock event data
        const mockEvents = [
            {
                eventName: 'Event 1',
                startDate: new Date('2024-01-01T10:00:00Z'),
                location: { city: 'City A' },
                requiredSkills: ['skill1', 'skill2'],
            },
            {
                eventName: 'Event 2',
                startDate: new Date('2024-01-02T11:00:00Z'),
                location: { city: 'City B' },
                requiredSkills: ['skill1'],
            },
        ];

        // Mock volunteer data
        const mockVolunteers = [
            {
                name: { firstName: 'John', lastName: 'Doe' },
                role: 'Volunteer',
                location: { city: 'City A' },
                availability: {
                    monday: { start: '09:00', end: '17:00' },
                    tuesday: { start: '10:00', end: '18:00' },
                },
                skills: ['skill1', 'skill2'],
            },
            {
                name: { firstName: 'Jane', lastName: 'Doe' },
                role: 'Volunteer',
                location: { city: 'City B' },
                availability: {
                    monday: { start: '08:00', end: '16:00' },
                    tuesday: { start: '11:00', end: '19:00' },
                },
                skills: ['skill1'],
            },
        ];

        // Set up the mocked return values
        eventModel.find.mockResolvedValue(mockEvents);
        userModel.find.mockResolvedValue(mockVolunteers);

        await handleMatching(mockReq, mockRes);

        // Define expected output
        const expectedMatches = [
            {
                volunteerName: { firstName: 'John', lastName: 'Doe' },
                matchedEvents: ['Event 1'],
            },
            {
                volunteerName: { firstName: 'Jane', lastName: 'Doe' },
                matchedEvents: ['Event 2'],
            },
        ];

        // Expectations
        expect(eventModel.find).toHaveBeenCalled();
        expect(userModel.find).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith(expectedMatches);
    });

    it('should handle errors and return a 500 status code', async () => {
        // Mock an error in the function by throwing it manually or mocking dependencies
        userModel.find.mockRejectedValue(new Error('Database error'));

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await handleMatching(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalledWith("Error fetching volunteer matching:", expect.any(Error));
    });
});


describe('getData', () => {
    it('should return all events and volunteers', async () => {
        // Mock data to be returned by the models
        const mockEvents = [
            { eventName: 'Event 1', location: 'Location 1' },
            { eventName: 'Event 2', location: 'Location 2' },
        ];

        const mockVolunteers = [
            { name: 'Volunteer 1', skills: ['skill1'] },
            { name: 'Volunteer 2', skills: ['skill2'] },
        ];

        // Set up the mocked return values
        eventModel.find.mockResolvedValue(mockEvents);
        userModel.find.mockResolvedValue(mockVolunteers);

        await getData(mockReq, mockRes);

        // Expectations
        expect(eventModel.find).toHaveBeenCalled();
        expect(userModel.find).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith({ events: mockEvents, volunteers: mockVolunteers });
    });

    it('should handle errors and return a 500 status code', async () => {
        // Mock an error for eventModel.find to simulate a database error
        eventModel.find.mockRejectedValue(new Error('Database error'));

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await getData(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));
    });
});

describe('editUserInfo', () => {
    it('should update user information and return the updated user', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockNewValues = { name: { firstName: 'John', lastName: 'Doe' } }; // New values to update

        // Set up the mocked return value for userModel
        const mockUpdatedUser = {
            _id: mockUserID,
            name: { firstName: 'John', lastName: 'Doe' }
        };

        // Mock findByIdAndUpdate to return the updated user
        userModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

        // Set up request and response mock objects
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newValues: mockNewValues };

        await editUserInfo(mockReq, mockRes);

        // Expectations
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $set: mockNewValues },
            { new: true, runValidators: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '12345';

        // Mock findByIdAndUpdate to return null
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        // Set up request mock
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newValues: {} };

        await editUserInfo(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '12345';
        const mockNewValues = { name: { firstName: 'John' } };

        // Mock findByIdAndUpdate to throw an error
        userModel.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

        // Set up request mock
        mockReq.params = { userID: mockUserID };
        mockReq.body = { newValues: mockNewValues };

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await editUserInfo(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server Error"
        });
        expect(console.error).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));
    });
});

describe('editAvailability', () => {
    it('should update user availability and return the updated user', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockKey = 'monday'; // Day key to update
        const mockNewAvailability = { start: '09:00', end: '17:00' }; // New availability values

        // Set up the mocked return value for userModel
        const mockUpdatedUser = {
            _id: mockUserID,
            availability: {
                [mockKey]: mockNewAvailability
            }
        };

        // Mock findByIdAndUpdate to return the updated user
        userModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

        // Set up request and response mock objects
        mockReq.params = { userID: mockUserID };
        mockReq.body = { dayData: { key: mockKey, ...mockNewAvailability } };

        await editAvailability(mockReq, mockRes);

        // Expectations
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $set: { [`availability.${mockKey}`]: mockNewAvailability } },
            { new: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '12345';
        const mockKey = 'monday';

        // Mock findByIdAndUpdate to return null
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        // Set up request mock
        mockReq.params = { userID: mockUserID };
        mockReq.body = { dayData: { key: mockKey, start: '09:00', end: '17:00' } };

        await editAvailability(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '12345';
        const mockKey = 'monday';

        // Mock findByIdAndUpdate to throw an error
        userModel.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

        // Set up request mock
        mockReq.params = { userID: mockUserID };
        mockReq.body = { dayData: { key: mockKey, start: '09:00', end: '17:00' } };

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await editAvailability(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server error"
        });
        expect(console.error).toHaveBeenCalledWith('Error fetching data', expect.any(Error));
    });
});