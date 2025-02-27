const mongoose = require("mongoose");

const Report = mongoose.model('Report', new mongoose.Schema({
  userId: String,
  month: String,
  year: Number,
  income: Number,
  expenses: Number,
  savings: Number
}));

module.exports=Report ;