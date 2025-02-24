const Budget =  require("../models/budgetModel");
const { sendEmailNotification, sendSMSNotification } = require("../jobs/notificationService");


module.exports.setbudget = async (req, res) => {
  try {
    const { userId, monthlyBudget, categories } = req.body;
    
    let budget = await Budget.findOne({ userId });
    if (budget) {
      return res.status(400).json({ message: "Budget already set. Update instead." });
    }

    budget = new Budget({ userId, monthlyBudget, categories });
    await budget.save();

    res.status(201).json({ message: "Budget set successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

// Fetch User Budget

module.exports.getBudget = async (req, res) => {
  try {
    const { userId } = req.params;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}


module.exports.updateBudget = async (req, res) => {
  try {
    const { userId, monthlyBudget, categories } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId },
      { monthlyBudget, categories },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

module.exports.alertBudget =async (req, res) => {
  try {
    const { userId, categoryName, amount, email, phone } = req.body;

    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const category = budget.categories.find(cat => cat.name === categoryName);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.spent += amount;
    await budget.save();

    let alertMessage = null;
    if (category.spent > category.allocated) {
      alertMessage = `⚠️ Alert! You have exceeded the budget for ${categoryName}.`;
      
      if (email) await sendEmailNotification(email, "Budget Alert", alertMessage);
      if (phone) await sendSMSNotification(phone, alertMessage);
    }

    res.status(200).json({
      message: "Expense added successfully",
      budget,
      alert: alertMessage,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}