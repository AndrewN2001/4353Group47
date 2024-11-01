const {combineDateTime, createEvent, getAllEvents, deleteEvent, updateEvent, getEvents, EventSignUp, eventWithdraw} = require('../controllers/event_controller');
const userModel = require('../models/user'); // mock this
const eventModel = require('../models/event');
const { sampleEvents, volunteers } = require('../global_arrays/data');

// Mock dependencies
jest.mock('../models/event');
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

describe('combineDateTime', () => {
    test('should combine date and time strings into a Date object', () => {
        // Arrange
        const date = '2024-11-01';
        const time = '12:30';

        // Act
        const result = combineDateTime(date, time);

        // Assert
        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toBe('2024-11-01T17:30:00.000Z');
    });

    test('should return "Invalid Date" for invalid date input', () => {
        // Arrange
        const invalidDate = 'invalid-date';
        const time = '12:00';

        // Act
        const result = combineDateTime(invalidDate, time);

        // Assert
        expect(result.toString()).toBe('Invalid Date');
    });

    test('should return "Invalid Date" for invalid time input', () => {
        // Arrange
        const date = '2024-11-01';
        const invalidTime = 'invalid-time';

        // Act
        const result = combineDateTime(date, invalidTime);

        // Assert
        expect(result.toString()).toBe('Invalid Date');
    });
});

describe('createEvent', () => {
    it('should create a new event and return it', async () => {
        // Prepare mock event data
        const mockEventData = {
            eventName: "Community Clean-Up",
            eventDescription: "A community event to clean the local park.",
            location: "Springfield, IL",
            requiredSkills: ["Cleaning", "Organization"],
            urgency: "high",
            startDate: "2024-12-01",
            startTime: "09:00",
            endDate: "2024-12-01",
            endTime: "12:00",
        };

        // Create a mock request with event data
        mockReq.body = { eventData: mockEventData };

        // Mock the event model instance and its methods
        const newEvent = {
            ...mockEventData,
            location: {
                city: "Springfield",
                state: "IL"
            },
            save: jest.fn().mockResolvedValue(this),
            validate: jest.fn().mockResolvedValue(this),
        };
        
        eventModel.mockImplementation(() => newEvent); // Mock event model constructor

        await createEvent(mockReq, mockRes);

        // Expectations
        expect(newEvent.validate).toHaveBeenCalled(); // Check that validation was called
        expect(newEvent.save).toHaveBeenCalled(); // Check that the save method was called
        expect(mockRes.json).toHaveBeenCalledWith(newEvent); // Ensure the response returns the new event
    });

    it('should handle validation errors and return a 500 status code', async () => {
        const mockError = new Error('Validation failed');

        // Mock validation to throw an error
        const mockEventData = {
            eventName: "Invalid Event",
            eventDescription: "This event has invalid data.",
            location: "Some City, Some State",
            requiredSkills: [],
            urgency: "medium",
            startDate: "2024-12-01",
            startTime: "09:00",
            endDate: "2024-12-01",
            endTime: "08:00", // End time before start time to trigger validation error
        };

        // Create a mock request with invalid event data
        mockReq.body = { eventData: mockEventData };

        // Create a mock event model instance that throws an error on validation
        const newEvent = new eventModel();
        newEvent.validate = jest.fn().mockRejectedValue(mockError);
        eventModel.mockImplementation(() => newEvent);

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await createEvent(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: mockError.message,
        });
        expect(console.error).toHaveBeenCalledWith("Validation error:", mockError.message);
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
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should delete an event successfully and return a 200 status', async () => {
        mockReq.params = {eventId: 'testEventId'};
        // Arrange
        const mockDeletedEvent = { _id: 'testEventId', name: 'Test Event' };
        eventModel.findByIdAndDelete.mockResolvedValue(mockDeletedEvent);

        // Act
        await deleteEvent(mockReq, mockRes);

        // Assert
        expect(eventModel.findByIdAndDelete).toHaveBeenCalledWith('testEventId');
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Event deleted successfully",
            deletedEvent: mockDeletedEvent,
        });
    });

    test('should return a 404 status if the event is not found', async () => {
        // Arrange
        eventModel.findByIdAndDelete.mockResolvedValue(null);

        // Act
        await deleteEvent(mockReq, mockRes);

        // Assert
        expect(eventModel.findByIdAndDelete).toHaveBeenCalledWith('testEventId');
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Event not found" });
    });

    test('should return a 500 status if an error occurs', async () => {
        // Arrange
        const mockError = new Error("Database error");
        eventModel.findByIdAndDelete.mockRejectedValue(mockError);

        // Act
        await deleteEvent(mockReq, mockRes);

        // Assert
        expect(eventModel.findByIdAndDelete).toHaveBeenCalledWith('testEventId');
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
        expect(console.error).toHaveBeenCalledWith(mockError);
    });
});

