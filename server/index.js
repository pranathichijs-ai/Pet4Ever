require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const petsRoutes = require("./routes/pets");
const sittersRoutes = require("./routes/sitters");
const tipsRoutes = require("./routes/tips");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petsRoutes);
app.use("/api/sitters", sittersRoutes);
app.use("/api/tips", tipsRoutes);

app.get("/", (req, res) => res.json({ message: "Pet4Ever API is running 🐾" }));

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
