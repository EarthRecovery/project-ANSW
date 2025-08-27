const { register } = require('../controllers/registerController');
const User = require('../models/user');

const userService = {
  createUser(userData) {
    // 这里可以加密码加密、数据校验等
    return User.create(userData);
  },

  getUserById(id) {
    return User.findById(id);
  },

  getUserByUsername(username) {
    return User.findByUsername(username);
  },

  updateUser(id, updateData) {
    return User.updateById(id, updateData);
  },

  deleteUser(id) {
    return User.deleteById(id);
  },

  listUsers() {
    return User.findAll();
  },

  registerUser(userData) {
    return User.create(userData);
  }
};

module.exports = userService;
