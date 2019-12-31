const jwt = require('jsonwebtoken');

const generate = () => {
    const token = jwt.sign({ _id: 'user-id-1' }, process.env.JWT_SECRET, { expiresIn: '1 seconds' });

    return token;
};

const verify = token => {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    console.log(data);
};

const token = generate();
verify(token);
