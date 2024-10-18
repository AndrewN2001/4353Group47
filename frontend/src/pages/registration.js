import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [passwordVisible, setPassVisible] = useState(true);
    const [confirmVisible, setConfirmVisible] = useState(true);
    const [confirmPW, setConfirm] = useState("");
    const [passMatch, setPassMatch] = useState(true);
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

    const handleConfirm = (e) => {
        setConfirm(e.target.value);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name.includes('.')){
            const keys = name.split('.');
            setForm(prevForm => ({
                ...prevForm,
                [keys[0]]: {
                    ...prevForm[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else{
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accountForm.password === confirmPW){
            // console.log(accountForm);
            axios.post("http://localhost:3001/api/users/register", {accountForm})
            .then(result => {
                console.log(result);
            })
        } else{
            console.log("Passwords don't match.")
        }
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
                            name="name.firstName"
                            id="firstName"
                            placeholder="First Name"
                            // className={`border ${errors.name.firstName ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-52`}
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-52"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="name.lastName"
                            id="lastName"
                            placeholder="Last Name"
                            // className={`border ${errors.name.lastName ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-52`}
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-52" 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-1">
                        <input
                            type="text"
                            name="location.city"
                            id="city"
                            placeholder="City"
                            // className={`border ${errors.location.city ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-3/4`}
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-3/4"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="location.state"
                            id="state"
                            placeholder="State"
                            // className={`border ${errors.location.state ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-1/4`}
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-1/4"
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="email"
                        name="emailAddress"
                        id="email"
                        placeholder="Email Address"
                        // className={`border ${errors.emailAddress ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-full`}
                        className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number (e.g. 1234567890)"
                        // className={`border ${errors.phoneNumber ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-full`}
                        className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                        onChange={handleChange}
                    />      

                    <div className="relative">
                        <input
                            type={passwordVisible ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            // className={`border ${errors.password ? "border-gray-700" : "border-red-700 bg-red-50"} pl-2 py-2 rounded-sm w-full`}
                            className="border border-gray-700 pl-2 py-2 rounded-sm w-full"
                            onChange={handleChange}
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

                <button className="bg-primaryblue hover:bg-primaryblue-light text-white py-3 rounded-md" onClick={handleSubmit}>
                    <p className="font-bold">Register</p>
                </button>

                <div className="text-center">
                    Already have an account?{" "}
                    <a className="text-primaryblue font-bold" href="/login">
                        Sign in here!
                    </a>
                </div>
            </div>
        </div>
    );
}
