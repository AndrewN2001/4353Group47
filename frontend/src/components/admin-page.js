import React, {useEffect, useState} from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useAuth } from "../middleware/user-vertification";
import axios from "axios";

export default function AdminPage(){
    const [selectedData, setSelectedData] = useState("volunteers");
    const [userList, setUserList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const {loggedUser} = useAuth();
    
    const handleDownload = (fileType) => {
        if (fileType === "pdf") {
            console.log("User wants to download a PDF.", selectedData);
        } else if (fileType === "csv") {
            console.log("User wants to download a CSV.", selectedData);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/users/data")
        .then(response => {
            setUserList(response.data.volunteers);
            setEventList(response.data.events);
        })
    }, [])

    useEffect(() => {
        console.log(userList);
        console.log(eventList);
    }, [userList, eventList])

    const [dropdowns, setDropdowns] = useState(
        new Array(userList.length).fill(false)
    )

    const toggleDropdown = (index) => {
        const updatedDropdowns = [...dropdowns];
        updatedDropdowns[index] = !updatedDropdowns[index];
        setDropdowns(updatedDropdowns);
    }

    return(
        <div className="w-full h-full px-7 pt-24">
            <h1 className="text-4xl">
                Retrieve Reports
            </h1>

            <div className="w-full h-full mt-5 border border-gray-300 flex flex-col">
                <div className="flex justify-around">
                    <button className={`${selectedData === "volunteers" ? "bg-gray-300" : "bg-gray-200"} hover:bg-gray-300 py-3 h-full w-full`} onClick={() => setSelectedData("volunteers")}>
                       Volunteers
                    </button>

                    <button className={`${selectedData === "events" ? "bg-gray-300" : "bg-gray-200"} hover:bg-gray-300 py-3 h-full w-full`} onClick={() => setSelectedData("events")}>
                        Events
                    </button>
                </div>

                <div className="h-full">
                    {selectedData === "volunteers" && (
                        <ul className="px-5 flex flex-col gap-2 mt-3">
                            {userList
                            .filter((user) => user.role === "Volunteer")
                            .map((user, index) => (
                                <li key={index}>
                                    <div className="bg-gray-200 hover:bg-gray-300 w-full min-w-48 p-5 flex justify-between">
                                        <div className="flex flex-col">
                                            <h1 className="text-3xl">
                                                {user.name.firstName + ' ' + user.name.lastName}
                                            </h1>
                                            <h2 className="text-sm text-gray-500 mt-1">
                                                {user.emailAddress + ' | Attended Events: ' + user.attendedEvents.length}
                                            </h2>
                                        </div>
                                        
                                        <button data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" className="text-2xl" onClick={() => toggleDropdown(index)}>
                                            {dropdowns[index] ? (
                                                <MdOutlineExpandMore/>
                                            ) : (
                                                <MdOutlineExpandLess/>
                                            )}
                                        </button>
                                    </div>

                                    {!dropdowns[index] ? (
                                        <div className="bg-gray-400 rounded-b-md px-5 py-2">
                                            <h1>
                                                List of Events:
                                            </h1>

                                            <ul>
                                                {user.attendedEvents.map((eventId, index) => {
                                                    const event = eventList.find((event) => event._id === eventId)

                                                    return(
                                                        <li key={index}>
                                                            {event ? event.eventName : "Event Not Found"}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    {selectedData === "events" && (
                        <ul className="px-5 flex flex-col gap-2 mt-3">
                            {eventList.map((event) => (
                                <li key={event.id} className="bg-gray-200 hover:bg-gray-300 w-full min-w-48 p-5 flex flex-col justify-between">
                                    <h1 className="text-2xl">
                                        {event.eventName}
                                    </h1>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex justify-center gap-3 mt-5">
                <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-4 py-2" onClick={() => handleDownload("pdf")}>
                    Retrieve PDF
                </button>

                <button className="bg-primaryblue hover:bg-primaryblue-light text-white px-4 py-2" onClick={() => handleDownload("csv")}>
                    Retrieve CSV
                </button>
            </div>
        </div>
    )
}