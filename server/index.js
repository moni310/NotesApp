require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

// Routes
const noteRoutes = require('./routes/notesRoutes');
app.use('/api/note/', noteRoutes);

// database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
app.listen(process.env.port, () => {
    console.log(`Server started on port ${port}`);
});
