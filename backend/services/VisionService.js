const fs = require("fs");
const { askAI, askAI2 } = require("../services/aiService.js");

analyzeImage = async (files) => {
  console.log("nikku23");
  console.log(files);
  console.log("nikku2");
  console.log(files.buffer);
  const base64Image = fs.readFileSync(files.path).toString("base64");
  const response = await askAI(base64Image, files.mimetype);
  //   console.log(response);
  //   const result = JSON.parse(response.text);

  const savedAnalysis = {
    imageName: files.originalname,
    mimeType: files.mimetype,
    analysis: response,
  };
  console.log(savedAnalysis);
  return response;
};

const analyzeCleanup = async (
  beforeFile,
  afterFile,
  description,
  originalAnalysis,
) => {
  // console.log("beforFile",beforeFile.description);
  // console.log("original analysis", beforeFile.analysis);
  // console.log(afterFile);
  // console.log("nikkudon");
  console.log("hello", beforeFile.beforeImage);
  // console.log("hello2",afterFile);
  // console.log("nikkudfon2");
  try {
    const originalAnalysis = beforeFile.analysis;
    const description = beforeFile.description;
    const beforeBase64Image = await fs
      .readFileSync(beforeFile.beforeImage.path)
      .toString("base64");
    // console.log(beforeBase64Image);
    const afterBase64Image = await fs
      .readFileSync(beforeFile.afterImage.path)
      .toString("base64");
    console.log("before airesponse");
    // console.log(afterBase64Image);
    // console.log(beforeFile.beforeImage.mimetype);
    const beforeFileMimeType = beforeFile.beforeImage.mimetype;
    const afterFileMimeType = beforeFile.afterImage.mimetype;
    const response = await askAI2(
      originalAnalysis,
      beforeBase64Image,
      beforeFileMimeType,
      afterBase64Image,
      afterFileMimeType,
      description,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { analyzeImage, analyzeCleanup };
