import React, {useState, useEffect} from "react";
import {BsPersonFill} from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Dashboard from "../components/fullinfo";
import Skills from "../components/skills";
import FullInfo from "../components/fullinfo";
import Availability from "../components/availability";
import Notifications from "../components/notifications";
import axios from "axios"

export default function UserProfile(){
    const [selectedPage, setSelected] = useState("dashboard")
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = "someUserId"; // Replace with actual user ID when DB is connected
        axios.get(`http://localhost:3001/api/users/profile/${userId}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <div className="min-w-screen w-full flex-grow h-10 bg-gray-500"></div>

            <div className="sm:w-[40rem] md:w-full flex-grow px-28 flex items-center font-extralight">
                <div className="min-w-[20rem] w-full min-h-screen bg-white shadow-md grid grid-rows-3 grid-cols-4">
                    
                    <div id="username_info" className="border-r-2 row-span-3 col-span-1 flex flex-col items-center px-10 h-full min-w-fit">
                        <div className="h-1/2 w-full flex flex-col justify-around">
                            <div id="user_picture" className="bg-gray-500 h-96 mt-5 w-full flex justify-center items-center">
                                <img src={userData.imageURL} alt = "User"/>
                            </div>

                            <div className="text-center">
                                <h1 className="text-4xl text-nowrap">
                                    {userData.name}
                                </h1>
                                <h2>
                                    {userData.role}
                                </h2>
                            </div>
                        </div>
                        

                        <div id="page_selection" className="h-1/2 w-full flex justify-center items-end pb-7">
                            <ul className="text-2xl flex flex-col w-full">
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <BsPersonFill/>
                                    <button onClick={() => setSelected("dashboard")}>
                                        User Dashboard
                                    </button>
                                </li>
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <IoIosNotifications/>
                                    <button onClick={() => setSelected("notifications")}>
                                        Notifications
                                    </button>
                                </li>
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <IoClose/>
                                    <button>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {selectedPage === "dashboard" && (
                        <div className="col-span-3 row-span-3">
                            <FullInfo/>
                            <Skills/>
                            <Availability/>
                        </div>
                    )}
                    {selectedPage === "notifications" && (
                        <div className="row-span-3 col-span-1">
                            <Notifications/>
                        </div>
                    )}
                </div>
            </div> 

            <div className="min-w-screen h-10 bg-gray-500"></div>
        </div>
    )
}