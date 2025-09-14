const jwt = require('jsonwebtoken');

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

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded; // 把解码的 payload 挂到 req.user
        next(); // 继续执行下一个中间件/路由
    });
}

module.exports = authMiddleware;
