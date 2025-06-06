const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  createAt : {type :Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
