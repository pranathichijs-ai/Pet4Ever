const router = require("express").Router();
const Pet = require("../models/Pet");
const authMiddleware = require("../middleware/auth");

// GET /api/pets — list all, filter by listingType or species
router.get("/", async (req, res) => {
  try {
    const { listingType, species, location } = req.query;
    const filter = { isAvailable: true };
    if (listingType) filter.listingType = listingType;
    if (species) filter.species = species;
    if (location) filter.location = new RegExp(location, "i");

    const pets = await Pet.find(filter).populate("owner", "name phone location").sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/pets/:id — single pet
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner", "name phone email location");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/pets — create listing (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.create({ ...req.body, owner: req.user.id });
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/pets/:id — update listing (owner only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorised" });

    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/pets/:id — owner only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorised" });

    await pet.deleteOne();
    res.json({ message: "Listing removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
