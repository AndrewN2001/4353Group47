const userModel = require("../models/user")

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
        const newUserData = req.body;
        res.json(newUserData);
    } catch (error){
        if (error.code === 11000){
            return res.status(409).json({message: "Account already exists!"})
        } else{
            console.error("Error saving user:", error)
            res.status(500).json({message: "Internal Server Error"})
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
            address: "10924 Fairwood Dr, La Porte, TX 77571",
            email: "andrew.nguyen.ta@gmail.com",
            phoneNumber: "(832) 530-0481",
            imageUrl: "https://placehold.co/600x400?text=User+Profile", // Placeholder image
            skills: ["Communication", "Teamwork", "Problem Solving"],
            availability: {
                monday: { start: "09:00", end: "17:00" },
                tuesday: { start: "10:00", end: "16:00" },
                wednesday: { start: "09:00", end: "17:00" },
                thursday: { start: "09:00", end: "15:00" },
                friday: { start: "09:00", end: "12:00" },
                saturday: { start: "10:00", end: "14:00" },
                sunday: { start: "12:00", end: "16:00" }
              }
              
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