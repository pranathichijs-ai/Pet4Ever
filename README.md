# 🐾 Pet4Ever

A community pet app for Singapore — adoption, rehoming, pet sitting, mating, care tips, and helplines.

## Project structure

```
pet4ever/
├── client/       ← React + Vite frontend (deploy on Vercel)
└── server/       ← Node.js + Express backend (deploy on Render)
```

## Quick start

### 1. Clone and set up the backend
```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm run dev
```

### 2. Set up the frontend
```bash
cd client
npm install
npm run dev
```

### 3. Set up the React frontend from scratch (one-time)
```bash
cd client
npm create vite@latest . -- --template react
npm install axios react-router-dom
```

---

## API endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | ❌ | Create account |
| POST | /api/auth/login | ❌ | Login, get JWT |
| GET | /api/pets | ❌ | List pets (filter: listingType, species, location) |
| GET | /api/pets/:id | ❌ | Single pet |
| POST | /api/pets | ✅ | Create listing |
| PUT | /api/pets/:id | ✅ | Update listing |
| DELETE | /api/pets/:id | ✅ | Delete listing |
| GET | /api/sitters | ❌ | List sitters |
| POST | /api/sitters | ✅ | Become a sitter |
| PUT | /api/sitters/:id | ✅ | Update sitter profile |
| GET | /api/tips | ❌ | Care tips (filter: species, category) |
| GET | /api/tips/helplines | ❌ | Singapore helpline numbers |

---

## Environment variables (server/.env)

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:5173
```

---

## Deployment

- **Backend** → [Render.com](https://render.com) (same as Closetos — set env vars in dashboard)
- **Frontend** → [Vercel.com](https://vercel.com) (connect GitHub repo, auto-deploys on push)

---

## Built with

- React + Vite
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- Google Maps API (Nearby screen)
