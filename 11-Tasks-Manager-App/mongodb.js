const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-app';

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!', error);
    }

    const db = client.db(databaseName);

    // db.collection('tasks').updateOne({
    //     _id: new ObjectID('5e05a91616e9b93470c5ab1c')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.log(err)
    // });

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(({result}) => {
        console.log(result)
    }).catch(err => {
        console.log(err);
    });
});