describe('updateEvent', () => {
    it('should return the applied event', async () => {
        mockReq.body = { userId: '1' };

        await updateEvent(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
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

// describe('getEvents', () => {
//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mocks after each test to avoid cross-test interference
//     });

//     it('should return attended events for a valid user and respond with status 200', async () => {
//         // Arrange
//         mockReq.params = {userId: 'testUserId'};
//         const mockAttendedEvents = [
//             { _id: 'event1', name: 'Event 1' },
//             { _id: 'event2', name: 'Event 2' },
//         ];
//         userModel.findById = jest.fn().mockResolvedValue({ attendedEvents: mockAttendedEvents });

//         // Act
//         await getEvents(mockReq, mockRes);

//         // Assert
//         expect(userModel.findById).toHaveBeenCalledWith('testUserId', 'attendedEvents');
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//         expect(mockRes.json).toHaveBeenCalledWith(mockAttendedEvents);
//     });

//     it('should return a 404 status if the user is not found', async () => {
//         // Arrange
//         mockReq.params = {userId: 'testUserId'};
//         userModel.findById = jest.fn().mockResolvedValue(null);

//         // Act
//         await getEvents(mockReq, mockRes);

//         // Assert
//         expect(userModel.findById).toHaveBeenCalledWith('testUserId', 'attendedEvents');
//         expect(mockRes.status).toHaveBeenCalledWith(404);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
//     });
//     test('should return a 500 status if an error occurs', async () => {
//         // Arrange
//         const mockError = new Error("Database error");
//         mockReq.params = { userId: 'testUserId' };
//         userModel.findById = jest.fn().mockRejectedValue(mockError);

//         // Act
//         await getEvents(mockReq, mockRes);

//         // Assert
//         expect(userModel.findById).toHaveBeenCalledWith('testUserId', 'attendedEvents');
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "Server Error" });
//         expect(console.error).toHaveBeenCalledWith("Error fetching data:", mockError);
//     });
// });
// describe('getEvents', () => {
//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mocks after each test
//     });
    
//     it('should return the applied event', async () => {
//         mockReq.params = { userId: '1' };
//         const mockUser = {userId: '1', attendedEvents: ['Cleanup', 'Planting']}
//         userModel.findById.mockResolvedValue(mockUser);

//         await getEvents(mockReq, mockRes);

//         expect(userModel.findById).toHaveBeenCalledWith('1', 'attendedEvents');
//         expect(mockRes.json).toHaveBeenCalledWith(mockUser.attendedEvents);
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//     });

//     it('should return a 404 status if the user is not found', async () => {
//         userModel.findById.mockResolvedValue(null);

//         // Act
//         await getEvents(mockReq, mockRes);

//         // Assert
//         expect(mockRes.status).toHaveBeenCalledWith(404);
//         expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
//     });

//     it('should handle errors and return a 500 status code', async () => {
//         const req = null;
//         const res = mockRes;
//         console.error = jest.fn();
//         await getEvents(req, res);
//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             message: "Server Error",
//         });
//         expect(console.error).toHaveBeenCalled();
//     });
// });

describe('EventSignUp', () => {
    it('should add an event to the user and return success message', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockEventID = '67890'; // Mock event ID
        
        // Declare mockUser before usage
        const mockUser = {
            _id: mockUserID,
            attendedEvents: [],
            save: jest.fn().mockResolvedValue(this), // Use 'this' to refer to mockUser context
        };

        // Mock findById to return the mock user
        userModel.findById.mockResolvedValue(mockUser);

        // Set up request and response mock objects
        mockReq.params = { userId: mockUserID };
        mockReq.body = { _id: mockEventID };

        await EventSignUp(mockReq, mockRes);

        // Expectations
        expect(userModel.findById).toHaveBeenCalledWith(mockUserID);
        expect(mockUser.attendedEvents).toContain(mockEventID);
        expect(mockUser.save).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Event added to user successfully",
            userId: mockUserID,
            eventID: mockEventID,
        });
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '12345'; // Mock user ID

        // Mock findById to return null
        userModel.findById.mockResolvedValue(null);

        // Set up request mock
        mockReq.params = { userId: mockUserID };
        mockReq.body = { _id: '67890' };

        await EventSignUp(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Message not found." });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockError = new Error('Database error');

        // Mock findById to throw an error
        userModel.findById.mockRejectedValue(mockError);

        // Set up request mock
        mockReq.params = { userId: mockUserID };
        mockReq.body = { _id: '67890' };

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await EventSignUp(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server Error",
        });
        expect(console.error).toHaveBeenCalledWith("Error fetching data:", mockError);
    });
});

describe('eventWithdraw', () => {
    it('should remove an event from the user and return success message', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockEventID = '67890'; // Mock event ID

        // Declare mockUser before usage
        const mockUser = {
            _id: mockUserID,
            attendedEvents: [mockEventID],
            save: jest.fn().mockResolvedValue(this), // Use 'this' to refer to mockUser context
        };

        // Mock findByIdAndUpdate to return the mock user
        userModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        // Set up request and response mock objects
        mockReq.params = { userId: mockUserID, eventId: mockEventID };

        await eventWithdraw(mockReq, mockRes);

        // Expectations
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
            mockUserID,
            { $pull: { attendedEvents: mockEventID }},
            { new: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Event successfully removed from the user."
        });
    });

    it('should return 404 if user is not found', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockEventID = '67890'; // Mock event ID

        // Mock findByIdAndUpdate to return null
        userModel.findByIdAndUpdate.mockResolvedValue(null);

        // Set up request mock
        mockReq.params = { userId: mockUserID, eventId: mockEventID };

        await eventWithdraw(mockReq, mockRes);

        // Expectations for 404 response
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it('should handle errors and return a 500 status code', async () => {
        const mockUserID = '12345'; // Mock user ID
        const mockEventID = '67890'; // Mock event ID
        const mockError = new Error('Database error');

        // Mock findByIdAndUpdate to throw an error
        userModel.findByIdAndUpdate.mockRejectedValue(mockError);

        // Set up request mock
        mockReq.params = { userId: mockUserID, eventId: mockEventID };

        // Mock console.error to prevent actual logging in the test output
        console.error = jest.fn();

        await eventWithdraw(mockReq, mockRes);

        // Expectations for error handling
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Server error",
        });
        expect(console.error).toHaveBeenCalledWith(mockError);
    });
});