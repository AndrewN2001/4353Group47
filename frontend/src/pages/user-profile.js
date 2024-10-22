import React, { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoClose, IoCalendarClear } from "react-icons/io5";
import Notifications from "../components/notifications";
import Events from "../components/my-events";
import axios from "axios"
import {useAuth} from "../middleware/user-vertification";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const navigate = useNavigate();
    const {loggedUser, logout, setAdmin} = useAuth();

    // list of states, needs to be reduced using the hook useReducer
    const [selectedPage, setSelected] = useState("dashboard")
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false); // toggle for the button
    const [newSkill, setNewSkill] = useState('');
    const [currentUserInfo, setCurrentInfo] = useState({})
    const [skills, setSkills] = useState([]); // currentSkills
    const [newValues, setNewValues] = useState({}); // list of new userInfo

    useEffect(() => {
        const userId = loggedUser.userID; // Replace with actual user ID when DB is connected
        axios.get(`http://localhost:3001/api/users/profile/${userId}`)
            .then(response => {
                console.log(response.data);
                setCurrentInfo({
                    name: response.data.name,
                    location: response.data.location,
                    emailAddress: response.data.emailAddress,
                    phoneNumber: response.data.phoneNumber
                })
                setSkills(response.data.skills);
                setUserData(response.data);
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

    const handleAddSkill = async () => {
        const userID = loggedUser.userID;
        console.log("New skill to be added:", newSkill);
        try{
            axios.put(`http://localhost:3001/api/users/${userID}/addSkill`, {newSkill})
            .then(response => {
                setSkills((prevSkills) => [...prevSkills, newSkill]);
                setNewSkill('')
            })
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    }

    const handleRemoveSkill = async (skill) => {
        const userID = loggedUser.userID;
        console.log("Skill to be removed:", skill)
        try{
            axios.delete(`http://localhost:3001/api/users/${userID}/removeSkill/${skill}`)
            .then(response => {
                console.log(response);
                setSkills(prevSkills => prevSkills.filter(s => s !== skill)) // filters out by returning every skill that's not the removed skill
            })
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    }

    const handleLogOut = () => {
        logout();
        navigate('/');
    }
    
    const toggleUpdateInfo = () => {
        setUpdateInfo(prevState => !prevState);
    }

    const handleInfoChange = async (field, newInfo) =>{
        console.log("Field to be updated:", field);
        
        setNewValues((prevData) => {
            switch (field){
                case "name":
                    console.log("New Name to be added: ", newInfo);
                    const [firstName, lastName] = newInfo.split(" ");
                    return {
                        ...prevData,
                        name: {firstName, lastName}
                    }
                case "location":
                    console.log("New location to be added: ", newInfo);
                    const [city, state] = newInfo.split(" ");
                    return {
                        ...prevData,
                        location: {city, state}
                    }
                case "emailAddress":
                    console.log("New email to be added: ", newInfo);
                    return{
                        ...prevData,
                        emailAddress: newInfo
                    }
                case "phoneNumber":
                    console.log("New phone number to be added: ", newInfo)
                    return{
                        ...prevData,
                        emailAddress: newInfo
                    }
                default:
                    return prevData;
            }
        })

        console.log("Info to be updated:", newValues);
    }

    const submitInfoChange = async () => {
        const userID = loggedUser.userID;
        // console.log(newInfo, userID);
        axios.put(`http://localhost:3001/api/users/${userID}/editInfo`, {newValues})
        .then(response => {
            console.log(response);
            setCurrentInfo({
                name: response.data.name,
                location: response.data.location,
                emailAddress: response.data.emailAddress,
                phoneNumber: response.data.phoneNumber
            })
        })
        setUpdateInfo(false);
    }

    const days = [
        { name: "Sunday", key: "sunday" },
        { name: "Monday", key: "monday" },
        { name: "Tuesday", key: "tuesday" },
        { name: "Wednesday", key: "wednesday" },
        { name: "Thursday", key: "thursday" },
        { name: "Friday", key: "friday" },
        { name: "Saturday", key: "saturday" },
    ]

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
        // navigate('/login');
    }

    return (
        <div>
            <div className="sm:w-[40rem] md:w-full flex-grow px-28 flex items-center font-extralight">
                <div className="min-w-[20rem] w-full min-h-screen bg-white shadow-md grid grid-rows-3 grid-cols-4">
                    <div id="username_info" className="border-r-2 row-span-3 col-span-1 flex flex-col items-center h-full min-w-fit">
                        <div className="h-1/2 w-full flex flex-col gap-7 mt-24 px-10">
                            <div id="user_picture" className="bg-gray-500 h-96 w-full flex justify-center items-center">
                                <img src={userData.imageUrl} alt="User" />
                            </div>

                            <div className="text-center">
                                <h1 className="text-4xl text-nowrap">
                                    {currentUserInfo.name.firstName + " " + currentUserInfo.name.lastName}
                                </h1>
                                <h2 className="mt-2 text-lg">
                                    {userData.role}
                                </h2>
                            </div>
                        </div>


                        <div id="page_selection" className="h-1/2 w-full flex justify-center items-end pb-7">
                            <ul className="text-2xl flex flex-col w-full">
                                <li>
                                    <button className={`flex gap-2 items-center justify-center ${selectedPage === "dashboard" ? "bg-primaryblue-light" : ""} hover:bg-primaryblue-light w-full py-3`} onClick={() => setSelected("dashboard")}>
                                        <BsPersonFill />
                                        User Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex gap-2 items-center justify-center ${selectedPage === "events" ? "bg-primaryblue-light" : ""} hover:bg-primaryblue-light w-full py-3`} onClick={() => setSelected("events")}>
                                        <IoCalendarClear />
                                        Events
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex gap-2 items-center justify-center ${selectedPage === "notifications" ? "bg-primaryblue-light" : ""} hover:bg-primaryblue-light w-full py-3`} onClick={() => setSelected("notifications")}>
                                        <IoIosNotifications />
                                        Notifications
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex gap-2 items-center justify-center hover:bg-primaryblue-light w-full py-3`} onClick={handleLogOut}>
                                    <IoClose />
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
                                                {updateInfo ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new name:"
                                                        className="text-right"
                                                        onChange={(e) => handleInfoChange("name", e.target.value)}
                                                    />
                                                ) : (
                                                    currentUserInfo.name.firstName + " " + currentUserInfo.name.lastName
                                                )}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Location
                                            </h1>
                                            <h1 className="font-light">
                                                {updateInfo ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new location:"
                                                        className="text-right"
                                                        onChange={(e) => handleInfoChange("location", e.target.value)}
                                                    />
                                                ) : (
                                                    currentUserInfo.location.city + ", " + currentUserInfo.location.state
                                                )}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Email
                                            </h1>
                                            <h1 className="font-light">
                                                {updateInfo ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new email address:"
                                                        className="text-right w-72"
                                                        onChange={(e) => handleInfoChange("emailAddress", e.target.value)}
                                                    />
                                                ) : (
                                                    currentUserInfo.emailAddress
                                                )}
                                            </h1>
                                        </li>
                                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                            <h1 className="font-semibold">
                                                Phone Number
                                            </h1>
                                            <h1 className="font-light">
                                                {updateInfo ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new phone number:"
                                                        className="text-right"
                                                        onChange={(e) => handleInfoChange("phoneNumber", e.target.value)}
                                                    />
                                                ) : (
                                                    currentUserInfo.phoneNumber
                                                )}
                                            </h1>
                                        </li>
                                    </ul>
                                    <button className="mt-7 py-2 px-8 bg-primaryblue hover:bg-primaryblue-light text-white font-semibold shadow-md rounded-sm" onClick={updateInfo ? submitInfoChange : toggleUpdateInfo}>
                                        {updateInfo ? "Save" : "Edit"}
                                    </button>
                                </div>
                            </div>
                            <div id="skills" className="col-span-3 border-t-2 p-7">
                                <div className="flex items-center gap-5 mb-5">
                                    <h1 className="text-4xl">
                                        Skills
                                    </h1>

                                    <div className="flex gap-2">
                                        <input 
                                            className="bg-gray-300 pr-10 pl-2 py-1 placeholder-black" 
                                            placeholder="Create a new skill..."
                                            onChange={(e) => setNewSkill(e.target.value)}
                                        />
                                        <button className="bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded-md" onClick={handleAddSkill}>
                                            Add Skill
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-300 min-h-60 rounded-sm p-3">
                                    <ul className="flex gap-3">
                                        {skills.map((skill, index) => (
                                            <li key={index} className="px-3 py-2 bg-gray-400 text-black rounded-md flex items-center gap-3">
                                                {skill}
                                                <button className="hover:bg-gray-300 rounded-full" onClick={() => handleRemoveSkill(skill)}>
                                                    <IoClose className="text-sm"/>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div id="availability" className="col-span-3 border-t-2 p-7 flex flex-col">
                                <h1 className="text-4xl">
                                    Availability
                                </h1>

                                <ul className="grid grid-cols-7 gap-3 mt-5 h-3/5">
                                    {days.map((day) => (
                                        <li key={day.key} className="bg-gray-300 text-center flex flex-col">
                                            <h1 className="py-2">
                                                {day.name}
                                            </h1>

                                            <div className="h-full text-2xl text-center flex justify-center items-center">
                                                <div className="max-w-fit text-left flex flex-col gap-5 my-5">
                                                    <div>
                                                        <h1>From:</h1>
                                                        <h2>{userData.availability[day.key].start}</h2>
                                                    </div>
                                                    <div>
                                                        <h1>To:</h1>
                                                        <h2>{userData.availability[day.key].end}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-7 py-2 px-8 w-min bg-primaryblue hover:bg-primaryblue-light text-white font-semibold shadow-md rounded-sm">
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                    {selectedPage === "notifications" && (
                        <div className="row-span-3 col-span-1">
                            <Notifications />
                        </div>
                    )}

                    {selectedPage === "events" && (
                        <div className="col-span-3 row-span-2">
                            <Events/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}