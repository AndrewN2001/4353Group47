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

module.exports = {
    handleLogin,
    handleRegister,
}