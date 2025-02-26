const Transaction = require("../models/transaction");
const analyzeSpending = require("../utils/analyzeSpanding")

module.exports.fetchTips =  async (req, res) => {
  try {
      const { userId } = req.params;
      const transactions = await Transaction.find({ userId });
      
      if (!transactions.length) {
          return res.json({ insights: ["No transactions found to analyze."] });
      }

      const insights = analyzeSpending(transactions);
      return res.json({ insights });
  } catch (error) {
      res.status(500).json({ error: "Server error. Please try again later." });
  }
} ;


module.exports.monthlyAlarts = async (req, res) => {
  try {
      const { userId } = req.params;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const transactions = await Transaction.find({
          userId,
          date: {
              $gte: new Date(currentYear, currentMonth, 1),
              $lt: new Date(currentYear, currentMonth + 1, 1)
          }
      });
      
      if (!transactions.length) {
          return res.json({ trends: "No transactions found for this month." });
      }

      const insights = analyzeSpending(transactions);
      return res.json({ month: currentMonth + 1, year: currentYear, insights });
  } catch (error) {
      res.status(500).json({ error: "Server error. Please try again later." });
  }
} ;


