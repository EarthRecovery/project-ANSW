const bcrypt = require('bcrypt');
const config = require('../config');

const registerService = {
    async check(user){ // username, email, password_hash, permission, points, level, is_disabled, avatar_url
        //username
        if(!user.username || user.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        //email
        if(!user.email){
            throw new Error('null email');
        }
        //email 验证
        if(!user.email || !isValidEmail(user.email)) {
            throw new Error('Invalid email address');
        }
        //password 验证
        if(!user.password_hash || !isPasswordComplex(user.password_hash)) {
            throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
        }else{
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
        //permission
        if(!user.permission && (user.permission < 0 || user.permission > 1)) {
            user.permission = 0; // 默认权限为普通用户
        }
        //points
        if(!user.points || user.points != 0) {
            user.points = 0; // 默认积分为0
        }
        //level
        if(!user.level || user.level != 0) {
            user.level = 0; // 默认等级为0
        }
        if(!user.permission) {
            user.permission = 0; // 默认权限为普通用户
        }
        //is_disabled
        if(!user.is_disabled) {
            user.is_disabled = false; // 默认未禁用
        }
        if(!user.avatar_url) {
            user.avatar_url = ''; // 默认头像URL
        }
        return user;
    }
}

function isPasswordComplex(password) {
  if (!password) return false; // 不能为空

  // 至少8个字符，包含大写、小写、数字和特殊符号
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

module.exports = registerService;