const events = [
    {
        eventName: "Community Cleanup",
        eventDescription: "A day to clean up the local park.",
        location: {
            city: "Houston",
            state: "Texas"
        },
        requiredSkills: ["Problem Solving", "Communication"],
        urgency: "High",
        eventDate: "8-18-2024",
        eventTime: "10:00"
    },
    {
        eventName: "Food Drive",
        eventDescription: "Collecting food for the local food bank.",
        location: {
            city: "Dallas",
            state: "Texas"
        },
        requiredSkills: "Organizational Skills",
        urgency: "Medium",
        eventDate: "7-6-2024",
        eventTime: "9:00"
    },
    {
        eventName: "Community Garden Planting",
        eventDescription: "Help plant and maintain the community garden to promote green spaces in the neighborhood.",
        location: {
            city: "Houston",
            state: "Texas"
        },
        requiredSkills: "Teamwork",
        urgency: "Low",
        eventDate: "6-15-2024",
        eventTime: "14:00"
    },
    {
        eventName: "Senior Citizen Support",
        eventDescription: "Assist seniors with daily tasks and provide companionship.",
        location: {
            city: "Dallas",
            state: "Texas"
        },
        requiredSkills: "Patience, communication",
        urgency: "High",
        eventDate: "9-1-2024",
        eventTime: "12:00"
    },
    {
        eventName: "Beach Cleanup",
        eventDescription: "Clear trash from the shoreline to protect marine life.",
        location: {
            city: "San Antonio",
            state: "Texas"
        },
        requiredSkills: "Physical Endurance",
        urgency: "High",
        eventDate: "9-12-2024",
        eventTime: "10:00"
    },
    {
        eventName: "Animal Shelter Volunteering",
        eventDescription: "Help care for animals and assist with shelter tasks.",
        location: {
            city: "San Antonio",
            state: "Texas"
        },
        requiredSkills: "Compassion",
        urgency: "Medium",
        eventDate: "10-5-2024",
        eventTime: "11:00"
    },
    {
        eventName: "Tree Planting Initiative",
        eventDescription: "Plant trees in urban areas to improve air quality.",
        location: {
            city: "Austin",
            state: "Texas"
        },
        requiredSkills: "Environmental Awareness",
        urgency: "Medium",
        eventDate: "10-12-2024",
        eventTime: "13:00"
    },
    {
        eventName: "Blood Donation Drive",
        eventDescription: "Organize and manage blood donations for local hospitals.",
        location: {
            city: "Austin",
            state: "Texas"
        },
        requiredSkills: "Organization, Teamwork",
        urgency: "High",
        eventDate: "11-3-2024",
        eventTime: "9:00"
    }
];

const volunteers = [
    {
        name: "Andrew Nguyen",
        role: "Admin",
        location: {
            city: "La Porte",
            state: "Texas"
        },
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
        name: "Kevin Leon",
        role: "Volunteer",
        location: {
            city: "Houston",
            state: "Texas"
        },
        email: "kevinleon519@gmail.com",
        phoneNumber: "(346) 309-5642",
        imageUrl: "https://placehold.co/600x400?text=User+Profile",
        skills: ["Communication", "Teamwork", "Problem Solving"],
        availability: {
            monday: { start: "N/A", end: "N/A" },
            tuesday: { start: "N/A", end: "N/A" },
            wednesday: { start: "N/A", end: "N/A" },
            thursday: { start: "N/A", end: "N/A" },
            friday: { start: "16:00", end: "19:00" },
            saturday: { start: "10:00", end: "14:00" },
            sunday: { start: "11:00", end: "15:00" }
        }
    },
    {
        name: "John Doe",
        role: "Volunteer",
        location: {
            city: "Dallas",
            state: "Texas"
        },
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
        location: {
            city: "San Antonio",
            state: "Texas"
        },
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
    },
    {
        name: "Melissa Jones",
        role: "Volunteer",
        location: {
            city: "Austin",
            state: "Texas"
        },
        email: "melissa.jones@example.com",
        phoneNumber: "(214) 555-9090",
        imageUrl: "https://placehold.co/600x400?text=User+Profile",
        skills: ["Event Coordination", "Public Relations"],
        availability: {
            monday: { start: "09:00", end: "13:00" },
            tuesday: { start: "11:00", end: "15:00" },
            wednesday: { start: "N/A", end: "N/A" },
            thursday: { start: "12:00", end: "17:00" },
            friday: { start: "08:00", end: "14:00" },
            saturday: { start: "10:00", end: "13:00" },
            sunday: { start: "N/A", end: "N/A" }
        }
    }
];

module.exports = {
    events,
    volunteers
};
