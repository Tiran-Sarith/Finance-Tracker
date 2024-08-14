const router = require("express").Router();
let Journal = require("../models/Journal");
let BankAccount = require("../models/BankAccount");

router.route("/add").post(async(req,res)=>{
    //meka body eka. eka athule tyna ewa thma execute wennh
    const journalNo = Number(req.body.journalNo)
    const debitAccount = req.body.debitAccount;
    const creditAccount = req.body.creditAccount
    const debit=Number(req.body.debit);
    const credit = Number(req.body.credit);
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const month = req.body.month;

    const newJournal = new Journal({
        //journalNo,
        creditAccount,
        debitAccount,
        debit,
        credit,
        description, 
        location,
        date,
        month

    })
    if(!creditAccount || !debitAccount || !debit || !credit|| !description || !location ||!month){
        return req.status(400).json({message: 'All fields are required'})
    }
    if(debit <=0 || !credit=='number'){
        return res.status(400).json({message: 'Amount must be a positive number'})
    }
    if(!(credit-debit)==0){
        return res.status(400).json({message: 'debit and credit shoul be equal'})
    }

    try {
        await newJournal.save();

        // Update the BankAccount income and expenses
        const debitBankAccount = await BankAccount.findOne({ bankName: debitAccount });
        const creditBankAccount = await BankAccount.findOne({ bankName: creditAccount });

        if (debitBankAccount) {
            debitBankAccount.expenses += debit;
            debitBankAccount.bankbalance = debitBankAccount.income - debitBankAccount.expenses;
            await debitBankAccount.save();
        }

        if (creditBankAccount) {
            creditBankAccount.income += credit;
            creditBankAccount.bankbalance = creditBankAccount.income - creditBankAccount.expenses;
            await creditBankAccount.save();
        }

    
        res.json("Journal entry saved and bank accounts updated");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});



router.route("/get").get((req,res)=>{
    Journal.find().then((journals)=>{
        res.json(journals)
    }).catch((err)=>{
        console.log(err)
    })
}) //data gnnwa database eken ekai get damme


router.route("/update/:id").put(async (req,res)=>{
    let journalId = req.params.id;//uda id namamai enn one
    const {journalNo,debitAccount, creditAccount, debit, credit, description, location, date, month} = req.body; //udata add krddi gttta wage dennat plwn 9destructure krnwa kiynnh mekata)


    try {
        // Find the existing journal entry
        const existingJournal = await Journal.findById(journalId);
        if (!existingJournal) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
    
    const previousDebitAccount = await BankAccount.findOne({ bankName: existingJournal.debitAccount });
    const previousCreditAccount = await BankAccount.findOne({ bankName: existingJournal.creditAccount });

    if (previousDebitAccount) {
        previousDebitAccount.expenses -= existingJournal.debit;
        previousDebitAccount.bankbalance = previousDebitAccount.income - previousDebitAccount.expenses;
        await previousDebitAccount.save();
    }

    if (previousCreditAccount) {
        previousCreditAccount.income -= existingJournal.credit;
        previousCreditAccount.bankbalance = previousCreditAccount.income - previousCreditAccount.expenses;
        await previousCreditAccount.save();
    }

    const updateJournal = await Journal.findByIdAndUpdate(journalId,{
        journalNo,
        creditAccount,
        debitAccount,
        debit,
        credit,
        description, 
        location,
        date,
        month
    }, { new: true });
    //await eka thama araka iwr wenkn meka nwattagena innh
    //NIC eken wage select krnwnm findOneAndUpdate denna
    
   /* if(!debitAccount || !creditAccount || !debit || !credit|| !description || !location || !date){
        return req.status(400).json({message: 'All fields are required'})
    }
    if(debit <=0 || !credit=='number'){
        return res.status(400).json({message: 'Amount must be a positive number'})
    }*/

        const newDebitAccount = await BankAccount.findOne({ bankName: debitAccount });
        const newCreditAccount = await BankAccount.findOne({ bankName: creditAccount });

        if (newDebitAccount) {
            newDebitAccount.expenses += debit;
            newDebitAccount.bankbalance = newDebitAccount.income - newDebitAccount.expenses;
            await newDebitAccount.save();
        }

        if (newCreditAccount) {
            newCreditAccount.income += credit;
            newCreditAccount.bankbalance = newCreditAccount.income - newCreditAccount.expenses;
            await newCreditAccount.save();
        }
        
        res.status(200).send({ status: "Journal updated and bank accounts adjusted", updateJournal });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }


})

//delete krna eka
router.route("/delete/:id").delete(async(req,res)=>{
    let journalId = req.params.id;
    await Journal.findByIdAndDelete(journalId).then(()=>{
        res.status(200).send({status: "journal Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Err with delete journal", error:err.message});
    })
})

//fetch one user data
router.route("/get/:id").get(async(req,res)=>{
    let journalId = req.params.id;
    //email eken filter krnwnm findOne(email)
    const user = await Journal.findById(journalId).then((journal)=>{
        res.status(200).send({status: "Journal fetched", journal})
    }).catch((err)=>{
        console.log(err.messege);
        res.status(500).send({status: "Error with get journal", error: err.message})
    })
})


module.exports = router;