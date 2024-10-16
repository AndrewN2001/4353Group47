import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerMatching = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [events, setEvents] = useState([]);
    const [matches, setMatches] = useState([]);

    // Fetch events and volunteers from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/api/users/data') // API endpoint for fetching data
            .then(response => {
                setVolunteers(response.data.volunteers);
                setEvents(response.data.events);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }, []);


    // Fetch matching results from backend when 'Create Matches' button is clicked
    const handleCreateMatches = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/volunteer-matching'); // Call the handleMatching function
            setMatches(response.data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-8">Volunteer Matching</h1>

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Volunteers Column */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Volunteers</h2>
                        <div className="h-64 overflow-y-auto">
                            <ul className="space-y-4">
                                {volunteers
                                    .filter(volunteer => volunteer.role === "Volunteer")
                                    .map((volunteer, index) => (
                                        <li key={index} className="p-4 bg-gray-100 rounded">{volunteer.name}</li>
                                    ))}
                            </ul>

                        </div>
                    </div>

                    {/* Events Column */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Events Available</h2>
                        <div className="h-64 overflow-y-auto">
                            <ul className="space-y-4">
                                {events.map((event, index) => (
                                    <li key={index} className="p-4 bg-gray-100 rounded">{event.eventName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleCreateMatches}
                        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded hover:bg-blue-700"
                    >
                        Create Matches
                    </button>
                </div>

                {/* Matched Results */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Matching Results</h2>
                    <ul className="space-y-6">
                        {matches.map((match, index) => (
                            <li key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-300">
                                <div className="font-bold text-xl text-blue-600 mb-2">Volunteer: {match.volunteerName}</div>
                                <ul className="pl-4 space-y-2">
                                    {match.matchedEvents.map((event, eventIndex) => (
                                        <li key={eventIndex} className="bg-gray-100 text-gray-800 p-2 rounded-lg">
                                            Event: {event}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default VolunteerMatching;
