const userService = require('../services/userService');

const userController = {
  async create(req, res) {
    try {
      const id = await userService.createUser(req.body);
      res.status(201).json({ message: 'User created', id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const affectedRows = await userService.updateUser(req.params.id, req.body);
      if (affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const affectedRows = await userService.deleteUser(req.params.id);
      if (affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;
