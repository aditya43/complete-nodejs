const mongo = require('../util/database');

class Product {
    constructor (title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    async save () {
        try {
            const db = await mongo.getInstance();
            await db.collection('products').insertOne(this);
        } catch (error) {
            console.log(error);
        }
    }

    static async fetchAll() {
        const db = await mongo.getInstance();
        const products = await db.collection('products').find().toArray();
        return products;
    }
}

module.exports = Product;
