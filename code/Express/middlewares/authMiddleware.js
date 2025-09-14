const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // 取出 Bearer 后面的 token
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Malformed token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        var email = decoded.email;
        const user = await userService.findUserByEmail(email);
        req.user = user; 
        next();
    });
}

module.exports = authMiddleware;
