const Transaction=  require("../models/transaction");

module.exports.addTransactions = async (req, res) => {
  try {
      const {amount, category, type, isRecurring, recurrenceInterval } = req.body;
      const userId = req.user._id;
      const transaction = new Transaction({ userId, amount, category, type, isRecurring, recurrenceInterval });
      await transaction.save();
      res.status(201).json({ success: true, message: 'Transaction added successfully', transaction });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
} ;

module.exports.getAllTransaction = async (req, res) => {
    const userId = req.params.userId; // Extract userId properly

    try {
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        // Calculate total expense
        const totalExpense = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        res.json({ success: true, transactions, totalExpense });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports.editTransaction =async (req, res) => {

    const userId = req.user._id;
  try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(userId, req.body, { new: true });
      res.json({ success: true, message: 'Transaction updated successfully', updatedTransaction });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
} ;

module.exports.deleteTranscations = async (req, res) => {

    const userId = req.user._id;
  try {
      await Transaction.findByIdAndDelete(userId);
      res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

module.exports.getsummary = async (req, res) => {
  try {
      const { userId } = req.user._id;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const transactions = await Transaction.aggregate([
          {
              $match: {
                  userId: mongoose.Types.ObjectId(userId),
                  date: {
                      $gte: new Date(currentYear, currentMonth, 1),
                      $lt: new Date(currentYear, currentMonth + 1, 1)
                  }
              }
          },
          {
              $group: {
                  _id: "$type",
                  totalAmount: { $sum: "$amount" }
              }
          }
      ]);

      res.json({ success: true, summary: transactions });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}


