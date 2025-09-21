const { Appointment, User } = require('../models');

class AppointmentController {
  async create(req, res) {
    try {
      const { doctorId, appointmentDate, notes } = req.body;
      const appointment = await Appointment.create({
        patientId: req.user.id,
        doctorId,
        appointmentDate,
        notes
      });

      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          {
            model: User,
            as: 'patient',
            attributes: ['id', 'name', 'email']
          },
          {
            model: User,
            as: 'doctor',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'patient',
            attributes: ['id', 'name', 'email']
          },
          {
            model: User,
            as: 'doctor',
            attributes: ['id', 'name', 'email']
          }
        ]
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { status, notes } = req.body;
      const appointment = await Appointment.findByPk(req.params.id);

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.status = status || appointment.status;
      appointment.notes = notes || appointment.notes;
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancel(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id);

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.status = 'cancelled';
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AppointmentController();