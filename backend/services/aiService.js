const ai = require("../config/gemini.js");
const askAI = async (base64Image, mimetype) => {
  try {
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
          text: prompt,
        },
      ],
    });
    console.log(response);
    try {
      const text = response.text.trim();

      const cleanedText = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const analysis = JSON.parse(cleanedText);

      return analysis;
      // console.log(result);
    } catch (error) {
      throw new Error("Invalid JSON returned by gemini");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const askAI2 = async (
  originalAnalysis,
  beforeBase64Image,
  beforeFileMimeType,
  afterBase64Image,
  afterFileMimeType,
  description,
) => {
  console.log(originalAnalysis);
  console.log(beforeBase64Image);
  console.log(beforeFileMimeType);
  console.log(afterBase64Image);
  console.log(afterFileMimeType);
  console.log(description);
  const prompt = `
You are an environmental cleanup verification AI.

The original environmental issue was:

${JSON.stringify(originalAnalysis)}

The person who performed the cleanup provided this description:

${description}

You are given two images:

1. BEFORE image — the condition before cleanup.
2. AFTER image — the condition after cleanup.

Compare the two images and determine whether the reported
environmental issue appears to have been successfully addressed.

Evaluate:

- Whether both images appear to represent the same location.
- Whether the reported waste/problem has been reduced.
- Whether the cleanup appears genuine.
- Whether significant waste remains.
- Whether the submitted description matches the visual evidence.

Do not automatically approve the cleanup simply because
the after image looks different.

If the evidence is unclear, use "manual_review".

Return ONLY valid JSON.

Use exactly this structure:

{
  "verified": true,
  "confidence": 0.95,
  "cleanupQuality": "excellent",
  "sameLocation": true,
  "wasteReduced": true,
  "remainingWaste": "minimal",
  "evidenceMatchesDescription": true,
  "summary": "The reported waste appears to have been substantially removed.",
  "recommendation": "approve"
}

Allowed values:

cleanupQuality:
"poor" | "partial" | "good" | "excellent"

remainingWaste:
"none" | "minimal" | "moderate" | "significant" | "unclear"

recommendation:
"approve" | "reject" | "manual_review"

confidence must be a number between 0 and 1.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          inlineData: {
            mimeType: beforeFileMimeType,
            data: beforeBase64Image,
          },
        },
        {
          inlineData: {
            mimeType: afterFileMimeType,
            data: afterBase64Image,
          },
        },
        {
          text: prompt,
        },
      ],
    });
    const text = response.text;
    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {askAI,askAI2};