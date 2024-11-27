const express = require('express');
const dotenv = require('dotenv');
const {sequelize}=require('./db');
const {appointment}=require('./models/appointment');
const cors = require('cors');
const appointmentRoutes=require('./routes/appointmentRoutes');




// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use appointment routes
app.use('/api/appointments', appointmentRoutes);

app.get("*", function(req,res){
  res.sendFile(
    path.join(__dirname,"../calendar-app/build/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  )
})

const PORT=process.env.PORT || 3000;
// Function to connect to the database and start the server
const connectDatabases = async () => {
  try {
    // Authenticate the connection to the PostgreSQL database
    await sequelize.authenticate();
    console.log('PostgreSQL connected');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to databases:', err);
  }
};

// Connect to the database and start the server
connectDatabases();


// // Graceful shutdown
// const gracefulShutdown = async () => {
//   console.log('Shutting down gracefully...');
//   try {
//       await sequelize.close(); // Close the Sequelize connection
//       console.log('Database connection closed.');
//   } catch (error) {
//       console.error('Error closing the database connection:', error);
//   }
//   process.exit(0); // Exit the process
// };

// // Handle termination signals
// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);



