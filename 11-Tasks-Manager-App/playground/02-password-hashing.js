const bcrypt = require('bcryptjs');

const myFunc = async () => {
    const password = 'adi123';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('adi123', hashedPassword);
    console.log(isMatch);
};

myFunc();
