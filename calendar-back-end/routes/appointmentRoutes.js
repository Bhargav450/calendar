const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes for appointment-related operations
router.get('/', appointmentController.getAllAppointments);           // Get all appointments
router.post('/', appointmentController.createAppointment);          // Create a new appointment
router.put('/:id', appointmentController.updateAppointment);        // Update an appointment
router.delete('/:id', appointmentController.deleteAppointment);     // Delete an appointment

module.exports = router;
