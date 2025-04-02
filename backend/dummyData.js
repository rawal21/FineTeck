require("dotenv").config();
const mongoose = require("mongoose");
const Budget = require("./models/budgetModel");

const userId = "67c49fdca9547b6f974fdcd7"; // Given userId

const dummyBudgetData = {
  userId: userId,
  monthlyBudget: 5000, // Example budget
  categories: [
    { name: "Food", allocated: 1200, spent: 500 },
    { name: "Rent", allocated: 2000, spent: 2000 },
    { name: "Transport", allocated: 500, spent: 300 },
    { name: "Entertainment", allocated: 800, spent: 400 },
    { name: "Savings", allocated: 500, spent: 0 },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Budget.deleteMany({ userId }); // Optional: Clear existing budgets for this user
    await Budget.create(dummyBudgetData);

    console.log("Dummy budget data added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding budget data:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
