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
const AiRoutes = require("./routes/AiRoutes");
const GroupRoutes = require("./routes/GroupRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use(express.json());
app.use(cors());

// db connection 
config() ;

//  routes 
app.use("/api/auth" , authRoutes);
app.use("/api/user" , profileRoutes);
app.use("/api/transaction" , transactionRoutes);
app.use("/api/budget" , BudgetRoutes);
app.use("/api/insights" , AiRoutes);
app.use("/api/group", GroupRoutes);
app.use("/api/report" , reportRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
