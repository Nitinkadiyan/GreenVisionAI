// import express from "express";
// import upload from "../middlewares/multer.js";
const express = require("express");
const upload = require("../middleware/multer.js");
const {
  analyzeImageController,
} = require("../controllers/visionController.js");
// import { analyzeImageController } from "../contollers/visionController.js";
const router = express.Router();
router.post("/analyze", upload.single("image"), analyzeImageController);
module.exports = router;
