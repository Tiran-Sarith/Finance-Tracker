const router = require("express").Router();
let BankAccount = require("../models/BankAccount");

router.route("/add").post((req,res)=>{
    //meka body eka. eka athule tyna ewa thma execute wennh
    
    const bankName = req.body.bankName;
    const bankbalance = Number(req.body.bankbalance);
    const income = Number(req.body.income);
    const expenses = Number(req.body.expenses);
    

    const newBankAccount = new BankAccount({
        bankName,
        bankbalance,
        income,
        expenses
        
    
    })

    
    if(!income =='number'|| !expenses=='number'){
        return res.status(400).json({message: 'Quantity and rate must be positive numbers.'})
    }


    newBankAccount.save().then(()=>{
        res.json("Bank saved") //json format eken response ekk ywnwa
    }).catch((err)=>{
        console.log(err) 
    })
})   

//get all
router.route("/get").get((req,res)=>{
    BankAccount.find().then((bankAccounts)=>{
        res.json(bankAccounts)
    }).catch((err)=>{
        console.log(err)
    })
})

//Update
router.route("/update/:id").put(async (req,res)=>{
    let bankAccountId = req.params.id;//uda id namamai enn one
    const {bankName, bankbalance, income, expenses} = req.body; //udata add krddi gttta wage dennat plwn 9destructure krnwa kiynnh mekata)

    const updateBankAccount = {
        bankName,
        bankbalance,
        income,
        expenses
    }
    //await eka thama araka iwr wenkn meka nwattagena innh
    //NIC eken wage select krnwnm findOneAndUpdate denna
    const update = await BankAccount.findByIdAndUpdate(bankAccountId, updateBankAccount).then(()=>{
        res.status(200).send({status: "Bank account updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message})
    })
})

//delete krna eka
router.route("/delete/:id").delete(async(req,res)=>{
    let bankAccountId = req.params.id;
    await BankAccount.findByIdAndDelete(bankAccountId).then(()=>{
        res.status(200).send({status: "Account Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Err with delete account", error:err.message});
    })
})

//fetch one user data
router.route("/get/:id").get(async(req,res)=>{
    let bankAccountId = req.params.id;
    //email eken filter krnwnm findOne(email)
    const user = await BankAccount.findById(bankAccountId).then((bankAccounts)=>{
        res.status(200).send({status: "Account fetched", bankAccounts})
    }).catch((err)=>{
        console.log(err.messege);
        res.status(500).send({status: "Error with get account", error: err.message})
    })
})

module.exports = router;