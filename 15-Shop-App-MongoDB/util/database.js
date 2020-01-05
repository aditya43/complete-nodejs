const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = async () => {
    try {
        await MongoClient.connect(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoConnect;
