const express = require("express");
const { setbudget, getBudget, updateBudget, alertBudget } = require("../controllers/budgetController");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router() ;

router.post("/budget" , authMiddleware ,setbudget);
router.get('/:userId' , authMiddleware ,getBudget);
router.put("/edit/:id" , authMiddleware ,updateBudget);
router.post("/expance" ,  authMiddleware , alertBudget)

module.exports=router;