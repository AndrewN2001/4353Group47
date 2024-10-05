import React from "react";

export default function NavBar(){
    return(
        <div className="flex items-center justify-around bg-blue-600 text-white py-4 z-20 w-screen fixed shadow-lg">
            <div className="flex items-center gap-10">
                <h1 className="text-4xl">
                    VOLUNTIFY
                </h1>
                <ul className="flex gap-3 h-full">
                    <li className="h-full">
                        <a className="px-2 hover:underline hover:underline-offset-4" href="/">
                            Home
                        </a>
                    </li>

                    <li>
                        <button className="px-2 hover:underline hover:underline-offset-4">
                            About
                        </button>
                    </li>

                    <li>
                        <button className="px-2 hover:underline hover:underline-offset-4">
                            Events
                        </button>
                    </li>

                    <li>
                        <button className="px-2 hover:underline hover:underline-offset-4">
                            Opportunities
                        </button>
                    </li>
                </ul>
            </div>
            
            <div className="flex gap-5">
                <a className="px-2 hover:underline hover:underline-offset-4" href="/login">
                    Log In
                </a>
                <a className="px-2 hover:underline hover:underline-offset-4" href="/registration">
                    Sign Up
                </a>
            </div>
        </div>
    )
}