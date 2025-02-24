const cron = require('node-cron');
const Transaction = require('../models/transaction');
require('dotenv').config();



// Schedule cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        const recurringTransactions = await Transaction.find({ isRecurring: true });

        for (let transaction of recurringTransactions) {
            let shouldAdd = false;
            const today = new Date();
            const lastTransactionDate = new Date(transaction.date);

            if (transaction.recurrenceInterval === 'daily') {
                shouldAdd = true;
            } else if (transaction.recurrenceInterval === 'weekly') {
                shouldAdd = today - lastTransactionDate >= 7 * 24 * 60 * 60 * 1000;
            } else if (transaction.recurrenceInterval === 'monthly') {
                shouldAdd = today.getMonth() !== lastTransactionDate.getMonth();
            }

            if (shouldAdd) {
                const newTransaction = new Transaction({
                    ...transaction.toObject(),
                    _id: undefined,
                    date: today
                });
                await newTransaction.save();
            }
        }

        console.log('✅ Recurring transactions processed.');
    } catch (error) {
        console.error('❌ Error processing recurring transactions:', error);
    }
});

module.exports = cron;
