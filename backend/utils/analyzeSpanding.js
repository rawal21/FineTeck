const transaction = require("../models/transaction");

const analyzeSpending = (transactions) => {
  let categories = {};
  let totalSpent = 0;
  let totalTransactions = 0;

  // Aggregate expenses only
  transactions.forEach(({ amount, category }) => {
      if (amount < 0) {  // Only consider negative amounts (expenses)
          let absAmount = Math.abs(amount);
          totalSpent += absAmount;
          categories[category] = (categories[category] || 0) + absAmount;
          totalTransactions++;
      }
  });

  if (totalSpent === 0) return ["No spending data available."];

  // Calculate average spending per category
  let avgSpending = totalSpent / Object.keys(categories).length;

  let insights = [];

  Object.entries(categories).forEach(([category, amount]) => {
      let percentage = (amount / totalSpent) * 100;
      
      if (percentage > 40) {
          insights.push(`🚨 High spending alert! You're spending ${percentage.toFixed(2)}% of your budget on ${category}. Consider serious cutbacks.`);
      } else if (percentage > 30) {
          insights.push(`⚠️ You're spending ${percentage.toFixed(2)}% on ${category}, which is quite high. Maybe reduce it.`);
      } else if (percentage > 20) {
          insights.push(`🔍 Notable spending: ${percentage.toFixed(2)}% of your budget goes to ${category}. Keep an eye on this.`);
      }

      // Compare to average spending
      if (amount > avgSpending * 1.5) {
          insights.push(`📊 Your spending on ${category} is significantly higher than your average category spending.`);
      }
  });

  return insights.length > 0 ? insights : ["✅ Your spending is well-balanced!"];
};

module.exports = analyzeSpending;
