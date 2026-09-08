// import { analyzeImage } from "../services/visionServices.js";
const { analyzeImage } = require("../services/VisionService.js");

const analyzeImageController = async (req, res) => {
  try {
    console.log(req.file);
    const result = await analyzeImage(req.file);
    console.log(result);
    return res.status(200).json({
      success: true,
      analysis: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { analyzeImageController };
