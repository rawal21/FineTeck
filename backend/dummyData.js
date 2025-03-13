require("dotenv").config();
const mongoose = require("mongoose");
const Transaction = require("./models/transaction"); // Adjust path if needed

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/yourDatabaseName";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Dummy transaction data
const transactions = [
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 5000,
    category: "Salary",
    date: new Date("2025-03-01T10:00:00Z"),
    type: "income",
    isRecurring: true,
    recurrenceInterval: "monthly",
  },
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 200,
    category: "Groceries",
    date: new Date("2025-03-05T14:30:00Z"),
    type: "expense",
    isRecurring: false,
  },
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 100,
    category: "Subscription",
    date: new Date("2025-03-10T08:00:00Z"),
    type: "expense",
    isRecurring: true,
    recurrenceInterval: "monthly",
  },
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 50,
    category: "Transport",
    date: new Date("2025-03-12T09:15:00Z"),
    type: "expense",
    isRecurring: false,
  },
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 300,
    category: "Freelance",
    date: new Date("2025-03-15T16:45:00Z"),
    type: "income",
    isRecurring: false,
  },
  {
    userId: "67c49fdca9547b6f974fdcd7",
    amount: 150,
    category: "Dining Out",
    date: new Date("2025-03-18T19:00:00Z"),
    type: "expense",
    isRecurring: false,
  },
];

// Insert data into MongoDB
const seedDB = async () => {
  try {
    await Transaction.deleteMany({}); // Optional: Clear old data
    const insertedTransactions = await Transaction.insertMany(transactions);
    console.log(`${insertedTransactions.length} transactions added successfully.`);
  } catch (error) {
    console.error("Error inserting transactions:", error);
  } finally {
    mongoose.connection.close(); // Close connection after operation
  }
};

seedDB();
