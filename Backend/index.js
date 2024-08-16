import express from 'express'
import authentication from './routes/authentication.js';
import admin from './routes/admin.js';
import call from './routes/call.js'
import sequelize from './utils/database.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import './models/Calls.js';
import './models/User.js';

// Create a new Express application
const app = express();
app.use(express.json());
app.use(cors('*'))

sequelize.sync({
  alter: true,
  force: false,
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));


// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/admin', admin)
app.use('/authentication', authentication)
app.use('/call', call)

// Start the server on port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
