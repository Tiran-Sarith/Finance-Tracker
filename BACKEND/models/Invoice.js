const mongoose = require('mongoose');
const Sequence = require('./sequenceModel');


const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceNo: { type: Number },
    customer:{
        type: String,
        required: true
    },
    billingAdress:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    invoiceDate:{
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required: true
    }
})

invoiceSchema.pre('save', async function (next) {
    if (!this.invoiceNo) {
        try {
            const sequence = await Sequence.findOneAndUpdate(
                { name: 'invoiceNo' },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );
            this.invoiceNo = sequence.value;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const Invoice = mongoose.model("Invoice",invoiceSchema)
module.exports = Invoice;