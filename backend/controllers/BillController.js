const Bill =  require("../models/BillsModel");


module.exports.addBillReminder =  async (req, res) => {
  try {
      const { userId, billName, amount, dueDate } = req.body;
      const newBill = new Bill({ userId, billName, amount, dueDate });
      await newBill.save();
      res.status(201).json({ message: 'Bill reminder added successfully!' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


module.exports.allBills =  async (req, res) => {
  try {
      const { userId } = req.params;
      const bills = await Bill.find({ userId });
      res.status(200).json(bills);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports.MarkBill =  async (req, res) => {
  try {
      const { id } = req.params;
      await Bill.findByIdAndUpdate(id, { status: 'Paid' });
      res.status(200).json({ message: 'Bill marked as paid!' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}