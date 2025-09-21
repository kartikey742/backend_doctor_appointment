const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome to the Doctor Appointment System API');
});
// Database connection and server start
async function startServer() {
  try {
    // Enable logging all SQL queries
    sequelize.options.logging = console.log;
    
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database (this ensures tables exist)
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
     
    app.listen(PORT, () => { 
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();