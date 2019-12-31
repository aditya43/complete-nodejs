const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
