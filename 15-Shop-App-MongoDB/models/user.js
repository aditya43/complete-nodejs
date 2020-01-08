const mongo = require('../util/database');
const { ObjectId } = require('mongodb');

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    async addToCart(product) {
        try {
            const db = await mongo.getInstance();
            // const cartProduct = this.cart.items.findIndex(cp => cp._id == product._id);
            const updatedCart = { items: [{ productId: ObjectId(product._id), quantity: 1 }] };
            const res = await db.collection('users').updateOne(
                { _id: ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );

            return res;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async save() {
        try {
            const db = await mongo.getInstance();
            await db.collection('users').insertOne(this);
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    static async findById(userId) {
        try {
            const db = await mongo.getInstance();
            const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
            return user;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = User;
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// module.exports = User;