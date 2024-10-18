import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function NotAuthorized(){
    return(
        <div className="min-h-screen flex justify-center items-center font-light">
            <h1 className="text-3xl">
                You are not authorized to be on this page.
                <a href="/" className="flex items-center justify-center text-lg mt-2 text-primaryblue hover:text-primaryblue-light">
                    <MdKeyboardArrowLeft className="text-2xl"/>
                    Go to Home Page
                </a>
            </h1>
        </div>
    )
}