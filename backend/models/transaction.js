const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['income', 'expense'], required: true }, // 'income' or 'expense'
    description: { type: String } ,
    isRecurring: { type: Boolean, default: false }, // Recurring Transaction
    recurrenceInterval: { type: String, enum: ['daily', 'weekly', 'monthly'], default: null } // If recurring
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
