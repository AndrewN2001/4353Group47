import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function Login(){
    const navigate = useNavigate();
    const [passwordVisible, setPassVisible] = useState(true);
    const [credentials, setCreds] = useState({
        accountInfo: {
            email: "",
            password: "",
        }
    });

    const togglePassVisible = () => {
        setPassVisible((prevState) => !prevState)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCreds((prevState) => ({
            ...prevState,
            accountInfo: {
                ...prevState.accountInfo,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/users/login", {credentials})
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-50">
            <div className="shadow-xl p-12 py-32 rounded-sm flex flex-col gap-4 bg-white">
                <p className="text-3xl font-bold pb-3 text-center">Sign In</p>

                <form className="flex flex-col gap-4 w-80">
                    <input 
                        type="email"
                        name="email"
                        id="email" 
                        placeholder="Email Address"
                        value={credentials.accountInfo.email}
                        className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"
                        onChange={handleChange}
                    />
                    <div className="relative">
                        <input 
                            type={passwordVisible ? "password" : "text"}
                            name="password"
                            id="password" 
                            placeholder="Password"
                            value={credentials.accountInfo.password}
                            className="border-2 border-gray-700 pl-2 py-2 rounded-sm w-full"
                            onChange={handleChange}
                        />
                        <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-300 text-lg" onClick={togglePassVisible}>
                            {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
                        </button>
                    </div>
                    
                </form>

                <button className="bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-md" onClick={handleSubmit}>
                    <p className="font-bold">
                        Sign In
                    </p>
                </button>

                <div className="text-center text-blue-500">
                    <a href="/recover">
                        Forgot Password?
                    </a>
                </div>

                <div className="text-center">
                    Don't have an account? <a className="text-blue-500 font-bold" href="/registration">Sign up here</a>!
                </div>
            </div>
        </div>
    )
}