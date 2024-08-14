const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({

    bankName:{
        type: String,
        required:true
    },
    
    income:{
        type: Number,
        required: true
    },
    expenses:{
        type: Number,
        required: true
    },
    bankbalance:{
        type: Number,
        
    }
})



const BankAccount = mongoose.model("BankAccount",bankAccountSchema)
module.exports = BankAccount;