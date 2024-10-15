import React from "react"
import homepage from "../images/homepage.jpeg"

export default function HomePage(){
    return(
        <div className="relative h-fit flex">
            <img src={homepage} alt="Logo" className="mix-blend-overlay object-cover"/>
            <div className="text-center flex flex-col gap-3 z-10 absolute text-gray-100 items-start w-fit h-full bg-[#4682B4] justify-center px-10">
                <h1 className="text-3xl font-bold text-left">
                    Welcome to <br/> <span className="text-7xl">Voluntify</span><span className="text-[#ADB446] text-6xl">.</span>
                </h1>
                <h2 className="text-xl text-left">
                    Make a Difference, One Event at a Time.
                </h2>

                <div className="text-2xl flex gap-10 mt-3 justify-center">
                    <button className="hover:underline hover:underline-offset-2">
                        Find Events
                    </button>

                    <button className="bg-[#ADB446] text-white px-5 py-2 rounded-md">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}