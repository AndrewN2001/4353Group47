import React, {useState, useEffect} from "react"
import { useAuth } from "../middleware/user-vertification";
import axios from "axios";

export default function Notifications(){
    const {loggedUser} = useAuth();
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState({
        newEventAssignments: true,
        newEventUpdates: true,
        newEventReminders: true
    })

    useEffect(() => {
        const userID = loggedUser.userID;
        axios.get(`http://localhost:3001/api/users/getNotifications/${userID}`)
        .then(response => {
            setNotifications(response.data);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    const handleBoxChange = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key] : !prev[key],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(notifications);
        const userID = loggedUser.userID;
        axios.post(`http://localhost:3001/api/users/updateNotifications/${userID}`, {notifications})
        .then(result => {
            setNotifications(result.data);
            alert("Notifications updated!");
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        })
    }

    return(
        <div className="mt-24 pl-7 col-span-1 w-fit">
            <h1 className="text-4xl text-nowrap">
                Notification Settings
            </h1>

            <div className="mt-10">
                <form className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <h1 className="text-xl py-3">
                            New Event Assignments
                        </h1>
                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                value=""
                                checked={notifications.newEventAssignments}
                                className="sr-only peer"
                                onChange={() => handleBoxChange("newEventAssignments")}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                    
                    <div className="flex justify-between">
                        <h1 className="text-xl py-3">
                            New Event Updates
                        </h1>

                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                value=""
                                checked={notifications.newEventUpdates}
                                className="sr-only peer"
                                onChange={() => handleBoxChange("newEventUpdates")}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                    
                    <div className="flex justify-between">
                        <h1 className="text-xl py-3">
                            New Event Reminders
                        </h1>

                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                value=""
                                checked={notifications.newEventReminders}
                                className="sr-only peer"
                                onChange={() => handleBoxChange("newEventReminders")}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                </form>
            </div>

            <button className="bg-primaryblue hover:bg-primaryblue text-white py-3 px-10 rounded-md mt-10" onClick={handleSubmit}>
                <p className="font-bold">Save</p>
            </button>
        </div>
    )
}