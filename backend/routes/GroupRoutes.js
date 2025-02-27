const express = require("express");
const { creategroup, addexpanse, getgroupDetails } = require("../controllers/GroupController");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();


router.post("/create", authMiddleware,creategroup);
router.post("/add-expanse", authMiddleware , addexpanse);
router.get('/:groupId' , authMiddleware , getgroupDetails);


module.exports = router ;