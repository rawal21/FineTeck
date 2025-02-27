const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { fetchreport, downloadfile } = require("../controllers/ReportController");
const router = express.Router();


router.get("/:userId" , authMiddleware , fetchreport);
router.get("/download/:userId", authMiddleware,downloadfile);


module.exports = router;