import React from "react";

export default function UserProfile(){
    return(
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-4/5 h-4/5 bg-white shadow-xl rounded-lg flex">
                <div className="w-1/3 h-full border-r-2">
                    <div className="h-1/2 relative">
                        <div className="absolute flex flex-col text-center inset-x-0 gap-2 bottom-0 pb-20">
                            <p1 className="text-3xl font-extralight text-gray-600">
                                Andrew Nguyen
                            </p1>
                            <p2 className="text-gray-400">
                                Volunteer
                            </p2>
                        </div>
                    </div>

                    <div className="h-1/2">

                    </div>
                </div>

                <div className="w-2/3">
                    <div className="h-2/5 py-8 flex flex-col justify-around">
                        <h1 className="pl-7 text-3xl font-extralight">
                            User Profile
                        </h1>

                        <div className="bg-white px-7">
                            <ul className="">
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

                    <div className="h-3/5">
                        <div id="skills" className="h-1/2 py-8 border-t-2">
                            <h1 className="pl-7 text-3xl font-extralight">
                                Skills
                            </h1>
                        </div>

                        <div id="Availability" className="h-1/2 py-8 border-t-2 px-7">
                            <h1 className="text-3xl font-extralight">
                                Availability
                            </h1>

                            <div id="day-grid" className="pt-5">
                                <ul className="flex justify-between bg-gray-200">
                                    <li className="p-3">
                                        <button>
                                            Sunday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Monday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Tuesday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Wednesday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Thursday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Friday
                                        </button>
                                    </li>
                                    <li className="p-3">
                                        <button>
                                            Saturday
                                        </button>
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