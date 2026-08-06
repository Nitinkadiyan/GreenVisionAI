const {GoogleGenAI} = require("@google/genai");

const dotenv = require("dotenv");
require("dotenv").config();
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});
module.exports = ai;
