const userService = require('../services/userService');
const registerService = require('../services/registerService');

const registerController = {
    async register(req, res){
        try {
            var user = await registerService.check(req.body);
            console.log('User info:', user);
            const id = await userService.createUser(user);
            res.status(201).json({ message: 'User created', id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = registerController;