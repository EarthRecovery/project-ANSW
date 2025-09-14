const loginService = require("../services/loginService");


const loginController = {
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const token = await loginService.login(email, password);
            if (token) {
                res.json({ message: 'Login successful', token: `Bearer ${token}` });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = loginController;