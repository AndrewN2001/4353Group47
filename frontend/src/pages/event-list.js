import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../middleware/user-vertification"
// import {FaMagnifyingGlass} from "react-icons/fa6";

export default function EventList(){
    const {loggedUser, isAdmin, darkMode} = useAuth();
    const [eventList, setEventList] = useState([]);
    const [attendedEvents, setAttendedEvents] = useState([]);
    const [dropDowns, setDropDowns] = useState(
        new Array(eventList.length).fill(false)
    );

    useEffect(() => {
        const userID = loggedUser.userID;
        axios.all([
            axios.get("http://localhost:3001/api/events/getallevents"),
            axios.get(`http://localhost:3001/api/users/profile/${userID}`)
        ])
        .then(axios.spread((eventsResponse, userResponse) => {
            setEventList(eventsResponse.data); 
            setDropDowns(new Array(eventsResponse.data.length).fill(false));
            setAttendedEvents(userResponse.data.attendedEvents);
        }))
        .catch(error => {
            console.error("There was an error fetching the events!", error);
        });
    }, []);

    useEffect(() => {
        console.log(attendedEvents);
    }, [attendedEvents]);

    const toggleDropdown = (index) => {
        const updatedDropdowns = [...dropDowns];
        updatedDropdowns[index] = !updatedDropdowns[index];
        setDropDowns(updatedDropdowns);
    }

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "High":
                return "bg-red-200";   // Red for high urgency
            case "Medium":
                return "bg-yellow-200"; // Yellow for medium urgency
            case "Low":
                return "bg-green-200";  // Green for low urgency
            default:
                return "bg-gray-300";   // Default color for unknown urgency
        }
    }

    const handleApply = (e, index) => {
        e.preventDefault();
        const userId = loggedUser.userID;
        axios.post(`http://localhost:3001/api/events/eventapply/${userId}`, eventList[index])
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div className={`min-h-screen relative ${darkMode ? "bg-gray-900" : null}`}>
            <div className="h-2/5 absolute inset-x-0 top-0 flex items-end justify-center">
                <div>
                    <div className={`${darkMode ? "text-gray-300" : null} text-5xl font-light text-center mb-10`}>
                        Search for Events here.
                    </div>
                    <div className="flex gap-3">
                        <input 
                            className={`${darkMode ? "bg-gray-700 placeholder-gray-300 text-gray-300" : "bg-gray-300"} placeholder-black px-5 py-2 rounded-md w-[54rem] flex items-center gap-3`}
                            type="text"
                            placeholder="Search for Events"
                        />
                        {isAdmin ? (
                            <a className={`${darkMode ? "bg-gray-600 text-gray-300 hover:bg-gray-700" : "bg-gray-300"} hover:bg-gray-400 rounded-md px-5 flex items-center`} href="/eventform">
                                Add Event
                            </a>
                        ) : (null)}
                    </div>
                </div>
            </div>
            <div className="h-3/5 absolute inset-x-0 bottom-0 flex justify-center py-3">
                <ul className="mt-4 flex flex-col gap-2 overflow-auto">
                    {eventList.map((event, index) => (
                    <li key={index}>
                        <button className={`${darkMode? "bg-gray-800" :"bg-gray-200 hover:bg-gray-300"} w-[72rem] p-5 ${dropDowns[index] ? "rounded-t-md" : "rounded-md"} flex flex-col items-center justify-between`} onClick={() => toggleDropdown(index)}>
                            <div className="flex items-center justify-between w-full">
                                <h1 className={`text-3xl font-light text-gray-300`}>
                                    {event.eventName}
                                </h1>
                                <div className={`rounded-full ${getUrgencyColor(event.urgency)} w-7 h-7 flex justify-center items-center font-semibold text-xl`}>
                                    !
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-between">
                                <h1 className={`${darkMode ? "text-gray-400" : "text-gray-700"} font-light`}>
                                    {event.location.city}, {event.location.state}
                                </h1>
                                <h1 className="text-gray-700 font-light text-sm">
                                    {event.eventDate}
                                </h1>
                            </div>
                        </button>

                        {dropDowns[index] && (
                            <div className={`flex flex-col items-center justify-between w-full gap-2 ${darkMode? "bg-gray-700" : "bg-gray-300"} rounded-b-md px-5 py-4 mb-2`}>
                                <div className={`w-full text-left ${darkMode ? "text-gray-300" : null}`}>
                                    {event.eventDescription}
                                </div>
                                <div className="flex items-center w-full justify-between bg-gray">
                                    <div className="flex gap-3">
                                        {event.requiredSkills.map((skill, index) => (
                                            <h1 key={index} className="bg-gray-400 px-3 py-2 text-sm rounded-md">
                                                {skill}
                                            </h1>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-5">
                                        {isAdmin ? (
                                            <div className="flex gap-5">
                                                <button className="text-primaryblue hover:underline hover:underline-offset-2">
                                                    Update
                                                </button>
                                                <button className="text-primaryblue hover:underline hover:underline-offset-2">
                                                    Remove
                                                </button>
                                            </div>
                                        ) : null}

                                        {attendedEvents.includes(event._id) ? (
                                            <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-5 py-2">
                                                Applied
                                            </button>
                                        ) : (
                                        <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-5 py-2" onClick={(e) => handleApply(e, index)}>
                                            Apply
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}