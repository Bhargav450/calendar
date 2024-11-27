const { QueryTypes } = require('sequelize'); 
const Appointment = require('../models/appointment');
const {sequelize}=require('../db');

// Controller for handling all appointment-related operations

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await sequelize.query(
      'SELECT * FROM "Appointments"', 
      { type: QueryTypes.SELECT }
    );
    console.log('GET /api/appointments hit:',appointments);
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send("Error fetching appointments");
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { title, start_time, end_time } = req.body;
  const currentTime = new Date(); 
  const startTimeDate = new Date(start_time);
  const endTimeDate = new Date(end_time);

  try {
  // Insert data into 'Appointments' table
  const [result] = await sequelize.query(
      'INSERT INTO "Appointments" (title, start_time, end_time, "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?) RETURNING *',
      {
          replacements: [title, startTimeDate, endTimeDate, currentTime, currentTime],
          type: sequelize.QueryTypes.INSERT
      }
  );

  if (result && result[0]) {
      // Send the new appointment as part of the response
      res.status(201).json({ appointment: result[0] });
  } else {
      res.status(500).send("Error creating appointment");
  }
} catch (error) {
  console.error("Error creating appointment:", error);
  res.status(500).send("Error creating appointment");
}
};

// Update an existing appointment
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time } = req.body; // Destructure the start_time and end_time from the request body
 

  // Convert the start_time and end_time to Date objects using moment.js to ensure proper formatting
  const startTimeDate = new Date(start_time);
  const endTimeDate = new Date(end_time);

  try {
    // Construct the raw SQL query to update the appointment
    const updateQuery = `
      UPDATE "Appointments"
      SET "start_time" = ?, "end_time" = ?
      WHERE "id" = ?
      RETURNING *
    `;

    // Execute the update query with the provided parameters
    const [result] = await sequelize.query(updateQuery, {
      replacements: [startTimeDate, endTimeDate, id],
      type: QueryTypes.UPDATE,
      logging: console.log, // Log the query for debugging
    });

    // Check if the appointment was updated (if result is 0, no rows were affected)
    if (result.length === 0) {
      return res.status(404).send("Appointment not found");
    }

    // Send the updated appointment as the response
    res.json({ appointment: result[0] });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).send("Error updating appointment");
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Execute raw SQL to delete the appointment
    const result = await sequelize.query(
      'DELETE FROM "Appointments" WHERE id = :id',
      {
        replacements: { id },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    // Check if any rows were affected (appointment existed and was deleted)
    if (result[1] === 0) {
      return res.status(404).send('Appointment not found');
    }

    res.send('Appointment deleted');
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send("Error deleting appointment");
  }
};
