const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    species: [{ type: String }], // which pets this tip applies to
    category: {
      type: String,
      enum: ["food", "health", "grooming", "training", "vaccination", "general"],
    },
    source: { type: String }, // e.g. "AVS Singapore"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", tipSchema);
