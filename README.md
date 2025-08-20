# PsyNova API (Backend)

This repository contains the backend service for the **PsyNova** mental wellness application. It is a secure, stateless REST API built with Node.js and Express, designed to handle user authentication, data persistence, and the core application logic.

**LIVE API ENDPOINT 🌐: https://pyscnova-backend.onrender.com**


---

## ✨ Features

*   **Secure JWT Authentication:** Endpoints are protected using JSON Web Tokens to ensure user data is secure.
*   **Password Encryption:** User passwords are not stored in plain text; they are hashed using `bcrypt.js`.
*   **Full CRUD Functionality** for all major data models.
*   **RESTful API Architecture:** Follows standard conventions for a clean and predictable API.

---

## Endpoints

The API provides the following endpoints:

#### User Routes (`/api/users`)
*   `POST /register`: Create a new user account.
*   `POST /login`: Authenticate a user and receive a JWT.
*   `GET /profile`: Get the logged-in user's profile (Protected).

#### Assessment Routes (`/api/assessments`)
*   `POST /`: Submit a new assessment for the logged-in user (Protected).
*   `GET /`: Get the assessment history for the logged-in user (Protected).

#### Mood Routes (`/api/moods`)
*   `POST /`: Save or update the mood for the logged-in user for a specific date (Protected).
*   `GET /`: Get the entire mood history for the logged-in user (Protected).

#### Resource Routes (`/api/resources`)
*   `GET /`: Fetch support resources, filterable by category (e.g., `/api/resources?category=Mild`).

---

## 🛠️ Tech Stack

*   **Runtime:** **Node.js**
*   **Framework:** **Express.js**
*   **Database:** **MongoDB** with **Mongoose** for object data modeling.
*   **Authentication:** **JSON Web Tokens (JWT)**
*   **Security:** **bcrypt.js** for password hashing, **CORS** for cross-origin security.
*   **Deployment:** Hosted on **Render**.

---

## ⚙️ Running the Project Locally

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   MongoDB (A local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/psynova-backend.git
    ```
2.  Navigate to the project directory
    ```sh
    cd psynova-backend
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Create a `.env` file in the root directory and add your environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```
5.  Start the server
    ```sh
    npm start
    ```
    The API will be available at `http://localhost:5000`.
