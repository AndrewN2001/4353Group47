import React, {useEffect, useState} from "react";
import { useAuth } from "../middleware/user-vertification";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";
import axios from "axios";

export default function Events(){
    const [attendEvents, setAttendEvents] = useState([]);
    const {isAdmin} = useAuth();
    const [volunteerData, setVolunteerData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const userId = "someUserId"; // Replace with actual user ID when DB is connected
        axios.all([
            axios.get("http://localhost:3001/api/users/eventsattending"),
            axios.get(`http://localhost:3001/api/users/volunteer-history/${userId}`)
        ])
        .then(axios.spread((eventsResponse, historyResponse) => {
            setAttendEvents(eventsResponse.data);
            setVolunteerData(historyResponse.data);
        }))
        .catch(error => {
            console.error("Error fetching data:", error);
        })
    }, [])

    useEffect(() => {
        console.log(attendEvents);
    }, [attendEvents])

    const [dropDowns, setDropDowns] = useState(
        new Array(attendEvents.length).fill(false)
    );

    const toggleDropdown = (index) => {
        const updatedDropdowns = [...dropDowns];
        updatedDropdowns[index] = !updatedDropdowns[index];
        setDropDowns(updatedDropdowns);
    }

    if (!volunteerData) {
        return <div>Loading...</div>;
    }

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return(
        <div className="mt-24 px-7 w-full h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl">
                    My Events
                </h1>
                {isAdmin ? (
                    <a href="/volunteermatching" className="bg-primaryblue hover:bg-primaryblue-light text-white px-4 py-2 rounded-sm">
                        Event Manager
                    </a>
                ) : (null)}
            </div>
            

            <ul className="w-full mt-5 flex flex-col gap-2 h-max">
                {attendEvents.map((event, index) => (
                    <li key={index} className="">
                        <button className="bg-gray-200 hover:bg-gray-300 w-full p-5 rounded-md flex flex-col items-center justify-between" onClick={() => toggleDropdown(index)}>
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-3xl font-light">
                                    {event.eventName}
                                </h1>
                                <div className={`rounded-full w-7 h-7 flex justify-center items-center font-semibold text-xl`}>
                                    !
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-between">
                                <h1 className="text-gray-700 font-light">
                                    {event.location.city}, {event.location.state}
                                </h1>
                                <h1 className="text-gray-700 font-light text-sm">
                                    {event.eventDate}
                                </h1>
                            </div>

                            {dropDowns[index] && (
                                <div className="flex items-center justify-between w-full mt-4">
                                    <div>
                                        {event.eventDescription}
                                    </div>
                                    <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-5 py-2">
                                        Withdraw
                                    </button>
                                </div>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            <h1 className="text-4xl mt-5">Volunteering History</h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md mb-8 mt-5">
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
        </div>
    )
}