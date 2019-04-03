import mongoose from 'mongoose';

const TransactionCalculationSchema = new mongoose.Schema({
    transactionType: {
      type: String
    },
    amount: {
      type: Number
    },
    cost: {
      type: Number
    },
    withheldTax: {
      type: Number
    },
    taxedTotal: {
        type: Number
      },
    discount: {
      type: Number
    },
    numberOfMonthsLeftInYear: {
      type: Number
    },
    numberOfDaysLeftInYear: {
        type: Number
    },
    numberOfDaysLeftInMonth: {
        type: Number
    },
    date: {
        type: Date
      },
  },
  {
    timestamps: true
  })

  const TransactionCalculation = mongoose.model('TransactionCalculation', TransactionCalculationSchema);

  export default TransactionCalculation;
