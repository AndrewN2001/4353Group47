const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/user"); // Adjust path based on your file structure

let mongoServer;

// Set up an in-memory MongoDB instance before all tests
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

describe("User Schema", () => {

  it("should save a user successfully with valid data", async () => {
    const validUser = new User({
      name: {
        firstName: "John",
        lastName: "Doe"
      },
      location: {
        city: "Houston",
        state: "Texas"
      },
      role: "user",
      phoneNumber: "1234567890", // Valid 10-digit number
      emailAddress: "johndoe@example.com",
      password: "securepassword123",
      notifications: {
        newEventAssignments: true,
        newEventUpdates: true,
        newEventReminders: true
      }
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name.firstName).toBe("John");
    expect(savedUser.role).toBe("user");
  });

  it("should throw a validation error for missing required fields", async () => {
    const invalidUser = new User({
      name: {
        firstName: "Jane"
        // Missing lastName
      },
      location: {
        city: "Dallas",
        state: "Texas"
      },
      role: "user",
      phoneNumber: "1234567890",
      emailAddress: "janedoe@example.com",
      password: "securepassword123"
    });

    let error;
    try {
      await invalidUser.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors["name.lastName"]).toBeDefined();
  });

  it("should throw a validation error for invalid phone number", async () => {
    const invalidPhoneNumberUser = new User({
      name: {
        firstName: "John",
        lastName: "Doe"
      },
      location: {
        city: "Austin",
        state: "Texas"
      },
      role: "user",
      phoneNumber: "12345", // Invalid phone number
      emailAddress: "johndoe@example.com",
      password: "securepassword123"
    });

    let error;
    try {
      await invalidPhoneNumberUser.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.phoneNumber).toBeDefined();
    expect(error.errors.phoneNumber.message).toBe("Please enter a valid 10-digit phone number");
  });

  it("should throw a validation error for invalid email", async () => {
    const invalidEmailUser = new User({
      name: {
        firstName: "John",
        lastName: "Doe"
      },
      location: {
        city: "Austin",
        state: "Texas"
      },
      role: "user",
      phoneNumber: "1234567890",
      emailAddress: "invalid-email", // Invalid email
      password: "securepassword123"
    });

    let error;
    try {
      await invalidEmailUser.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.emailAddress).toBeDefined();
    expect(error.errors.emailAddress.message).toBe("Please enter a valid email");
  });

  it("should set role to 'user' by default", async () => {
    const userWithoutRole = new User({
      name: {
        firstName: "Alice",
        lastName: "Smith"
      },
      location: {
        city: "Dallas",
        state: "Texas"
      },
      phoneNumber: "1234567890",
      emailAddress: "alicesmith@example.com",
      password: "anothersecurepassword"
    });

    const savedUser = await userWithoutRole.save();
    expect(savedUser.role).toBe("user");
  });
});
