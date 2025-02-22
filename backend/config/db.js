const mongoose = require("mongoose");
require("dotenv").config() ; 

   async function  config () { 
  
   await mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connection successfull"))
.catch((err)=>console.log(err));
 }

 module.exports = config ;