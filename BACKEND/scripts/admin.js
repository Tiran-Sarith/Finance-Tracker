const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount(){
    try{
        const existingAdmin = await User.findOne({email: "admin@test.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                email: "admin@test.com",
                name: "admin",
                password: await bcrypt.hash("admin", 10),
                role:"admin"
            })
            newAdmin.save();
            console.log("Admin Acoount created succesfully");
        }else{
            console.log("Admin already exists");
        }
    }catch (error){
        console.error(error.message);
    }
}

module.exports = createAdminAccount;