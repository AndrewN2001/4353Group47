import React, {useState} from "react"
import axios from "axios";

export default function Notifications(){
    const [notifications, setNotifications] = useState({
        newAssignments: true,
        newUpdates: true,
        newReminders: true
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(notifications);
        const userID = "someUserId";
        axios.post(`http://localhost:3001/api/users/notifications/${userID}`, {notifications})
        .then(result => {
            console.log(result);
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
                                checked={notifications.newAssignments}
                                className="sr-only peer"
                                onChange={(e) => setNotifications({...notifications, newAssignments: e.target.checked})}
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
                                checked={notifications.newUpdates}
                                className="sr-only peer"
                                onChange={(e) => setNotifications({...notifications, newUpdates: e.target.checked})}
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
                                checked={notifications.newReminders}
                                className="sr-only peer"
                                onChange={(e) => setNotifications({...notifications, newReminders: e.target.checked})}
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