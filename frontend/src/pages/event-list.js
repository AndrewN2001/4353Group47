import React, {useState, useEffect} from "react";
import {useAuth} from "../middleware/user-vertification"
import {FaMagnifyingGlass} from "react-icons/fa6";

export default function EventList(){
    const {isAdmin} = useAuth();
    const [eventList, setEventList] = useState([
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
    ]);

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

    useEffect(() => {
        console.log(isAdmin);
    }, [isAdmin]);

    return(
        <div className="min-h-screen relative">
            <div className="h-1/2 absolute inset-x-0 top-0 flex items-end justify-center">
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
                    ) : null}
                </div>
            </div>
            <div className="h-1/2 absolute inset-x-0 bottom-0 flex justify-center">
                <ul className="mt-4 flex flex-col gap-3">
                    {eventList.map((event, index) => (
                    <li key={index} className="bg-gray-200 w-[72rem] py-5 px-5 rounded-md flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-light">
                                {event.eventName}
                            </h1>
                            <h1 className="text-gray-700 font-light">
                                {event.location}
                            </h1>
                        </div>

                        <div className={`rounded-full ${getUrgencyColor(event.urgency)} w-7 h-7 flex justify-center items-center font-semibold text-xl`}>
                            !
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}