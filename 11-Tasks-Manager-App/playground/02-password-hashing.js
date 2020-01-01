const bcrypt = require('bcryptjs');

const bcryptPasswordEncrypt = async password => {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
};

const bcryptPasswordVerify = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

// const password = 'adi123';
// const hashedPassword = bcryptPasswordEncrypt(password);
// const verifyPassword = bcryptPasswordVerify(password, hashedPassword);
// console.log('Password: ', password)
// console.log('Hashed: ', hashedPassword)
// console.log('Verify: ', verifyPassword)

module.exports = { bcryptPasswordEncrypt, bcryptPasswordVerify };
