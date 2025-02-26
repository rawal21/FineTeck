const GroupSchema = new mongoose.Schema({
  name: String,
  members: [String],
  transactions: [
    {
      description: String,
      amount: Number,
      paidBy: String,
      splitAmong: [String],
      perPersonAmount: Number,
    },
  ],
  pendingAmounts: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Group = mongoose.model('Group', GroupSchema);