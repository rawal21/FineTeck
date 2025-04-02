const Budget = require("../models/budgetModel");

// Set Budget
module.exports.setBudget = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from URL
    const { name, allocated, spent } = req.body; // Get category data

    // Find existing budget
    let budget = await Budget.findOne({ userId });

    if (!budget) {
      // If no budget exists, create a new one
      budget = new Budget({
        userId,
        categories: [{ name, allocated, spent }],
      });
    } else {
      // If budget exists, update categories
      budget.categories.push({ name, allocated, spent });
    }

    // Save the budget
    await budget.save();

    res.status(201).json({ message: "Budget set successfully", budget });
  } catch (error) {
    console.error("Error in setBudget:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Fetch User Budget
module.exports.getBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Budget
module.exports.updateBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryId = req.params.id; // Extract category ID from request params

    console.log("req.body" ,  req.body);
    const { name, allocated, spent,  } = req.body; // Extract data properly

    

    // Find the budget document for the user
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Find the category inside the budget
    const categoryIndex = budget.categories.findIndex(cat => cat._id.toString() === categoryId);
    
    if (categoryIndex === -1) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update category inside the array
    budget.categories[categoryIndex].name = name;
    budget.categories[categoryIndex].allocated = allocated;
    budget.categories[categoryIndex].spent = spent;

    // Update the monthly budget if provided
    // if (monthlyBudget) {
    //   budget.monthlyBudget = monthlyBudget;
    // }

    // Save the updated budget document
    await budget.save();

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("Update Budget Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// Budget Alerts
const { v4: uuidv4 } = require("uuid"); // Ensure UUID for unique alert IDs

module.exports.alertBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const alerts = budget.categories
      .filter((category) => category.spent > category.allocated)
      .map((category) => ({
        id: uuidv4(), // Generate a unique ID for frontend tracking
        category: category.name,
        date: new Date(),
        message: `⚠️ Alert! You have exceeded the budget for ${category.name}.`,
        type: "warning",
        read: false, // Default as unread
      }));

    res.status(200).json({ alerts });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Budget
module.exports.deleteBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryId = req.params.id;
    
    console.log(categoryId);

    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Filter out the category that needs to be deleted
    const updatedCategories = budget.categories.filter(cat => cat._id.toString() !== categoryId);

    // If no category was removed, return an error
    if (updatedCategories.length === budget.categories.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Assign updated categories and save
    budget.categories = updatedCategories;
    await budget.save();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// Get Monthly Summary
module.exports.getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const budget = await Budget.findOne({ userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Mock last 6 months for frontend visualization
    const last6Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    // Generating summary
    const summary = last6Months.map((month, index) => {
      const totalIncome = budget.monthlyBudget; 
      const totalExpenses = budget.categories.reduce((sum, cat) => sum + cat.spent, 0);
      const savings = totalIncome - totalExpenses;

      return {
        month,
        income: totalIncome,
        expense: totalExpenses,
        savings: savings > 0 ? savings : 0, // Ensure savings are not negative
      };
    });

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
