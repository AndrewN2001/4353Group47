import React, {useState} from "react";

export default function Skills(){
    return(
        <div id="skills" className="col-span-3 border-t-2 p-7">
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
    )
}