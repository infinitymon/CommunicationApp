import express from 'express'
import authentication from './routes/authentication.js';
import admin from './routes/admin.js';
import sequelize from './utils/database.js';

import './models/Calls.js';
import './models/User.js';

// Create a new Express application
const app = express();
app.use(express.json());

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

// Start the server on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
