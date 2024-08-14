const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();



const PORT = process.env.PORT || 7070; //7070 port or any available port

app.use(cors()); //cors use krnwa
app.use(bodyParser.json()); //json format ekause krna hnda meka danwa

const URL = process.env.MONGODB_URL; 

mongoose.connect(URL,{ //configurations tika
    useNewUrlParser: true,
    useUnifiedTopology:true, 
    
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB connection successful");
})

const invoiceRouter = require("./routes/invoices.js")
app.use("/invoice", invoiceRouter);

const journalRouter = require("./routes/journals.js")
app.use("/journal", journalRouter);

const accountRouter = require("./routes/bankAccounts.js")
app.use("/account", accountRouter);

const signupRoute = require("./routes/signup.js");
app.use("/user", signupRoute);

const createAdminAccount = require("./scripts/admin.js");
createAdminAccount();

const loginRoute = require("./routes/login");
app.use("/auth", loginRoute);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port: ${PORT}`)
})

