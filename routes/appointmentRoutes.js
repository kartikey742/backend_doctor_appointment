const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { auth, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create appointment (patients only)
router.post('/', checkRole(['patient']), appointmentController.create);

// Get all appointments (doctors and admins)
router.get('/', checkRole(['doctor', 'admin']), appointmentController.getAll);

// Get specific appointment
router.get('/:id', appointmentController.getById);

// Update appointment (doctors only)
router.put('/:id', checkRole(['doctor']), appointmentController.update);

// Cancel appointment (patients and doctors)
router.patch('/:id/cancel', checkRole(['patient', 'doctor']), appointmentController.cancel);

module.exports = router;