const mongoose = require("mongoose");

const sitterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String },
    petsAccepted: [{ type: String }], // e.g. ["dog", "cat"]
    pricePerDay: { type: Number, required: true },
    location: { type: String },
    coordinates: { lat: Number, lng: Number },
    availability: {
      from: { type: Date },
      to: { type: Date },
    },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sitter", sitterSchema);
