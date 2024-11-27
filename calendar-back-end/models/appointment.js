const {  DataTypes } = require("sequelize");
const {sequelize}=require('../db');



// Define Appointment model
const Appointment = sequelize.define("Appointment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,     // Specify the primary key here
        autoIncrement: true,  // Auto-increment for unique id
      },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


// Sync Bus table
const syncAppointmentTable = async () => {
    try {
      await Appointment.sync({ alter: true });  // Use `force: false` to avoid dropping the table
      console.log('Appointment table synced successfully.');
    } catch (error) {
      console.error('Error syncing Appointment table:', error);
    }
  };
  
  syncAppointmentTable();

module.exports = { Appointment, sequelize };
