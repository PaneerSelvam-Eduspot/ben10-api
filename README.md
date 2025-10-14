Ben 10 Aliens API (ben10-api) 👾

🎯 Project Overview

The Ben 10 Aliens API is a robust, production-ready RESTful service built to manage data for all major aliens featured in the Ben 10 universe.

This project was developed as a comprehensive demonstration of full-stack API development, emphasizing clean architecture, database integration, and modern asynchronous handling in a Node.js environment.

✨ Key Features & Functionality

This API is fully functional and supports standard CRUD operations (Create, Read, Update, Delete) on the alien database.

RESTful Design: Implements clean, predictable resource-based routes (/api/v1/aliens).

Database Integration: Seamlessly connects to a MongoDB cluster using Mongoose for data modeling, validation, and persistence.

Modern JavaScript: Fully migrated to ES Module (ESM) syntax (import/export) for modern Node.js standards.

Asynchronous Handling: Utilizes async/await for all database operations to ensure non-blocking performance.

Robust Error Handling: Implements standardized error responses (e.g., 404 Not Found, 400 Bad Request) for reliable client-side consumption.

Security Best Practices: Secures connection strings and sensitive data using the dotenv package and proper .gitignore configuration.

🛠️ Technology Stack
Category

Technology

Purpose

Backend Runtime

Node.js

Server-side JavaScript execution environment.

Web Framework

Express.js

Minimalist and flexible web application framework.

Database

MongoDB Atlas

Cloud-hosted NoSQL document database.

ODM (Object Data Modeling)

Mongoose

Provides schema-based modeling for application data.

Configuration

dotenv

Manages environment variables for secure and isolated development/deployment configurations.

🚀 Quick Start & Installation
These instructions will get a copy of the project up and running on your local machine.

Prerequisites
Node.js (v18+)

MongoDB Atlas Account (or local MongoDB instance)

Setup Steps
Clone the Repository

git clone https://github.com/PaneerSelvam-Eduspot/ben10-api.git 
cd ben10-api

Install Dependencies

npm install

Environment Configuration
Create a file named .env in the root directory and add your MongoDB connection string. This keeps sensitive data secure and out of the public repository.

# .env file content
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
PORT=5000 # Optional: Default port

Run the Server

npm start
# or using nodemon for development:
npm run dev 

The API will be available at http://localhost:5000 (or your configured port).

🌐 API Endpoints
All endpoints are prefixed with /api/v1/aliens.

HTTP Method

Route

Description

Expected Body

GET

/

Retrieves a list of all aliens.

N/A

GET

/:id

Retrieves a specific alien by ID.

N/A

POST

/

Creates a new alien entry.

{ "name": "...", "species": "...", "powers": ["...", "..."] }

PUT

/:id

Full update of an existing alien by ID.

Full alien object

PATCH

/:id

Partial update of an existing alien by ID.

{ "powers": ["new power"] }

DELETE

/:id

Removes an alien from the database.

N/A

🔒 Developer Highlights
This section demonstrates key professional competencies:

Dependency Management: Utilized package.json for precise project dependencies and scripts.

Modernizing Codebase: Successfully migrated from CommonJS (require) to ES Modules (import) to adhere to modern Node.js standards.

Secure Configuration: Implemented robust separation of code and configuration, ensuring that secret keys are never committed to the repository (using .gitignore for .env).

Deployment Ready: The API structure is designed for seamless deployment on platforms like Vercel, Render, or Heroku, relying on environment variables for database connectivity.
