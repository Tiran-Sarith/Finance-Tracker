const mongoose = require('mongoose');
const Sequence = require('./sequenceModel');

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    journalNo: { type: Number },
  debitAccount: { type: String, required: true },
  creditAccount: { type: String, required: true },

    debitAccount:{
        type: String,
        required: true
    },
    creditAccount:{
        type: String,
        required: true
    },
    debit:{
        type: Number,
        required: true
    },
    credit:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: false
    },
   month:{
    type: String,
    required: true
   }
})

journalSchema.pre('save', async function (next) {
    if (!this.journalNo) {
      try {
        const sequence = await Sequence.findOneAndUpdate(
          { name: 'journalNo' },
          { $inc: { value: 1 } },
          { new: true, upsert: true }
        );
        this.journalNo = sequence.value;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });



const Journal = mongoose.model("Journal",journalSchema )
module.exports = Journal;
