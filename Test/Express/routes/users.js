const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');

// 获取用户列表
router.get('/', authMiddleware,userController.list);

// 根据id获取用户
router.get('/:id', authMiddleware,userController.getById);

// 创建用户
router.post('/', authMiddleware,userController.create);

// 更新用户
router.put('/:id', authMiddleware,userController.update);

// 删除用户
router.delete('/:id', authMiddleware,userController.delete);

// 用户注册
router.post('/register', registerController.register);

// 用户登陆
router.post('/login', loginController.login);

module.exports = router;
