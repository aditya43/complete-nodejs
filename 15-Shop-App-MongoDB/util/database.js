const { MongoClient } = require('mongodb');

class Mongo {
    constructor () {
        this.client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async main () {
        await this.client.connect();
        console.log('Connected to MongoDB');

        this.db = this.client.db();
    }

    async getInstance () {
        if (!this.db) {
            await this.main();
        }

        return this.db;
    }
}

module.exports = new Mongo();
