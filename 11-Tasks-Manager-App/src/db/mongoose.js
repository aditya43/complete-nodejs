const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1:27017/task-manager-app';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const jane = new User({
    name: 'Jane Doe',
    age: 35
});

jane.save()
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
