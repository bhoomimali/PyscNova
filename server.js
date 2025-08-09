const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import the database connection function
const connectDB = require('./config/db');
const moodRoutes = require('./routes/moodRoutes'); 
const userRoutes = require('./routes/userRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes'); // <-- ADD THIS
const resourceRoutes = require('./routes/resourceRoutes'); // <-- ADD THIS

// -------------------  2. Initial Configurations  -------------------
// Load environment variables from the .env file
// This MUST be done before any code that uses the variables
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// -------------------  3. Middlewares  -------------------
// Enable Cross-Origin Resource Sharing for all routes
// This allows your frontend (on a different domain) to make requests to this backend
// Define the allowed origins
const allowedOrigins = [
  'http://localhost:3000', // Your local frontend for testing
  'https://pysc-nova-frontend.vercel.app' // YOUR LIVE VERCEL URL
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use the configured CORS middleware
app.use(cors(corsOptions));

// Enable the Express app to parse JSON formatted request bodies
// This is necessary to handle POST/PUT requests with a JSON payload
app.use(express.json());

// -------------------  4. API Routes  -------------------
// A simple test route to check if the API is running
app.get('/', (req, res) => {
  res.send('API for Mental Health Support System is running successfully!');
});

// Mount the user-related routes
// Any request starting with '/api/users' will be handled by the userRoutes file
app.use('/api/users', userRoutes);


// (In the future, you will add more routes here)
// app.use('/api/assessments', assessmentRoutes);
// app.use('/api/resources', resourceRoutes);

// -------------------  5. Start the Server  -------------------
// Define the port the server will listen on.
// It will use the PORT variable from the .env file, or default to 5000
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('API for Mental Health Support System is running successfully!');
});
app.use('/api/moods', moodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assessments', assessmentRoutes); // <-- ADD THIS
app.use('/api/resources', resourceRoutes);   // <-- ADD THIS


// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});