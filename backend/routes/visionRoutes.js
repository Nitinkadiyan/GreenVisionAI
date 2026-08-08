import express from "express";
import upload from "../middlewares/multer.js";
import { analyzeImageController } from "../contollers/visionController.js";
const router = express.Router();
router.post("/analyze", upload.single("image"), analyzeImageController);
export default router;
