# Benchbnb

Benchbnb is a full-stack clone of Airbnb, designed to showcase popular bench locations in cities around the world.

## Overview

In this project, I've built a web application using React, Redux, Rails API, Google Maps JavaScript API, and Active Storage. The app allows users to view and rate benches, leveraging features like maps integration and photo uploads.

## Features Implemented

- **Authentication**: User signup, login, and logout functionality.
- **Bench Index**: Display a list of benches with interactive maps.
- **Bench Show**: View detailed information about individual benches, including ratings.
- **Reviews**: Users can leave reviews for benches.
- **Map Integration**: Utilize Google Maps API to display bench locations.
- **Photo Upload**: Implement photo upload functionality using Active Storage.

## Project Phases and Milestones

### Phase 0: User Auth

- **Backend Setup**:
  - Implemented a `User` model in Rails with attributes for authentication (e.g., `username`, `email`, `password_digest`).
  - Created RESTful API endpoints (`/api/users` for signup, `/api/session` for login/logout) for user authentication, utilizing `bcrypt` for password encryption.
- **Frontend Setup**:
  - Developed React components for user signup and login forms, integrating form validation and API interaction.
  - Configured Redux for managing user authentication state and actions.


### Phase 1: Google Maps Integration

- Implemented Google Maps API setup and rendering on bench index and show pages.
- Added custom markers and map boundaries for a better user experience.

### Phase 2: Bench CRUD Functionality

- Created CRUD functionality for benches, allowing users to create, edit, and delete bench listings.
- Integrated Active Storage for photo uploads associated with benches.

### Phase 3: Reviews

- Implemented review functionality, enabling users to leave reviews for benches.

### Phase 4: Styling and Refactoring

- Implemented CSS styling across all pages for a cohesive user interface.
- Refactored components for improved code quality and readability.

## Development Environment Setup

To run BenchBnB locally, follow these steps:

1. **Clone this repository**

2. **Install Dependencies**:
   - Install backend dependencies:
     ```bash
     bundle install
     ```

   - Install frontend dependencies:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Your Google Maps API Key**:
   - Create an `env.development.local` file in the frontend directory.
   - Open `env.development.local` and add your API key:
     ```makefile
     REACT_APP_MAPS_API_KEY=<your-copied-api-key-here>
     ```

4. **Run the Servers Concurrently**:
   - Start the Rails server:
     ```bash
     # In the root directory of the project
     rails s
     ```

   - Start the frontend development server:
     ```bash
     # In the frontend directory
     npm start
     ```

Now you can access BenchBnB locally by opening your web browser and navigating to the specified localhost address for the frontend server (usually `http://localhost:3000` by default).


