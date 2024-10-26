import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../middleware/user-vertification"
// import {FaMagnifyingGlass} from "react-icons/fa6";

export default function EventList(){
    const {isAdmin} = useAuth();
    const [eventList, setEventList] = useState([]);
    const [dropDowns, setDropDowns] = useState(
        new Array(eventList.length).fill(false)
    );

    useEffect(() => {
        axios.get("http://localhost:3001/api/events/getallevents")
            .then(response => {
                setEventList(response.data); 
                setDropDowns(new Array(response.data.length).fill(false)); 
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
            });
    }, []);

    const toggleDropdown = (index) => {
        const updatedDropdowns = [...dropDowns];
        updatedDropdowns[index] = !updatedDropdowns[index];
        setDropDowns(updatedDropdowns);
    }

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "high":
                return "bg-red-200";   // Red for high urgency
            case "medium":
                return "bg-yellow-200"; // Yellow for medium urgency
            case "low":
                return "bg-green-200";  // Green for low urgency
            default:
                return "bg-gray-300";   // Default color for unknown urgency
        }
    }

    const handleApply = (e, index) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/users/eventapply", eventList[index])
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
        // console.log(eventList[index]);
    }

    return(
        <div className="min-h-screen relative">
            <div className="h-2/5 absolute inset-x-0 top-0 flex items-end justify-center">
                <div>
                    <div className="text-5xl font-light text-center mb-10">
                        Search for Events here.
                    </div>
                    <div className="flex gap-3">
                        <input 
                            className="bg-gray-300 placeholder-black px-5 py-2 rounded-md w-[54rem] flex items-center gap-3"
                            type="text"
                            placeholder="Search for Events"
                        />
                        {isAdmin ? (
                            <a className="bg-gray-300 hover:bg-gray-400 rounded-md px-5 flex items-center" href="/eventform">
                                Add Event
                            </a>
                        ) : (null)}
                    </div>
                </div>
            </div>
            <div className="h-3/5 absolute inset-x-0 bottom-0 flex justify-center py-3">
                <ul className="mt-4 flex flex-col gap-3 overflow-auto">
                    {eventList.map((event, index) => (
                    <li key={index}>
                        <button className="bg-gray-200 hover:bg-gray-300 w-[72rem] p-5 rounded-md flex flex-col items-center justify-between" onClick={() => toggleDropdown(index)}>
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-3xl font-light">
                                    {event.eventName}
                                </h1>
                                <div className={`rounded-full ${getUrgencyColor(event.urgency)} w-7 h-7 flex justify-center items-center font-semibold text-xl`}>
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
                                    <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-5 py-2" onClick={(e) => handleApply(e, index)}>
                                        Apply
                                    </button>
                                </div>
                            )}
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}