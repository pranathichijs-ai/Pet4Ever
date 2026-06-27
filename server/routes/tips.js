const router = require("express").Router();
const Tip = require("../models/Tip");

// GET /api/tips
router.get("/", async (req, res) => {
  try {
    const { species, category } = req.query;
    const filter = {};
    if (species) filter.species = species;
    if (category) filter.category = category;

    const tips = await Tip.find(filter).sort({ createdAt: -1 });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tips/helplines — hardcoded Singapore numbers
router.get("/helplines", (req, res) => {
  res.json([
    {
      name: "SPCA Singapore",
      number: "6287 5355",
      description: "Report animal abuse, surrender animals, adoption enquiries",
      hours: "Mon–Fri 9am–5pm",
      website: "https://www.spca.org.sg",
    },
    {
      name: "Animal & Veterinary Service (AVS)",
      number: "1800 476 1600",
      description: "Government body for animal welfare, licensing, strays",
      hours: "Mon–Fri 8:30am–5:30pm",
      website: "https://www.nparks.gov.sg/avs",
    },
    {
      name: "Animal Concerns Research & Education Society (ACRES)",
      number: "9783 7782",
      description: "24-hour wildlife rescue and animal cruelty reporting",
      hours: "24 hours",
      website: "https://www.acres.org.sg",
    },
    {
      name: "House Rabbit Society Singapore",
      number: "contact via website",
      description: "Rabbit rescue, rehoming, and care advice",
      hours: "By appointment",
      website: "https://hrss.org.sg",
    },
  ]);
});

module.exports = router;
