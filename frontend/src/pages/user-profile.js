import React, {useState} from "react";
import {BsPersonFill} from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function UserProfile(){
    const [userData, setUserData] = useState({
        fullName: "Andrew Nguyen",
        address: {
            city: "La Porte",
            state: "TX",
        },
        email: "andrew.nguyen.ta@gmail.com",
        phoneNumber: "(832) 530-0481"
    });
    const [dateSelect, setDateSelect] = useState("");
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleDateSelect = (e) =>{

    }
    return(
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-4/5 h-4/5 bg-white shadow-xl rounded-lg flex">
                <div id="User Profile" className="w-[30%] h-full border-r-2">
                    <div className="h-1/2 relative">
                        <div className="absolute flex flex-col text-center inset-x-0 gap-2 bottom-0 pb-20">
                            <div className="bg-gray-200 h-72 mx-8 my-4 flex justify-center items-center rounded-md">
                                Insert Picture Here
                            </div>
                            <h1 className="text-4xl font-extralight text-gray-600">
                                Andrew Nguyen
                            </h1>
                            <h2 className="text-gray-400">
                                Volunteer
                            </h2>
                        </div>
                    </div>

                    <div className="h-1/2 flex justify-center pt-10 relative">
                        <ul className="text-center absolute bottom-0 pb-14 font-extralight">
                            <li className="hover:bg-blue-500 rounded-lg">
                                <button className="py-3 px-10 flex items-center justify-center gap-3 text-xl text-gray-600 hover:text-white">
                                    <BsPersonFill className="text-2xl"/>
                                    User Dashboard
                                </button>
                            </li>
                            <li className="hover:bg-blue-500 rounded-lg">
                                <button className="py-3 px-10 flex items-center justify-center gap-3 text-xl text-gray-600 hover:text-white">
                                    <IoIosNotifications className="text-2xl"/>
                                    Notifications
                                </button>
                            </li>
                            <li className="hover:bg-blue-500 rounded-lg">
                                <button className="py-3 px-10 flex items-center justify-center gap-3 text-xl text-gray-600 hover:text-white">
                                    <IoIosNotifications className="text-2xl"/>
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="User Information" className="w-3/4">
                    <div className="h-2/5 py-8 flex flex-col justify-around">
                        <h1 className="pl-7 text-3xl text-gray-800 font-extralight">
                            User Profile
                        </h1>

                        <div className="bg-white px-7">
                            <ul className="">
                                <li className="border-b-2 h-10 flex items-center justify-between text-gray-700">
                                    <h1 className="font-semibold">
                                        Full Name
                                    </h1>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userData.fullName}
                                            className="p-1 border text-right w-1/2"
                                        />
                                    ) : (
                                        <h1 className="font-light">
                                            {userData.fullName}
                                        </h1>
                                    )}
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                                    <h1 className="font-semibold">
                                        Address
                                    </h1>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={`${userData.address.city}, ${userData.address.state}`}
                                            className="p-1 border text-right w-1/2"
                                        />
                                    ) : (
                                        <h1 className="font-light">
                                            {`${userData.address.city}, ${userData.address.state}`}
                                        </h1>
                                    )}
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                                    <h1 className="font-semibold">
                                        Email
                                    </h1>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={userData.email}
                                            className="p-1 border text-right w-1/2"
                                        />
                                    ) : (
                                        <h1 className="font-light">
                                            {userData.email}
                                        </h1>
                                    )}
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                                    <h1 className="font-semibold">
                                        Phone Number
                                    </h1>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={userData.phoneNumber}
                                            className="p-1 border text-right w-1/2"
                                        />
                                    ) : (
                                        <h1 className="font-light">
                                            {userData.phoneNumber}
                                        </h1>
                                    )}

                                </li>
                            </ul>

                            <button className="mt-7 py-2 px-8 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md rounded-sm" onClick={toggleEditMode}>
                                {isEditing ? "Save" : "Edit"}
                            </button>
                        </div>
                    </div>

                    <div className="h-3/5 font-extralight">
                        <div id="skills" className="h-1/2 py-8 border-t-2">
                            <h1 className="pl-7 text-3xl h-fit text-gray-800 flex items-center">
                                Skills
                                <input className="ml-5 pl-2 text-base py-1 w-96 bg-gray-200" value="Search for Skill..."/>
                            </h1>
                            <div className="mx-7 pl-3 mt-2 h-5/6 rounded-lg bg-gray-300 mb-5">
                                <ul className="pl-3 pt-5 flex gap-2">
                                    <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                        C++
                                        <button>
                                            <IoClose />
                                        </button>
                                    </li>
                                    <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                        Python
                                        <button>
                                            <IoClose />
                                        </button>
                                    </li>
                                    <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                        Javascript
                                        <button>
                                            <IoClose />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div id="Availability" className="h-1/2 border-t-2">
                            <h1 className="text-3xl pt-8 pl-7 text-gray-800">
                                Availability
                            </h1>

                            <div id="day-grid" className="mt-3 mx-4 h-full">
                                <ul className="flex rounded-md justify-around h-full">
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Sunday
                                            </button>

                                            <form className="mt-3 ml-3 flex flex-col font-light">
                                                <label for="from">From:</label>
                                                <input
                                                    type="text"
                                                    className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                                    value="5:00 PM"
                                                />
                                                <label for="to" className="mt-2">To:</label>
                                                <input
                                                    type="text"
                                                    className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                                    value="12:00 AM"
                                                />
                                            </form>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Monday
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Tuesday
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Wednesday
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Thursday
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Friday
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-gray-200 h-3/5 rounded-md">
                                            <button className="bg-gray-300 py-2 px-7 rounded-md hover:bg-gray-200">
                                                Saturday
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}