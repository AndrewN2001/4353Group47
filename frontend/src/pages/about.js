import React from "react";
import { useAuth } from "../middleware/user-vertification";

export default function About(){
    const {darkMode} = useAuth();

    return(
        <div className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-black"}`}>
            This is where the About page will be.
        </div>
    )
}