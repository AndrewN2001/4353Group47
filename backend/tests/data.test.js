const { events, volunteers } = require("../global_arrays/data");

describe("Events Data", () => {
  it("should have all required fields for each event", () => {
    events.forEach(event => {
      expect(event).toHaveProperty("eventName");
      expect(event).toHaveProperty("eventDescription");
      expect(event).toHaveProperty("location.city");
      expect(event).toHaveProperty("location.state");
      expect(event).toHaveProperty("requiredSkills");
      expect(event).toHaveProperty("urgency");
      expect(event).toHaveProperty("eventDate");
      expect(event).toHaveProperty("eventTime");
    });
  });
});

describe("Volunteers Data", () => {
  it("should have all required fields for each volunteer", () => {
    volunteers.forEach(volunteer => {
      expect(volunteer).toHaveProperty("name");
      expect(volunteer).toHaveProperty("role");
      expect(volunteer).toHaveProperty("location.city");
      expect(volunteer).toHaveProperty("location.state");
      expect(volunteer).toHaveProperty("email");
      expect(volunteer).toHaveProperty("phoneNumber");
      expect(volunteer).toHaveProperty("skills");
      expect(volunteer).toHaveProperty("availability");
    });
  });

  it("should have valid skills for each volunteer", () => {
    volunteers.forEach(volunteer => {
      expect(Array.isArray(volunteer.skills)).toBe(true);
      expect(volunteer.skills.length).toBeGreaterThan(0);
    });
  });
  it("should have valid skills for each event", () => {
    events.forEach(event => {
      expect(Array.isArray(event.requiredSkills)).toBe(true);
      expect(event.requiredSkills.length).toBeGreaterThan(0);
    });
  });
});
