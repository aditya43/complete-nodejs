const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-app';

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!', error);
    }

    const db = client.db(databaseName);

    db.collection('users').deleteOne({
        age: "37"
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
});
