const fs = require("fs");
const ai 
const {askAI} = require("../services/aiService.js");

module.exports =  analyzeImage = async (file) => {
  console.log(file);
  const base64Image = file.buffer.toString("base64");
  const response = await askAI(base64Image, file.mimetype);
  //   console.log(response);
  //   const result = JSON.parse(response.text);

  try {
    const savedAnalysis = await Analysis.create({
      imageName: file.originalname,
      mimeType: file.mimetype,
      analysis: response,
    });
    console.log(savedAnalysis);
    return savedAnalysis; 
  } catch (err) {
    console.log(err);
  }
};
