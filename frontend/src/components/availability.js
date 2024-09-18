import React, { useState } from "react";

export default function Availability(){
    return(
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
    )
}