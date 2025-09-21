const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserController {
  async register(req, res) {
    try {
      console.log('Registration request received:', req.body);
      const { name, email, password, role } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed, creating user...');
      
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });
      console.log('User created in database:', user.toJSON());

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
      console.log('JWT token generated');

      // Verify the user was actually saved by fetching it
      const savedUser = await User.findByPk(user.id);
      console.log('Verified user in database:', savedUser ? savedUser.toJSON() : 'User not found');

      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    res.json(req.user);
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();