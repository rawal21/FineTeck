const express = require('express');
const router = express.Router(); 
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { getprofile, updateProfile } = require('../controllers/Profile');

router.get("/profile" , AuthMiddleware , getprofile)
router.put("/profile/update" , AuthMiddleware , updateProfile);

module.exports = router ;