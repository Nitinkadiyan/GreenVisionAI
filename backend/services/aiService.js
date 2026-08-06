const ai = require("../config/gemini.js");
const {analyzeImage} = require("../services/VisionService.js");
module.exports  = askAI = async (base64Image,mimetype) => {
 try{
   const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: [
      {
        inlineData: {
          mimeType: mimetype,
          data: base64Image,
        },
      },
      {
        text: `Analyze this image
        Return only valid json
        
        Do not write markdown
        Do not write explanation
        Do not write \`\`\`.
        Return exactly this format :
        {
        "objects":[],
        "scene":"",
        "summary":""
        }
        `,
      },
    ],
  });
  try{
    const result = JSON.parse(response.text);

  return result;
  }catch(error){
    throw new Error("Invalid JSON returned by gemini");
  }
 }catch(error){
  console.log(error.message);
 }
};
