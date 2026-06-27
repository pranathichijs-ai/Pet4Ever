const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    location: { type: String }, // e.g. "Tampines, Singapore"
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
