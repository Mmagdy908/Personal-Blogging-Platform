# Personal Blogging Platform

## Overview
This is a robust RESTful API for a Personal Blogging Platform. It allows users to register, log in, and manage their own blog posts. The API is built with security, scalability, and clean code principles in mind.

## Database Choice
**Database**: MongoDB (via Mongoose)
**Why**: 
- **Flexibility**: NoSQL databases like MongoDB allow for rapid development and flexibility in schema design.
- **Scalability**: MongoDB scales horizontally very well.
- **JSON Friendly**: Since it's a Node/Express app, using BSON/JSON natively between the DB and the application layer feels seamless.
- **Relationships**: The one-to-many relationship (User to Posts) is easy to achieve using document references (e.g., `author: { type: String, ref: 'User' }`).

## Prerequisites
- Node.js
- MongoDB (Running locally or a MongoDB Atlas URI)

## Setup and Running Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd Personal-Blogging-Platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/blogging-platform
   JWT_SECRET=your_super_secret_jwt_key
   TOKEN_EXPIRES_IN=7d
   SALT=12
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Implemented Endpoints

**API Documentation**: A [Postman Collection](Personal_Blogging_Platform.postman_collection.json) is included in the root of the repository. You can import this JSON file into Postman to test all endpoints easily.

### Auth
- **POST `/auth/register`**: Register a new user. 
  - Body: `{ "name": "user", "email": "user@example.com", "password": "password123" }`
- **POST `/auth/login`**: Authenticate a user and return a JWT.
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Posts
- **GET `/posts`**: Public route to view all blog posts.
- **POST `/posts`**: Protected route to create a new post (linked to the logged-in user).
  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Body: `{ "title": "My First Post", "content": "Hello World!" }`
- **PUT `/posts/:id`**: Protected route to update a post (only if the user is the owner).
  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Body: `{ "title": "Updated Title", "content": "Updated Content" }`
- **DELETE `/posts/:id`**: Protected route to delete a post (only if the user is the owner).
  - Headers: `Authorization: Bearer <your_jwt_token>`

## Tech Stack
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Tokens)** for Authentication
- **Bcryptjs** for Password Hashing
- **Joi** for Data Validation