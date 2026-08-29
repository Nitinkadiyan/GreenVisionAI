import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    analysis: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Analysis = mongoose.model("Analysis",analysisSchema);
export default Analysis;