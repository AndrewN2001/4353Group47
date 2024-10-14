import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Dashboard from "../components/fullinfo";
import Notifications from "../components/notifications";
import axios from "axios"
import {useAuth} from "../middleware/user-vertification";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const navigate = useNavigate();
    const [selectedPage, setSelected] = useState("dashboard")
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {logout, setIsAdmin, isAdmin, setAdmin} = useAuth();

    useEffect(() => {
        const userId = "someUserId"; // Replace with actual user ID when DB is connected
        axios.get(`http://localhost:3001/api/users/profile/${userId}`)
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
                if (response.data.role === "Admin"){
                    setAdmin(true);
                } else{
                    setAdmin(false);
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin]);

    const handleLogOut = () => {
        logout();
        navigate('/');
    }

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
        // navigate('/login');
    }

    return (
        <div>
            <div className="sm:w-[40rem] md:w-full flex-grow px-28 flex items-center font-extralight">
                <div className="min-w-[20rem] w-full min-h-screen bg-white shadow-md grid grid-rows-3 grid-cols-4">

                    <div id="username_info" className="border-r-2 row-span-3 col-span-1 flex flex-col items-center px-10 h-full min-w-fit">
                        <div className="h-1/2 w-full flex flex-col gap-7 mt-24">
                            <div id="user_picture" className="bg-gray-500 h-96 w-full flex justify-center items-center">
                                <img src={userData.imageURL} alt="User" />
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
                                    <BsPersonFill />
                                    <button onClick={() => setSelected("dashboard")}>
                                        User Dashboard
                                    </button>
                                </li>
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <IoIosNotifications />
                                    <button onClick={() => setSelected("notifications")}>
                                        Notifications
                                    </button>
                                </li>
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <IoClose />
                                    <button onClick={handleLogOut}>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {selectedPage === "dashboard" && (
                        <div className="col-span-3 row-span-3">
                            <div id="userInformation" className="col-span-3 p-7 mt-16">
                                <h1 className="text-4xl">
                                    Full Information
                                </h1>

                                <div className="bg-white">
                                    <ul className="mt-9">
                                        <li className="border-b-2 h-10 flex items-center justify-between">
                                            <h1 className="font-semibold">
                                                Full Name
                                            </h1>
                                            <h1 className="font-light">
                                                {userData.name}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Address
                                            </h1>
                                            <h1 className="font-light">
                                                {userData.address}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Email
                                            </h1>
                                            <h1 className="font-light">
                                                {userData.email}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Phone Number
                                            </h1>
                                            <h1 className="font-light">
                                                {userData.phoneNumber}
                                            </h1>
                                        </li>
                                    </ul>
                                    <button className="mt-7 py-2 px-8 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md rounded-sm">
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div id="skills" className="col-span-3 border-t-2 p-7">
                                <div className="flex items-center gap-5 mb-5">
                                    <h1 className="text-4xl">
                                        Skills
                                    </h1>
                                    <input placeholder="Search for a Skill:" className="h-10 pl-3 pr-36 bg-gray-200" />
                                </div>

                                <div className="w-full bg-gray-300 min-h-60">
                                    <ul>
                                        {userData.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div id="availability" className="col-span-3 border-t-2 p-7 flex flex-col">
                                <h1 className="text-4xl">
                                    Availability
                                </h1>

                                <ul className="grid grid-cols-7 gap-3 mt-5 h-3/5">
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Sunday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.sunday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.sunday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Monday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.monday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.monday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Tuesday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.tuesday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.tuesday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Wednesday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.wednesday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.wednesday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Thursday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className=" max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.thursday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.thursday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Friday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.friday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.friday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li className="bg-gray-300 text-center flex flex-col">
                                        <h1 className="py-2 ">
                                            Saturday
                                        </h1>

                                        <div className="h-full text-2xl text-center flex justify-center items-center">
                                            <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                <div>
                                                    <h1>From:</h1>
                                                    <h2>{userData.availability.saturday.start}</h2>
                                                </div>
                                                <div>
                                                    <h1>To:</h1>
                                                    <h2>{userData.availability.saturday.end}</h2>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {selectedPage === "notifications" && (
                        <div className="row-span-3 col-span-1">
                            <Notifications />
                        </div>
                    )}
                </div>
            </div>

            <div className="min-w-screen h-10 bg-gray-500"></div>
        </div>
    )
}