# Netflix Clone

A full-stack Netflix clone application built with React and Node.js, featuring movie/TV show streaming, user authentication, and search functionality.

## Features

- User authentication and authorization
- Browse movies and TV shows
- Search functionality
- Responsive design
- Video streaming capabilities
- User profile management

## Tech Stack

### Frontend
- React.js
- Vite
- TailwindCSS
- React Router DOM
- Axios
- React Player
- Zustand (State Management)
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cookie Parser
- TMDB API Integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- TMDB API Key

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Environment Setup
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```env
     NODE_ENV=development
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     TMDB_API_KEY=your_tmdb_api_key
     ```

## Development

1. Start the backend server
   ```bash
   npm run dev
   ```

2. Start the frontend development server
   ```bash
   cd frontend
   npm run dev
   ```

## Production

To build and run the application in production mode:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
