const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 获取用户列表
router.get('/', userController.list);

// 根据id获取用户
router.get('/:id', userController.getById);

// 创建用户
router.post('/', userController.create);

// 更新用户
router.put('/:id', userController.update);

// 删除用户
router.delete('/:id', userController.delete);

module.exports = router;
