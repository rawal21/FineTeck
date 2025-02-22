const express = require("express");
const app = express() ; 
const dotenv = require("dotenv");
const cors  =  require("cors") ; 
const config= require("./config/db")
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");


app.use(express.json());
app.use(cors());

// db connection 
config() ;

//  routes 
app.use("/api/auth" , authRoutes);
app.use("/api/user" , profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
