import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const TransactionSchema = new mongoose.Schema({
    principle: {
      type: Number,
      required: [true, "Kindly provide the principle amount"],
    },
    period: {
      type: Number,
      required: [true, "Kindly provide a valid time period"]
    },
    rates: {
        type: Number,
        required: [true, "Kindly provide a valid interest rate"]
      },
    interest: {
      type: Number,
    },
    transactionType: {
      type: String
    },
    frequencyOfApplyingInterest: {
      type: Number
    },
    executionTime: {
      type: Number
    },
  },
  {
    timestamps: true
  })

  const Transaction = mongoose.model('Transaction', TransactionSchema);

  export default Transaction;
