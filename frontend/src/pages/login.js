import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function Login(){
    const [passwordVisible, setPassVisible] = useState(true);

    const togglePassVisible = () => {
        setPassVisible((prevState) => !prevState)
    }

    return(
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-50">
            <div className="shadow-xl p-12 py-32 rounded-sm flex flex-col gap-4 bg-white">
                <p className="text-3xl font-bold pb-3 text-center">Sign In</p>

                <form className="flex flex-col gap-4 w-80">
                    <input type="email" id="email" placeholder="Email Address" className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"/>
                    <div className="relative">
                        <input 
                            type={passwordVisible ? "password" : "text"}
                            id="password" 
                            placeholder="Password" 
                            className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"
                        />
                        <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-300 text-lg" onClick={togglePassVisible}>
                            {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
                        </button>
                    </div>
                    
                </form>

                <button className="bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-md">
                    <p className="font-bold">
                        Sign In
                    </p>
                </button>

                <div className="text-center text-blue-500">
                    <a href="/">
                        Forgot Password?
                    </a>
                </div>

                <div className="text-center">
                    Don't have an account? <a className="text-blue-500 font-bold" href="/">Sign up here</a>!
                </div>
            </div>
        </div>
    )
}