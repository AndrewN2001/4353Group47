import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Register() {

    const [passwordVisible, setPassVisible] = useState(true);

    const togglePassVisible = () => {
        setPassVisible((prevState) => !prevState);
    };

    return (
        <div className="shadow-xl p-12 py-32 rounded-sm flex flex-col gap-4">
          <p className="text-3xl font-bold pb-3 text-center">Register</p>
    
          <form className="flex flex-col gap-4 w-80">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"
            />

            <div className="relative">

              <input
                type={passwordVisible ? "password" : "text"}
                id="password"
                placeholder="Password"
                className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"
              />

              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-300 text-lg"
                onClick={togglePassVisible}>

                {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
              </button>

            </div>

          </form>
    
          <button className="bg-green-500 hover:bg-green-400 text-white py-3 rounded-md">
            <p className="font-bold">Register</p>
          </button>
          
        </div>
      );
}