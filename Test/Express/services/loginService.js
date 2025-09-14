const userService = require('./userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginService = {
    async login(email, password){ // return  true or false
        if(await checkPassword(email, password)){
            const token = jwt.sign(
                    { email }, // payload，可放用户ID或角色
                    process.env.JWT_SECRET, // 秘钥
                    { expiresIn: '2h' } // token 有效期，比如2小时
                );
            return token; 
        }else{
            return false;
        }
    }
}

async function checkPassword(email, password){
    const user = await userService.findUserByEmail(email);
    if (!user) return false;

    return await bcrypt.compare(password, user.password_hash);
}

module.exports = loginService;