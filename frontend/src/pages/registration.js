import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [passwordVisible, setPassVisible] = useState(true);
    const [confirmVisible, setConfirmVisible] = useState(true);
    const [confirmPW, setConfirm] = useState("");
    const [passMatch, setPassMatch] = useState(false);
    const [matchVisible, setMatchVisible] = useState(false);
    const [accountForm, setForm] = useState({
        name: {
            firstName: "",
            lastName: ""
        }, 
        location: {
            city: "",
            state: ""
        },
        phoneNumber: "",
        emailAddress: "",
        password: ""
    })
    
    const togglePassVisible = () => {
        setPassVisible((prevState) => !prevState);
    };

    const toggleConfirmVisible = () => {
        setConfirmVisible((prevState) => !prevState);
    };

    const handlePassword = (e) => {
        setForm(prevForm => ({
            ...prevForm,
            password: e.target.value
        }))
    }

    const handleConfirm = (e) => {
        setConfirm(e.target.value);
    }

    const handleButton = (e) =>{

    }

    useEffect(() => {
        const checkPasswordSimilarity = () => {
            if (confirmPW !== ""){
                setMatchVisible(true);
                if (accountForm.password !== confirmPW){
                    setPassMatch(false);
                } else{
                    setPassMatch(true);
                }
            } else{
                setMatchVisible(false);
            }
        }
        checkPasswordSimilarity();
    }, [accountForm.password, confirmPW])

    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-50">
            <div className="shadow-xl rounded-sm flex flex-col gap-4 bg-white w-fit px-12 py-20">
                <p className="text-3xl font-bold pb-3 text-center">Sign Up</p>

                <form className="flex flex-col gap-4 w-fit">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-52"
                        />
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-52"
                        />
                    </div>

                    <div className="flex gap-1">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City"
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-3/4"
                        />
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder="State"
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-1/4"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number (e.g. 1234567890)"
                        className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                    />      

                    <div className="relative">
                        <input
                            type={passwordVisible ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                            onChange={handlePassword}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700 text-lg"
                            onClick={togglePassVisible}
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={confirmVisible ? "password" : "text"}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className={`border ${passMatch ? "bg-white border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-full`}
                            onChange={handleConfirm}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700 text-lg"
                            onClick={toggleConfirmVisible}
                        >
                            {confirmVisible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className={`${matchVisible ? 'visible' : 'invisible'}`}>
                        {passMatch ? (
                            <h1 className="text-green-500">
                                Passwords Match!
                            </h1>
                        ) : (
                            <h1 className="text-red-500">
                                Please make sure the passwords match.
                            </h1>
                        )}
                    </div>
                </form>

                <button className="bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-md">
                    <p className="font-bold">Register</p>
                </button>

                <div className="text-center">
                    Already have an account?{" "}
                    <a className="text-blue-500 font-bold" href="/login">
                        Sign in here!
                    </a>
                </div>
            </div>
        </div>
    );
}
