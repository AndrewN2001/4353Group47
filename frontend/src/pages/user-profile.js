import React, {useState} from "react";
import {BsPersonFill} from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function UserProfile(){
    const [selectedPage, setSelected] = useState("Dashboard")

    const toggleSelected = () => {

    }

    return(
        <div>
            <div className="min-w-screen w-full flex-grow h-10 bg-gray-500"></div>

            <div className="sm:w-[40rem] md:w-full flex-grow px-28 flex items-center font-extralight">
                <div className="min-w-[20rem] w-full min-h-screen bg-white shadow-md grid grid-rows-3 grid-cols-4">
                    <div id="username_info" className="border-r-2 row-span-3 col-span-1 flex flex-col items-center px-10 h-full min-w-fit">
                        <div className="h-1/2 w-full flex flex-col justify-around">
                            <div id="user_picture" className="bg-slate-500 h-96 mt-5 w-full flex justify-center items-center">
                                Insert Image Here
                            </div>

                            <div className="text-center">
                                <h1 className="text-4xl">
                                    Andrew Nguyen
                                </h1>
                                <h2>
                                    Volunteer
                                </h2>
                            </div>
                        </div>
                        

                        <div id="page_selection" className="h-1/2 w-full flex justify-center items-end pb-7">
                            <ul className="text-2xl flex flex-col w-full">
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <BsPersonFill/>
                                    <button>
                                        User Dashboard
                                    </button>
                                </li>
                                <li className="flex gap-2 items-center justify-center hover:bg-blue-500 w-full py-3">
                                    <IoIosNotifications/>
                                    <button>
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
                    
                    <div className="col-span-3 p-7">
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
                                        Andrew Nguyen
                                    </h1>
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                    <h1 className="font-semibold">
                                        Address
                                    </h1>
                                    <h1 className="font-light">
                                        10924 Fairwood Dr, La Porte, TX 77571
                                    </h1>
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                    <h1 className="font-semibold">
                                        Email
                                    </h1>
                                    <h1 className="font-light">
                                        andrew.nguyen.ta@gmail.com
                                    </h1>
                                </li>
                                <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                                    <h1 className="font-semibold">
                                        Phone Number
                                    </h1>
                                    <h1 className="font-light">
                                        (832) 530-0481
                                    </h1>
                                </li>
                            </ul>
                            <button className="mt-7 py-2 px-8 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md rounded-sm">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3 border-t-2 p-7">
                        <div className="flex items-center gap-5 mb-5">
                            <h1 className="text-4xl">
                                Skills
                            </h1>
                            <input placeholder="Search for a Skill:" className="h-10 pl-3 pr-36 bg-gray-200"/>
                        </div>
                        
                        <div className="w-full bg-gray-300 min-h-60">
                            text
                        </div>
                    </div>
                    <div className="col-span-3 border-t-2 p-7 flex flex-col">
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
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
                                            <h2>9:00 AM</h2>
                                        </div>
                                        <div>
                                            <h1>To:</h1>
                                            <h2>5:00 PM</h2>
                                        </div>
                                    </div>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="min-w-screen h-10 bg-gray-500"></div>
        </div>
    )
}