
const User = require("../models/User");


module.exports.updateProfile = async (req, res) => {
  try {
    const { name, income, currency } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.income = income !== undefined ? income : user.income;
    user.currency = currency || user.currency;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}  

module.exports.getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
} ;