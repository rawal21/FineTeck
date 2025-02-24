const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { addTransactions, getAllTransaction, editTransaction, deleteTranscations } = require("../controllers/transactionController");

const router  = express.Router(); 


router.post("/add" , authMiddleware ,  addTransactions);
router.get("/:userId" , authMiddleware ,  getAllTransaction);
router.put('/edit/:id' , authMiddleware , editTransaction);
router.delete("/delete/:id" , authMiddleware, deleteTranscations);


module.exports = router ; 
