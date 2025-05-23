const bcrypt = require("bcryptjs")
const User = require("../models/User");
const {generateToken} = require("../utils/jwt")


module.exports.signup = async (req, res) => {
  try {
    console.log("Signup Request Body:", req.body); // Debugging

    const { name, email, password, income, currency } = req.body;
    if (!name || !email || !password || !income || !currency) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, income, currency });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body); // Log request data

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token , user });
  } catch (error) {
    console.error("Login Error:", error); // Log actual error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
