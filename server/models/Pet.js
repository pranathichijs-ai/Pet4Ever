const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: {
      type: String,
      required: true,
      enum: ["dog", "cat", "rabbit", "bird", "hamster", "fish", "reptile", "other"],
    },
    breed: { type: String },
    age: { type: Number }, // in months
    gender: { type: String, enum: ["male", "female", "unknown"] },
    description: { type: String },
    images: [{ type: String }], // URLs

    // What is this listing for?
    listingType: {
      type: String,
      required: true,
      enum: ["adopt", "rehome", "mate"],
    },

    // Vaccination / health info
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    healthNotes: { type: String },

    // Location
    location: { type: String }, // e.g. "Jurong West"
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // Who posted this
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
