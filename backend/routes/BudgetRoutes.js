const express = require("express");
const { setBudget, getBudget, updateBudget, alertBudget, deleteBudget } = require("../controllers/budgetController");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router() ;

router.post("/:userId" , authMiddleware ,setBudget);
router.get('/:userId' , authMiddleware ,getBudget);
router.put("/edit/:id" , authMiddleware ,updateBudget);
router.get("/:userId/expanse" ,  authMiddleware , alertBudget)
router.delete("/:id", authMiddleware , deleteBudget);

module.exports=router;