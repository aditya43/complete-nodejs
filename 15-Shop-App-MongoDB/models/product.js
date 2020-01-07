const mongo = require('../util/database');
const { ObjectId } = require('mongodb');

class Product {
    constructor (title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = ObjectId(id);
    }

    async save () {
        try {
            const db = await mongo.getInstance();
            if (this._id) {
                // update
                await db.collection('products').updateOne({ _id: this._id }, { $set: this });
            } else {
                // Insert
                await db.collection('products').insertOne(this);
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async fetchAll() {
        try {
            const db = await mongo.getInstance();
            const products = await db.collection('products').find().toArray();
            return products;
        } catch (error) {
            console.log(e);
            return false;
        }
    }

    static async findById(prodId) {
        try {
            const db = await mongo.getInstance();
            const product = await db.collection('products').find({ _id: ObjectId(prodId) }).next();
            return product;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = Product;
