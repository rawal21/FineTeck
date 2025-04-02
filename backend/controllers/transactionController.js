const User = require("../models/User");
const Budget = require("../models/budgetModel");
const Transaction = require("../models/transaction");

module.exports.addTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, category, type, description, isRecurring, recurrenceInterval } = req.body;

    // Step 1: Create Transaction
    const transaction = new Transaction({
      userId,
      amount,
      category,
      type,
      description,
      isRecurring,
      recurrenceInterval
    });

    await transaction.save();

    // Step 2: If transaction is of type "income", update the User's income
    if (type === "income") {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.income += amount; // Add income dynamically
      await user.save();
    }

    // Step 3: If it's an "expense", update the Budget model
    if (type === "expense") {
      const budget = await Budget.findOne({ userId });

      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }

      // Find the category in the budget
      const categoryIndex = budget.categories.findIndex(cat => cat.name === category);
      if (categoryIndex === -1) {
        return res.status(400).json({ message: "Category does not exist in the budget" });
      }

      // Update the spent value dynamically
      budget.categories[categoryIndex].spent += amount;

      // Save the updated budget
      await budget.save();
    }

    res.status(201).json({ message: "Transaction added successfully", transaction });

  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};




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


