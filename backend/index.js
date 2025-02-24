require('./jobs/recurringTransactions'); 
require("dotenv").config();
const express = require("express");
const app = express() ; 
const cors  =  require("cors") ; 
const config= require("./config/db")
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const BudgetRoutes = require("./routes/BudgetRoutes");




app.use(express.json());
app.use(cors());

// db connection 
config() ;

//  routes 
app.use("/api/auth" , authRoutes);
app.use("/api/user" , profileRoutes);
app.use("/api/transaction" , transactionRoutes);
app.use("/api/budget" , BudgetRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
