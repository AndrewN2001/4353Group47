const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Event = require("../models/event"); // Update with correct path

let mongoServer;

// Set up an in-memory MongoDB instance
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Close the connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Event Schema", () => {

  it("should save an event successfully with valid data", async () => {
    const validEvent = new Event({
      eventName: "Community Cleanup",
      eventDescription: "Help clean up the local park.",
      location: {
        city: "Houston",
        state: "Texas"
      },
      requiredSkills: ["Problem Solving", "Communication"],
      urgency: "high",
      startDate: new Date("2024-08-18"),
      endDate: new Date("2024-08-18")
    });

    const savedEvent = await validEvent.save();
    expect(savedEvent._id).toBeDefined();
    expect(savedEvent.eventName).toBe("Community Cleanup");
  });

  it("should throw validation error for missing required fields", async () => {
    const invalidEvent = new Event({
      eventDescription: "Help clean up the local park.",
      location: {
        city: "Houston",
        state: "Texas"
      },
      urgency: "high",
      startDate: new Date("2024-08-18"),
      endDate: new Date("2024-08-18")
    });

    let error;
    try {
      await invalidEvent.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.eventName).toBeDefined();
  });

  it("should throw validation error when endDate is before startDate", async () => {
    const invalidEvent = new Event({
      eventName: "Community Cleanup",
      eventDescription: "Help clean up the local park.",
      location: {
        city: "Houston",
        state: "Texas"
      },
      requiredSkills: ["Problem Solving", "Communication"],
<<<<<<< HEAD
      urgency: "high",
=======
      urgency: "High",
>>>>>>> develop
      startDate: new Date("2024-08-18"),
      endDate: new Date("2024-08-17") // Invalid endDate
    });

    let error;
    try {
      await invalidEvent.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.endDate).toBeDefined();
    expect(error.errors.endDate.message).toBe("End date must be after the start date.");
  });

  it("should set urgency to 'low' by default", async () => {
    const eventWithoutUrgency = new Event({
      eventName: "Food Drive",
      eventDescription: "Organize and distribute food to those in need.",
      location: {
        city: "Dallas",
        state: "Texas"
      },
      requiredSkills: ["Organization"],
      startDate: new Date("2024-07-06"),
      endDate: new Date("2024-07-06")
    });

    const savedEvent = await eventWithoutUrgency.save();
<<<<<<< HEAD
    expect(savedEvent.urgency).toBe("low");
=======
    expect(savedEvent.urgency).toBe("Low");
>>>>>>> develop
  });
});
