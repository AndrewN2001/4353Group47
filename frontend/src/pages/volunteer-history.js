import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";

// Random sample events to showcase presentation on the page
const VolunteerHistory = () => {
    const [volunteerData, setVolunteerData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const userId = "someUserId"; // Replace with actual user ID when DB is connected
        axios.get(`http://localhost:3001/api/users/volunteer-history/${userId}`)
            .then(response => {
                setVolunteerData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    if (!volunteerData) {
        return <div>Loading...</div>;
    }

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-2xl text-center font-bold mb-8">Volunteering History</h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md mb-8">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600">Event Name</th>
                        <th className="px-4 py-2 text-left text-gray-600">Participation Status</th>
                        <th className="px-4 py-2 text-left text-gray-600">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteerData.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-4 py-2 text-center text-gray-500">No volunteer history available.</td>
                        </tr>
                    ) : (
                        volunteerData.map((event, index) => (
                            <React.Fragment key={index}>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">{event.eventName}</td>
                                    <td className="px-4 py-2">Participated</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleToggle(index)}
                                            className="text-black-500 hover:text-black-700"
                                        >
                                            {openIndex === index ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle/>}
                                        </button>
                                    </td>
                                </tr>
                                {openIndex === index && (
                                    <tr>
                                        <td colSpan="3" className="bg-gray-300">
                                            <div className="p-4">
                                                <p><strong>Event Description:</strong> {event.eventDescription}</p>
                                                <p><strong>Location:</strong> {event.location}</p>
                                                <p><strong>Required Skills:</strong> {event.requiredSkills}</p>
                                                <p><strong>Urgency:</strong> {event.urgency}</p>
                                                <p><strong>Event Date:</strong> {event.eventDate}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-center">
                <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded hover:bg-blue-700">
                    User Dashboard
                </button>
            </div>
        </div>
    );
};

export default VolunteerHistory;
