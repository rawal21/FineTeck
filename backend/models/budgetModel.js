const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [
    {
      name: { type: String, required: true },
      allocated: { type: Number, required: true },
      spent: { type: Number, default: 0 }, // Track spending
    },
  ],
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;