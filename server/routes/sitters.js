const router = require("express").Router();
const Sitter = require("../models/Sitter");
const authMiddleware = require("../middleware/auth");

// GET /api/sitters
router.get("/", async (req, res) => {
  try {
    const { location, pet } = req.query;
    const filter = { isActive: true };
    if (location) filter.location = new RegExp(location, "i");
    if (pet) filter.petsAccepted = pet;

    const sitters = await Sitter.find(filter).populate("user", "name avatar phone").sort({ rating: -1 });
    res.json(sitters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/sitters — become a sitter
router.post("/", authMiddleware, async (req, res) => {
  try {
    const existing = await Sitter.findOne({ user: req.user.id });
    if (existing) return res.status(400).json({ message: "You already have a sitter profile" });

    const sitter = await Sitter.create({ ...req.body, user: req.user.id });
    res.status(201).json(sitter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/sitters/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const sitter = await Sitter.findById(req.params.id);
    if (!sitter) return res.status(404).json({ message: "Sitter not found" });
    if (sitter.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorised" });

    const updated = await Sitter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
