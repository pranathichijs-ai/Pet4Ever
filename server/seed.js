require("dotenv").config();
const mongoose = require("mongoose");
const Tip = require("./models/Tip");

const tips = [
  { title: "Core vaccines for dogs in Singapore", category: "vaccination", species: ["dog"], content: "Dogs in Singapore require Distemper, Parvovirus, and Adenovirus (DAP) vaccines. Rabies vaccination is compulsory under AVS regulations. Puppies should receive their first vaccine at 6-8 weeks, with boosters every 3-4 weeks until 16 weeks old.", source: "AVS Singapore" },
  { title: "Cat vaccination schedule", category: "vaccination", species: ["cat"], content: "Core vaccines for cats include Feline Panleukopenia, Calicivirus, and Rhinotracheitis (FVRCP). First vaccine at 8 weeks, boosters at 12 and 16 weeks, then annually. Indoor cats still need vaccines as viruses can be carried in on shoes and clothing.", source: "AVS Singapore" },
  { title: "What to feed your dog", category: "food", species: ["dog"], content: "Feed a balanced diet of quality dry kibble or wet food. Avoid chocolate, grapes, raisins, onions, garlic, and xylitol — all toxic to dogs. Puppies need 3-4 meals a day, adults 2 meals. Always provide fresh water.", source: "SPCA Singapore" },
  { title: "What to feed your cat", category: "food", species: ["cat"], content: "Cats are obligate carnivores and need animal protein. Feed a mix of wet and dry food. Avoid onions, garlic, grapes, chocolate, and raw fish regularly. Kittens need food 3-4 times daily. Never feed dog food to cats long-term.", source: "SPCA Singapore" },
  { title: "Feeding your rabbit", category: "food", species: ["rabbit"], content: "80% of a rabbit's diet should be fresh timothy hay. Add leafy greens like romaine lettuce, bok choy, and cilantro. Pellets in small amounts only. Avoid iceberg lettuce, cabbage, and sugary fruits. Fresh water always available.", source: "House Rabbit Society Singapore" },
  { title: "Hamster diet guide", category: "food", species: ["hamster"], content: "Feed hamsters a mix of pellets, fresh vegetables, and occasional seeds. Good options include broccoli, cucumber, carrot, and apple. Avoid citrus fruits, onions, and almonds. Remove fresh food after a few hours to prevent spoilage." },
  { title: "Grooming your dog", category: "grooming", species: ["dog"], content: "Brush your dog 2-3 times a week to prevent matting. Bathe every 4-6 weeks using dog shampoo. Trim nails monthly — overgrown nails cause pain and posture problems. Clean ears weekly with a vet-approved solution. Brush teeth 2-3 times a week." },
  { title: "Grooming your cat", category: "grooming", species: ["cat"], content: "Short-haired cats need brushing once a week; long-haired cats daily. Cats rarely need baths unless dirty. Trim nails every 2-3 weeks. Check ears weekly for wax buildup or mites. Dental hygiene is important — brush teeth or use dental treats." },
  { title: "Signs your pet needs a vet urgently", category: "health", species: ["dog", "cat", "rabbit", "hamster"], content: "Seek emergency vet care for: difficulty breathing, collapse or inability to stand, seizures, severe bleeding, suspected poisoning, not eating for 24+ hours, bloated abdomen, or crying in pain. In Singapore, 24-hour vet clinics include Animal Recovery Centre and Mount Pleasant.", source: "AVS Singapore" },
  { title: "Preventing heatstroke in Singapore", category: "health", species: ["dog", "cat", "rabbit"], content: "Singapore's heat is dangerous for pets. Never leave pets in a parked car. Walk dogs early morning or after 7pm. Provide shade and fresh cool water always. Signs of heatstroke: heavy panting, drooling, red gums, collapse. Cool with wet towels and go to vet immediately." },
  { title: "Basic obedience training for dogs", category: "training", species: ["dog"], content: "Start with sit, stay, come, and leave it. Use positive reinforcement — treats and praise work better than punishment. Keep sessions to 5-10 minutes as puppies have short attention spans. Be consistent — use the same commands every time. Enroll in puppy classes for socialisation." },
  { title: "Litter training your cat", category: "training", species: ["cat"], content: "Place litter box in a quiet, accessible location. Use unscented litter initially. Clean the box daily — cats refuse dirty boxes. Have one box per cat plus one extra. If your cat avoids the box, rule out medical issues with a vet visit first." },
  { title: "Rabbit-proofing your home", category: "general", species: ["rabbit"], content: "Rabbits chew everything — cover electrical wires, remove toxic plants, and block off small spaces. Provide chew toys and cardboard to redirect chewing. Rabbits need at least 3 hours of exercise outside their enclosure daily. They are social animals and do better in pairs." },
  { title: "Setting up a hamster cage", category: "general", species: ["hamster"], content: "Minimum cage size is 80x50cm for a Syrian hamster. Provide at least 15cm of bedding for burrowing. A solid-surface wheel of 28cm+ is essential. Hamsters are solitary — never house Syrian hamsters together. Spot clean daily, full clean monthly." },
  { title: "Introducing a new pet to your home", category: "general", species: ["dog", "cat", "rabbit"], content: "Keep the new pet in a separate room for 1-2 weeks. Let pets smell each other under the door first. Introduce in neutral territory with supervision. Never force interactions. Feed both pets on opposite sides of a door to create positive associations. Be patient — it can take weeks." },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to MongoDB");
  await Tip.deleteMany({});
  await Tip.insertMany(tips);
  console.log(`✅ Seeded ${tips.length} tips successfully!`);
  process.exit(0);
}).catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});