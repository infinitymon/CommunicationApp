// Import the Express module
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Create a new Express application
const app = express();
app.use(express.json());

const DB = ""

mongoose
  .connect(DB, {useNewUrlParser: true})
  .then(()=>console.log("MongoDB connected"))
  .catch((err) => console.log(err))

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const uploadRoute = require('./routes/upload')
app.use('/upload', uploadRoute)

const authRoute = require('./routes/authentication')
app.use('/authentication', authRoute)

// Start the server on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
