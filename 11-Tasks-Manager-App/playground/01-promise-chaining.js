require('../src/db/mongoose');

const User = require('../src/models/user');

User.findByIdAndUpdate('5e06c6da8a0e8f07ae611225', { age: 32 }).then(user => {
    console.log(user);

    return User.countDocuments({ age: 32 });
}).then(count => console.log(count)).catch(err => console.log(err));
