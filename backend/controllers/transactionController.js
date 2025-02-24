const Transaction=  require("../models/transaction");

module.exports.addTransactions = async (req, res) => {
  try {
      const { userId, amount, category, type, isRecurring, recurrenceInterval } = req.body;
      const transaction = new Transaction({ userId, amount, category, type, isRecurring, recurrenceInterval });
      await transaction.save();
      res.status(201).json({ success: true, message: 'Transaction added successfully', transaction });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
} ;

module.exports.getAllTransaction =  async (req, res) => {
  try {
      const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
      res.json({ success: true, transactions });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

module.exports.editTransaction =async (req, res) => {
  try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, message: 'Transaction updated successfully', updatedTransaction });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
} ;

module.exports.deleteTranscations = async (req, res) => {
  try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

module.exports.getsummary = async (req, res) => {
  try {
      const { userId } = req.params;
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


