const userModel = require("../models/user")
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    try{
        const {email, password} = req.body.credentials.accountInfo;
        const searchUser = await userModel.findOne({'accountInfo.email': email})
        if (searchUser){
            // const valid = await bcrypt.compare(password, searchUser.accountInfo.password);
            // if (valid){
            //     res.json({
            //         message: "login successful!",
            //         username: searchUser.accountInfo.username,
            //     })
            // } else{
            //     res.status(401).json({message: "Invalid password."})
            // }
            if (password !== searchUser.accountInfo.password){
                res.status(401).json({message: "Invalid password."})
            } else{
                res.json({
                    message: "login successful!",
                    accountInfo: searchUser.accountInfo,
                })
            }
        } else{
            res.status(401).json({message: "User not found."})
        }
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        })
    }
} 

const handleRegister = async (req, res) => {
    try{
        const newUserData = req.body.accountForm;
        // res.json(newUserData.accountForm);
        const existingUser = await userModel.findOne({'accountInfo.emailAddress' : newUserData.emailAddress})
        if (existingUser){
            return res.status(409).json({
                message: "Account already exists!"
            })
        }
        const newUser = new userModel({
            name:{
                firstName: newUserData.name.firstName,
                lastName: newUserData.name.lastName
            },
            location: {
                city: newUserData.location.city,
                state: newUserData.location.state
            },
            phoneNumber: newUserData.phoneNumber,
            emailAddress: newUserData.emailAddress,
            password: newUserData.password
        });
        // const saveUser = await newUser.save();
        res.json(newUser);
    } catch (error){
        if (error.code === 11000){
            return res.status(409).json({message: "Account already exists!"})
        } else{
            console.error("Error saving user:", error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

const getUserProfile = async (req, res) => {

    try {
        // For now, use a hardcoded user profile (replace with MongoDB query later)
        const userId = req.params.userId; // userId for when needed by DB later
        const userProfile = {
            name: "Andrew Nguyen",
            role: "Volunteer",
            imageUrl: "https://placehold.co/600x400?text=User+Profile", // Placeholder image
            skills: ["Communication", "Teamwork", "Problem Solving"],
            availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        };

        // Respond with the hardcoded user profile
        res.json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    handleLogin,
    handleRegister,
    getUserProfile,
}