const events = [
    {
        eventName: "Community Cleanup",
        eventDescription: "A day to clean up the local park.",
        location: "Central Park",
        requiredSkills: "Physical endurance",
        urgency: "High",
        eventDate: "8-18-2024"
    },
    {
        eventName: "Food Drive",
        eventDescription: "Collecting food for the local food bank.",
        location: "City Hall",
        requiredSkills: "Organizational skills",
        urgency: "Medium",
        eventDate: "7-6-2024"
    },
    {
        eventName: "Community Garden Planting",
        eventDescription: "Help plant and maintain the community garden to promote green spaces in the neighborhood.",
        location: "Greenway Community Garden",
        requiredSkills: "Gardening knowledge, teamwork",
        urgency: "Low",
        eventDate: "6-15-2024"
    }
];

const volunteers = [
    {
        name: "Andrew Nguyen",
        role: "Volunteer",
        address: "10924 Fairwood Dr, La Porte, TX 77571",
        email: "andrew.nguyen.ta@gmail.com",
        phoneNumber: "(832) 530-0481",
        imageUrl: "https://placehold.co/600x400?text=User+Profile", // Placeholder image
        skills: ["Communication", "Teamwork", "Problem Solving"],
        availability: {
            monday: { start: "09:00", end: "17:00" },
            tuesday: { start: "10:00", end: "16:00" },
            wednesday: { start: "09:00", end: "17:00" },
            thursday: { start: "09:00", end: "15:00" },
            friday: { start: "09:00", end: "12:00" },
            saturday: { start: "10:00", end: "14:00" },
            sunday: { start: "12:00", end: "16:00" }
        }
    },
    {
        name: "John Doe",
        role: "Volunteer",
        address: "1234 Elm St, Houston, TX 77001",
        email: "john.doe@example.com",
        phoneNumber: "(713) 555-0123",
        imageUrl: "https://placehold.co/600x400?text=User+Profile",
        skills: ["Leadership", "Public Speaking", "Time Management"],
        availability: {
            monday: { start: "08:00", end: "12:00" },
            tuesday: { start: "N/A", end: "N/A" },
            wednesday: { start: "09:00", end: "14:00" },
            thursday: { start: "N/A", end: "N/A" },
            friday: { start: "10:00", end: "15:00" },
            saturday: { start: "N/A", end: "N/A" },
            sunday: { start: "N/A", end: "N/A" }
        }
    },
    {
        name: "Jane Smith",
        role: "Volunteer",
        address: "5678 Maple Ave, Houston, TX 78701",
        email: "jane.smith@example.com",
        phoneNumber: "(512) 555-9876",
        imageUrl: "https://placehold.co/600x400?text=User+Profile",
        skills: ["Organization", "Problem Solving", "Event Coordination"],
        availability: {
            monday: { start: "N/A", end: "N/A" },
            tuesday: { start: "08:00", end: "12:00" },
            wednesday: { start: "10:00", end: "17:00" },
            thursday: { start: "11:00", end: "16:00" },
            friday: { start: "09:00", end: "13:00" },
            saturday: { start: "N/A", end: "N/A" },
            sunday: { start: "13:00", end: "17:00" }
        }
    }
];

module.exports = {
    events,
    volunteers
};
