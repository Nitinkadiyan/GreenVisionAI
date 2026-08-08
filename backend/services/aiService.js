const ai = require("../config/gemini.js");
module.exports  = askAI = async (base64Image,mimetype) => {
 try{
  const prompt = `
Analyze this image for an environmental reporting platform.

Return ONLY valid JSON.

Analyze:

- wasteType
- confidence
- severity
- estimatedWasteKg
- environmentalRisk
- possibleAction
- suggestedAuthority
- summary

Rules:
- confidence must be a number between 0 and 100.
- severity must be one of: Low, Medium, High, Critical.
- estimatedWasteKg must be a number.
- environmentalRisk should describe the major environmental risk.
- possibleAction should describe the recommended action.
- suggestedAuthority should identify the most appropriate authority.
- summary should be a short description of the issue.

If the image does not contain a recognizable environmental issue,
clearly indicate that in the response.

Return JSON only.
`;
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
        text:prompt,
      },
    ],
  });
    console.log(response);
  try{
  
   const text = response.text.trim();

const cleanedText = text
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/i, "")
  .trim();

const analysis = JSON.parse(cleanedText);

return analysis;
  // console.log(result);

  }catch(error){
    throw new Error("Invalid JSON returned by gemini");
  }
 }catch(error){
  console.log(error.message);
 }
};
