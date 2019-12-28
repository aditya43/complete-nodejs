const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1:27017/task-manager-app';

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
