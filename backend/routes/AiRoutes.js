const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { monthlyAlarts, fetchTips } = require("../controllers/AnalizeSpandingController");
const router = express.Router();


router.get('/:userId' , authMiddleware , fetchTips );
router.get("/trends/:userId" , authMiddleware , monthlyAlarts );

module.exports = router ; 