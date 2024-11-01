import React from "react"
import homepage from "../images/homepage.jpeg"
<<<<<<< HEAD

export default function HomePage(){
=======
import { useAuth } from "../middleware/user-vertification"

export default function HomePage(){
    const {isLoggedIn} = useAuth();

>>>>>>> develop
    return(
        <div className="relative h-fit flex justify-center items-end">
            <img src={homepage} alt="Logo" className="mix-blend-overlay object-cover"/>
            <div className="text-center flex flex-col gap-3 z-10 absolute text-gray-100 items-center w-full bg-primaryblue justify-end py-10">
                <h1 className="text-3xl font-bold text-left">
                    Welcome to <span className="text-7xl">Voluntify</span><span className="text-[#ADB446] text-6xl">.</span>
                </h1>
                <h2 className="text-xl text-left">
                    Make a Difference, One Event at a Time.
                </h2>

                <div className="text-2xl flex gap-10 mt-3 items-center">
<<<<<<< HEAD
                    <a href="/eventlist" className="hover:underline hover:underline-offset-2">
                        Find Events
                    </a>

                    <a href="/registration" className="bg-accentyellow hover:bg-accentyellow-light text-white px-5 py-2 rounded-md">
                        Sign Up
                    </a>
=======
                    <a href="/eventlist" className="bg-accentyellow hover:bg-accentyellow-light px-5 py-2 rounded-md">
                        Find Events
                    </a>
                    {!isLoggedIn ? (
                        <a href="/registration" className="bg-accentyellow hover:bg-accentyellow-light text-white px-5 py-2 rounded-md">
                            Sign Up
                        </a>
                    ) : (null)}
>>>>>>> develop
                </div>
            </div>
        </div>
    )
}