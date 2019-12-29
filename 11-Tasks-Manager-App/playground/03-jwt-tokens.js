const jwt = require('jsonwebtoken');

const generate = () => {
    const token = jwt.sign({ _id: 'user-id-1' }, 'random-series-of-secret-characters', { expiresIn: '1 seconds' });

    return token;
};

const verify = token => {
    const data = jwt.verify(token, 'random-series-of-secret-characters');

    console.log(data);
};

const token = generate();
verify(token);
