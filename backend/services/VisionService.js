const fs = require("fs");
const {askAI, askAI2} = require("../services/aiService.js");

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

const analyzeCleanup = async ({beforeImage, afterImage, description, analysis}) => {
    try {
        console.log("Starting cleanup AI verification...");

        if (!beforeImage || !afterImage) {
            throw new Error("Both before and after image URLs are required");
        }

        // Download original report image
        const beforeResponse = await fetch(beforeImage);

        if (!beforeResponse.ok) {
            throw new Error("Failed to fetch original report image");
        }

        const beforeBuffer = Buffer.from(await beforeResponse.arrayBuffer());

        const beforeBase64Image = beforeBuffer.toString("base64");

        // Download volunteer's after-cleanup image
        const afterResponse = await fetch(afterImage);

        if (!afterResponse.ok) {
            throw new Error("Failed to fetch after-cleanup image");
        }

        const afterBuffer = Buffer.from(await afterResponse.arrayBuffer());

        const afterBase64Image = afterBuffer.toString("base64");

        // Get MIME types from HTTP response headers
        const beforeFileMimeType = beforeResponse.headers.get("content-type") || "image/jpeg";

        const afterFileMimeType = afterResponse.headers.get("content-type") || "image/jpeg";

        console.log("Both images downloaded successfully");

        // Send both images to AI
        const response = await askAI2(
            analysis,
            beforeBase64Image,
            beforeFileMimeType,
            afterBase64Image,
            afterFileMimeType,
            description
        );

        return response;
    } catch (error) {
        console.error("Cleanup AI verification failed:", error);
        throw error;
    }
};

module.exports = {analyzeImage, analyzeCleanup};
