# 🌱 Leaf Matrix

A Next.js application designed for plant enthusiasts to track plant growth, manage care tasks, and stay organized with a user-friendly interface.

## 📚 Table of Contents

- [🌱 Leaf Matrix](#-leaf-matrix)
  - [📚 Table of Contents](#-table-of-contents)
  - [🌟 Features](#-features)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Running the Development Server](#running-the-development-server)
    - [Building for Production](#building-for-production)
  - [📄 Pages](#-pages)
    - [Landing Page](#landing-page)
    - [Dashboard](#dashboard)
    - [Overview Page](#overview-page)
    - [My Plants Page](#my-plants-page)
    - [Plant Care Page](#plant-care-page)
    - [User Settings Page](#user-settings-page)
  - [🔗 API Documentation](#-api-documentation)
    - [Authentication](#authentication)
    - [My Plants](#my-plants)
    - [Today's Actions](#todays-actions)
    - [Upload](#upload)
  - [🛠️ Linting and Formatting](#️-linting-and-formatting)
  - [🤝 Contribution Guidelines](#-contribution-guidelines)
  - [🧰 Troubleshooting](#-troubleshooting)
  - [📧 Contact](#-contact)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Authentication](#authentication-1)
    - [My Plants](#my-plants-1)
    - [Today's Actions](#todays-actions-1)
    - [Upload](#upload-1)
    - [Users](#users)

## 🌟 Features

- User authentication via GitHub and Google
- Plant management with image uploads and search functionality
- Interactive care calendar and timeline
- Personalized dashboard with reminders and plant highlights
- Light/dark mode toggle

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/capstone-v3.git
   cd capstone-v3
   ```

2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

3. Create an `.env` file in the root directory and add the required environment variables:

   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_secret"
   GITHUB_ID="your_github_id"
   GITHUB_SECRET="your_github_secret"
   GOOGLE_ID="your_google_id"
   GOOGLE_SECRET="your_google_secret"
   MONGODB_URI="your_mongodb_uri"
   CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000` in your browser.

### Building for Production

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

3. Access the application at `http://localhost:3000` in your browser.

## 📄 Pages

### Landing Page

- **Path**: `/`
- Introduces the app and directs users to log in or sign up.

### Dashboard

- **Path**: `/dashboard`
- Protected Route

### Overview Page

- **Path**: `/dashboard/overview`
- Displays upcoming tasks and plant highlights.

### My Plants Page

- **Path**: `/dashboard/my-plants`
- Manage plants with options to add, edit, delete, and search.

### Plant Care Page

- **Path**: `/dashboard/care`
- Tools for plant care, including a calendar and timeline.

### User Settings Page

- **Path**: `/dashboard/settings`
- Manage user profile information and delete the account.

## 🔗 API Documentation

Detailed API endpoint documentation is available in the [API Documentation section](#api-documentation).

### Authentication

- Handles user login/logout via NextAuth.js.

### My Plants

- Fetch, add, edit, or delete plant data.

### Today's Actions

- Retrieve care actions for the day.

### Upload

- Image uploads for plants.

## 🛠️ Linting and Formatting

To ensure code quality, use the following commands:

- Run ESLint:

  ```bash
  npm run lint
  ```

- Format code with Prettier:

  ```bash
  npm run format
  ```

## 🤝 Contribution Guidelines

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## 🧰 Troubleshooting

- **Issue**: Dependency conflicts during `npm install`.

  - **Solution**: Use the `--legacy-peer-deps` flag.

- **Issue**: Environment variables not recognized.

  - **Solution**: Ensure the `.env` file is correctly formatted.

- **Issue**: Application not running on `http://localhost:3000`.
  - **Solution**: Verify that the development server is running and there are no port conflicts.

## 📧 Contact

For questions or support, please reach out to:

- **Email**: vincent.winkler98@gmail.com
- **GitHub Issues**: [Capstone Repository](https://github.com/capstone-v3/issues)

---

Thank you for using Leafmatrix! 🌿

# API Documentation

This markdown file documents all API endpoints based on the provided `route.ts` files.

## Endpoints

### Authentication

**Route**: `/api/auth/[...nextauth]`

- **Method**: `POST`
  - Description: Handles authentication logic through `NextAuth.js`.
  - Payload: Depends on the authentication provider used.
  - Response: JSON object containing user session information or error details.
  - **Return Codes**:
    - `200`: Successful authentication.
    - `401`: Unauthorized (invalid credentials).
    - `500`: Server error.

---

### My Plants

**Route**: `/api/my-plants`

- **Method**: `GET`
  - Description: Fetches all plants associated with the authenticated user.
  - Response: JSON array of plants, each containing plant data (e.g., name, type, growth stages).
  - **Return Codes**:
    - `200`: Successfully retrieved plants.
    - `401`: Unauthorized access.
    - `500`: Server error.

**Route**: `/api/my-plants/[id]`

- **Method**: `GET`

  - Description: Fetches a specific plant by its ID for the authenticated user.
  - Parameters:
    - `id` (path): The unique identifier of the plant.
  - Response: JSON object containing plant details.
  - **Return Codes**:
    - `200`: Successfully retrieved plant.
    - `401`: Unauthorized access.
    - `404`: Plant not found.
    - `500`: Server error.

- **Method**: `DELETE`
  - Description: Deletes a specific plant by its ID for the authenticated user.
  - Parameters:
    - `id` (path): The unique identifier of the plant.
  - Response: Success message or error.
  - **Return Codes**:
    - `200`: Plant successfully deleted.
    - `401`: Unauthorized access.
    - `404`: Plant not found.
    - `500`: Server error.

---

### Today's Actions

**Route**: `/api/todays-actions`

- **Method**: `GET`
  - Description: Retrieves a list of actions the user needs to complete for their plants today.
  - Response: JSON array of actions with details.
  - **Return Codes**:
    - `200`: Successfully retrieved actions.
    - `401`: Unauthorized access.
    - `500`: Server error.

---

### Upload

**Route**: `/api/upload`

- **Method**: `POST`
  - Description: Allows users to upload images or files related to their plants.
  - Payload: Multipart/form-data with file input.
  - Response: JSON object containing file upload status and URL.
  - **Return Codes**:
    - `200`: File uploaded successfully.
    - `400`: Bad request (e.g., invalid file format).
    - `401`: Unauthorized access.
    - `500`: Server error.

---

### Users

**Route**: `/api/users`

- **Method**: `GET`
  - Description: Retrieves a list of all users (admin-only endpoint).
  - Response: JSON array of user objects.
  - **Return Codes**:
    - `200`: Successfully retrieved users.
    - `401`: Unauthorized access.
    - `403`: Forbidden (admin-only access required).
    - `500`: Server error.

**Route**: `/api/users/[id]`

- **Method**: `GET`

  - Description: Retrieves a specific user by their ID.
  - Parameters:
    - `id` (path): The unique identifier of the user.
  - Response: JSON object containing user details.
  - **Return Codes**:
    - `200`: Successfully retrieved user.
    - `401`: Unauthorized access.
    - `404`: User not found.
    - `500`: Server error.

- **Method**: `DELETE`
  - Description: Deletes a specific user by their ID.
  - Parameters:
    - `id` (path): The unique identifier of the user.
  - Response: Success message or error.
  - **Return Codes**:
    - `200`: User successfully deleted.
    - `401`: Unauthorized access.
    - `404`: User not found.
    - `500`: Server error.
