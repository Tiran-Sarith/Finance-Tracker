const bcrypt = require("bcrypt");
const user = require("../models/user");
const {generateToken} = require("../utils/jwtUtils");

async function login(email, password){
    try{
        const existingUser = await user.findOne({email});
        if(!existingUser){
            throw new Error("User not Found");

        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return token;
    }catch (error){
        console.log("Loging.error:", error.message);
        throw new Error("Invalid credentials");
    }
}

module.exports = {
    login
}