import React, {useState} from "react";

export default function FullInfo(){
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
        <div id="userInformation" className="col-span-3 p-7">
            <h1 className="text-4xl">
                Full Information
            </h1>

            <div className="bg-white">
                <ul className="mt-9">
                    <li className="border-b-2 h-10 flex items-center justify-between">
                        <h1 className="font-semibold">
                            Full Name
                        </h1>
                        <h1 className="font-light">
                            Andrew Nguyen
                        </h1>
                    </li>
                    <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                        <h1 className="font-semibold">
                            Address
                        </h1>
                        <h1 className="font-light">
                            10924 Fairwood Dr, La Porte, TX 77571
                        </h1>
                    </li>
                    <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                        <h1 className="font-semibold">
                            Email
                        </h1>
                        <h1 className="font-light">
                            andrew.nguyen.ta@gmail.com
                        </h1>
                    </li>
                    <li className="border-b-2 h-10 flex items-center gap-20 justify-between">
                        <h1 className="font-semibold">
                            Phone Number
                        </h1>
                        <h1 className="font-light">
                            (832) 530-0481
                        </h1>
                    </li>
                </ul>
                <button className="mt-7 py-2 px-8 bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md rounded-sm">
                    Edit
                </button>
            </div>
        </div>
    )
}