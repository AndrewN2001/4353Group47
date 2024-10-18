import React from "react";
import { useAuth } from "../middleware/user-vertification";

export default function NavBar(){
    const {isLoggedIn, loggedUser, logout} = useAuth();

    return(
        <div className="flex items-center justify-around bg-primaryblue text-white py-4 z-20 w-screen fixed shadow-lg">
            <div className="flex items-center gap-10">
                <h1 className="text-4xl font-semibold">
                    Voluntify<span className="text-[#ADB446]">.</span>
                </h1>
                <ul className="flex gap-3 h-full">
                    <li className="h-full">
                        <a className="px-2 hover:underline hover:underline-offset-4" href="/">
                            Home
                        </a>
                    </li>

                    <li>
                        <a className="px-2 hover:underline hover:underline-offset-4" href="/about">
                            About
                        </a>
                    </li>

                    <li>
                        <a className="px-2 hover:underline hover:underline-offset-4" href="/eventlist">
                            Events
                        </a>
                    </li>

                    <li>
                        <button className="px-2 hover:underline hover:underline-offset-4">
                            Opportunities
                        </button>
                    </li>
                </ul>
            </div>
            
            {isLoggedIn ? (
                <div className="flex gap-3 items-center">
                    <h1 id="name">
                        Welcome, {loggedUser}
                    </h1>
                    <a className="w-9 h-9 rounded-full bg-white" href="/userprofile">
                        
                    </a>   
                </div>
            ) : (
                <div>
                    <a className="px-2 hover:underline hover:underline-offset-4" href="/login">
                        Log In
                    </a>
                    <a className="px-2 hover:underline hover:underline-offset-4" href="/registration">
                        Sign Up
                    </a>
                </div>
            )}
        </div>
    )
}