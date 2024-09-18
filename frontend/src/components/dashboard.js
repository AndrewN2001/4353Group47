import React from "react";

export default function Dashboard(){
    const [userData, setUserData] = useState({
        fullName: "Andrew Nguyen",
        address: {
            city: "La Porte",
            state: "TX",
        },
        email: "andrew.nguyen.ta@gmail.com",
        phoneNumber: "(832) 530-0481"
    });
    const [dateSelect, setDateSelect] = useState("");
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleDateSelect = (e) =>{

    }
    
    return(
        <div id="User Information" className="min-w-[70%]">
            <div className="h-2/5 py-8 flex flex-col justify-around">
                <h1 className="pl-7 text-3xl text-gray-800 font-extralight">
                    User Profile
                </h1>

                <div className="bg-white px-7">
                    <ul>
                        <li className="border-b-2 h-10 flex items-center justify-between text-gray-700">
                            <h1 className="font-semibold">
                                Full Name
                            </h1>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={userData.fullName}
                                    className="p-1 border text-right w-1/2"
                                />
                            ) : (
                                <h1 className="font-light">
                                    {userData.fullName}
                                </h1>
                            )}
                        </li>
                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                            <h1 className="font-semibold">
                                Address
                            </h1>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={`${userData.address.city}, ${userData.address.state}`}
                                    className="p-1 border text-right w-1/2"
                                />
                            ) : (
                                <h1 className="font-light">
                                    {`${userData.address.city}, ${userData.address.state}`}
                                </h1>
                            )}
                        </li>
                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                            <h1 className="font-semibold">
                                Email
                            </h1>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.email}
                                    className="p-1 border text-right w-1/2"
                                />
                            ) : (
                                <h1 className="font-light">
                                    {userData.email}
                                </h1>
                            )}
                        </li>
                        <li className="border-b-2 h-10 flex items-center gap-20 justify-between text-gray-700">
                            <h1 className="font-semibold">
                                Phone Number
                            </h1>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={userData.phoneNumber}
                                    className="p-1 border text-right w-1/2"
                                />
                            ) : (
                                <h1 className="font-light">
                                    {userData.phoneNumber}
                                </h1>
                            )}

                        </li>
                    </ul>

                    <button className="mt-7 py-2 px-8 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md rounded-sm" onClick={toggleEditMode}>
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>
            </div>

            <div className="h-3/5 font-extralight min-w-[70%] px-7">
                <div id="skills" className="h-1/2 py-6 border-t-2 w-full">
                    <h1 className="text-3xl h-fit text-gray-800 flex items-center">
                        Skills
                        <input className="ml-5 pl-2 text-base py-1 w-96 bg-gray-200" value="Search for Skill..."/>
                    </h1>
                    <div className="pl-3 mt-2 h-5/6 rounded-lg bg-gray-300 mb-5">
                        <ul className="pl-3 pt-5 flex gap-2">
                            <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                C++
                                <button>
                                    <IoClose />
                                </button>
                            </li>
                            <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                Python
                                <button>
                                    <IoClose />
                                </button>
                            </li>
                            <li className="bg-gray-100 w-fit px-3 rounded-lg text-center flex items-center gap-2">
                                Javascript
                                <button>
                                    <IoClose />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="Availability" className="h-1/2 border-t-2 min-w-[70%] flex flex-col">
                    <h1 className="text-3xl text-gray-800 pt-6">
                        Availability
                    </h1>

                    <div className="w-full h-fit pt-10">
                        <ul className="grid grid-cols-7 gap-2">
                            <li>
                                <div className=" bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Sunday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Monday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Tuesday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Wednesday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Thursday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Friday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                            <li>
                                <div className="bg-gray-200 h-fit rounded-md">
                                    <button className="text-center bg-gray-300 py-2 rounded-md hover:bg-gray-200 w-full">Saturday</button>
                                    <form className="mt-3 ml-3 flex flex-col">
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20"
                                            value="5:00 PM"
                                        />
                                        <label for="from" className="">From:</label>
                                        <input
                                            type="text"
                                            className="border-b-2 bg-gray-200 border-gray-500 w-20 mb-5"
                                            value="5:00 PM"
                                        />
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}