const fs = require("fs");
const   askAI  = require("../services/aiService.js");

module.exports = analyzeImage = async (file) => {
  console.log(file);
  console.log(file.buffer);
  const base64Image = fs.readFileSync(file.path).toString("base64");
  const response = await askAI(base64Image, file.mimetype);
  //   console.log(response);
  //   const result = JSON.parse(response.text);

  const savedAnalysis = {
    imageName: file.originalname,
    mimeType: file.mimetype,
    analysis: response,
  };
  console.log(savedAnalysis);
  return savedAnalysis;
};
