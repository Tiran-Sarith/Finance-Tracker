const router = require("express").Router();
let Invoice = require("../models/Invoice");

router.route("/add").post((req,res)=>{
    //meka body eka. eka athule tyna ewa thma execute wennh
    
    const customer = req.body.customer;
    const billingAdress=req.body.billingAdress;
    const service = req.body.service;
    const description=req.body.description;
    const quantity = Number(req.body.quantity);
    const rate = Number(req.body.rate);
    const amount = Number(req.body.amount);
    const invoiceDate = req.body.invoiceDate;
    const dueDate = req.body.dueDate;
    

    const newInvoice = new Invoice({
        
        customer,
        billingAdress,
        service,
        description,
        quantity,
        rate,
        amount,
        invoiceDate,
        dueDate
    
    })

    if(!customer || !billingAdress || !service || ! description|| !quantity || !rate ||!amount ||!invoiceDate ||!dueDate){
        return req.status(400).json({message: 'All fields are required'});
    }
    if(quantity <=0 || !rate=='number' ){
        return res.status(400).json({message: 'Quantity and rate must be positive numbers.'})
    }
    if(quantity*rate!==amount){
        return res.status(400).json({message: 'amount is invalid'});
    }



    newInvoice.save().then(()=>{
        res.json("Invoice saved") //json format eken response ekk ywnwa
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ message: 'Error saving invoice', error: err.message });

    });
});

//get all
router.route("/get").get((req,res)=>{
    Invoice.find().then((invoices)=>{
        res.json(invoices)
    }).catch((err)=>{
        console.log(err)
    })
})

//Update
router.route("/update/:id").put(async (req,res)=>{
    let invoiceId = req.params.id;//uda id namamai enn one
    const {customer, billingAdress, service, description, quantity, rate, amount ,invoiceDate,dueDate} = req.body; //udata add krddi gttta wage dennat plwn 9destructure krnwa kiynnh mekata)

    const updateInvoice = {
        customer,
        billingAdress,
        service,
        description,
        quantity,
        rate,
        amount,
        invoiceDate,
        dueDate
    }
    //await eka thama araka iwr wenkn meka nwattagena innh
    //NIC eken wage select krnwnm findOneAndUpdate denna
    const update = await Invoice.findByIdAndUpdate(invoiceId, updateInvoice).then(()=>{
        res.status(200).send({status: "journal updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message})
    })
})

//delete krna eka
router.route("/delete/:id").delete(async(req,res)=>{
    let invoiceId = req.params.id;
    await Invoice.findByIdAndDelete(invoiceId).then(()=>{
        res.status(200).send({status: "invoice Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Err with delete invoice", error:err.message});
    })
})

//fetch one user data
router.route("/get/:id").get(async(req,res)=>{
    let invoiceId = req.params.id;
    //email eken filter krnwnm findOne(email)
    const user = await Invoice.findById(invoiceId).then((invoice)=>{
        res.status(200).send({status: "Journal fetched", invoice})
    }).catch((err)=>{
        console.log(err.messege);
        res.status(500).send({status: "Error with get journal", error: err.message})
    })
})
module.exports = router; 