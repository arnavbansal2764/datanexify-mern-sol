
# DATANEXIFY - MERN SOLUTION

This application integrates Google Calendar API with a React frontend and an Express backend. Users can sign in with their Google account, create calendar events, and view those events in a table.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Google Sign-In for user authentication.
- Access to Google Calendar to create events.
- Event listing displayed in a table.
- Responsive UI for event creation.

## Technologies

- **Frontend:** React, TypeScript, Axios
- **Backend:** Node.js, Express, TypeScript, Passport.js, Google OAuth
- **Database:** MongoDB
- **APIs:** Google Calendar API

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (if using for user data storage)
- A Google Cloud account

### Step 1: Clone the Repository

```bash
git clone https://github.com/arnavbansal2764/datanexify-mern-sol.git
cd datanexify-mern-sol
```

### Step 2: Create Google Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the **Google Calendar API** and **Google People API**.
4. Configure the **OAuth consent screen**.
5. Create **OAuth 2.0 credentials** and set the following redirect URI:
   - `http://localhost:4000/auth/google/callback`
6. Note the **Client ID** and **Client Secret**.

### Step 3: Setup Environment Variables

1. Create a `.env` file in the root of the backend directory.

```bash
# .env file in backend directory
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
MONGODB_URI=mongodb://localhost:27017/your_database_name # Optional if using MongoDB
SESSION_SECRET=your_session_secret
```

### Step 4: Install Dependencies

Navigate to both the frontend and backend directories to install dependencies.

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

## Running the Application

### Step 1: Start the Backend Server

In the backend directory, start the server:

```bash
cd backend
tsc -b
cd dist
node index.js
```

### Step 2: Start the Frontend Application

In the frontend directory, start the development server:

```bash
cd frontend
npm run dev
```

### Step 3: Open in Browser

Open your browser and go to `http://localhost:5173` to access the application.

## API Endpoints

- `GET /auth/google` - Starts the Google OAuth flow.
- `GET /auth/google/callback` - Handles the OAuth callback and retrieves user information.
- `POST /events` - Creates a new event in Google Calendar.

