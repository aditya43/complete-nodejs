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
}

module.exports = Product;
