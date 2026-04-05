## Ben 10 Aliens API

A production-grade REST API serving alien data across the Ben 10 universe — Classic, Alien Force, and Ultimate Alien series. Built to go beyond a basic CRUD project and demonstrate real backend engineering decisions: security, validation, query filtering, and OpenAPI documentation.

I built this as the data backbone for my Ben 10 fan app, but designed it to be publicly consumable — anyone can hit the endpoints and build their own Ben 10 experience on top of it.

### What I implemented:

**MVC Architecture:** Clean separation between `config/`, `controllers/`, `models/`, and `routes/` — the same structure used in production Node.js services, not a single-file Express app.

**OpenAPI 3.0 Docs (Swagger UI):** Full API documentation at `/api/v1/docs` — parameters, enums, response schemas, and error codes all documented. Written in a standalone `swagger.yaml` rather than scattered JSDoc comments.

**Query Filtering:** Every series endpoint supports `?name=` and `?id=` query params with case-insensitive regex matching on MongoDB, so consumers can search `?name=heat` and get Heatblast back.

**Input Validation:** POST routes use `express-validator` with a reusable `validate()` middleware that short-circuits requests before they hit the database — all 10 alien fields are validated with meaningful error messages.

**Security Layer:** `helmet.js` sets hardened HTTP headers out of the box, and `express-rate-limit` caps requests at 100 per 15-minute window using an in-memory store. Redis can be plugged in for distributed rate limiting in multi-instance deployments.

**Smart Image URL Resolution:** Image paths are stored as filenames in MongoDB and resolved to full absolute URLs in the controller using `process.env.API_BASE_URL` — so the same codebase works on `localhost:5000` and `https://ben10-aliens-api.onrender.com` without any code changes.

**Mongoose Schema Design:** Indexes only on fields that are actually queried (`id`, `name`, `series`) — not blanket-indexed across all fields, which would hurt write performance with no read benefit.

## Base URL
https://ben10-api-u7dc.onrender.com

## Endpoints
GET  /api/v1/aliens/:series              → All aliens in a series
GET  /api/v1/aliens/:series/:id          → Single alien by ID
GET  /api/v1/aliens/:series?name=        → Filter by alien name (case-insensitive)
GET  /api/v1/aliens/:series?id=          → Filter by alien ID
POST /api/v1/aliens/:series              → Add a new alien (validated)
GET  /api/v1/docs                        → Swagger UI

**Series slugs:** `classic` · `alien-force` · `ultimate-alien`

## Example Request
```bash
curl https://ben10-api-u7dc.onrender.com/api/v1/aliens/classic?name=heatblast
```
```json
[
  {
    "id": 1,
    "name": "Heatblast",
    "species": "Pyronite",
    "planet": "Pyros",
    "abilities": "Fire generation, fire manipulation, heat absorption, flight",
    "image": "https://ben10-api-u7dc.onrender.com/public/aliens/image/heatblast.webp",
    "transform": "https://ben10-api-u7dc.onrender.com/public/aliens/transformimg/heatblast.png",
    "series": "Ben 10 Classic",
    "firstAppearance": "And Then There Were 10",
    "description": "A Pyronite made of magma who can generate and manipulate fire."
  }
]
```

## Engineering Decisions

**Why env-based URL resolution?** Hardcoding `localhost` in image URLs works locally but silently breaks on every deployment. By reading `process.env.API_BASE_URL` in the controller, the API self-configures per environment — no code changes needed between local and Render.

**Why `express-validator` middleware pattern?** Instead of checking `validationResult` inside every controller, I extracted a single `validate()` middleware that sits between the rules and the handler. This keeps controllers clean and makes validation reusable across any route.

**Why selective MongoDB indexing?** Indexing every field (a common beginner mistake) increases write overhead on every insert and update with no benefit for unqueried fields. Only `id`, `name`, and `series` are indexed — the three fields that actually appear in `find()` queries.

**Why rate limiting without Redis?** For a single-instance deployment the in-memory store is sufficient and zero-config. The architecture is designed so Redis can be dropped in via `rate-limit-redis` for horizontal scaling without changing any application logic.

**Why Swagger YAML over JSDoc comments?** JSDoc OpenAPI comments scatter documentation across route files and break silently when indentation is off (YAML is whitespace-sensitive). A standalone `swagger.yaml` keeps the spec in one place, version-controllable, and importable into tools like Postman or Insomnia directly.

## The Real-World Problem This Solves

Public fan APIs are either undocumented, rate-unlimited, or return inconsistent data shapes. This API is designed like a real data service — every response has a consistent shape, images return absolute URLs (not relative paths that break cross-origin), and the Swagger docs mean any developer can understand and consume it in under 5 minutes without reading source code.

## Tech Stack

Node.js · Express · MongoDB · Mongoose · Swagger UI · helmet · express-rate-limit · express-validator · Render

## How to Run Locally
```bash
# Clone the repo
git clone https://github.com/PaneerSelvam-Eduspot/ben10-api

# Install dependencies
npm install

# Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
API_BASE_URL=http://localhost:5000

# Start the server
npm start
```

API will be live at `http://localhost:5000`
Swagger docs at `http://localhost:5000/api/v1/docs`