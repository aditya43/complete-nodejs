const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                trim: true
            }
        }]
    }
});

userSchema.methods.addToCart = async function (product) {
    try {
        let newQantity;
        let cartProductIndex;

        if (this.cart.items.length > 1) {
            cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() == product._id.toString());
        }

        newQantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQantity;
        } else {
            updatedCartItems.push({
                productId: product._id,
                quantity: newQantity
            });
        }

        this.cart = { items: updatedCartItems };

        const res = await this.save();

        return res;
    } catch (e) {
        console.log('ERROR: ', e);
        return false;
    }
};

userSchema.methods.removeFromCart = async function (productId) {
    try {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        this.cart.items = updatedCartItems;
        const res = await this.save();
        return res;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);

// const mongo = require('../util/database');
// const { ObjectId } = require('mongodb');

// class User {
//     constructor (name, email, cart, id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart; // {items: []}
//         this._id = id;
//     }

//     async addToCart (product) {
//         try {
//             let newQantity;
//             let cartProductIndex;

//             const db = await mongo.getInstance();
//             if (this.cart.items.length > 1) {
//                 cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() == product._id.toString());
//             }

//             newQantity = 1;
//             const updatedCartItems = [...this.cart.items];

//             if (cartProductIndex >= 0) {
//                 newQantity = this.cart.items[cartProductIndex].quantity + 1;
//                 updatedCartItems[cartProductIndex].quantity = newQantity;
//             } else {
//                 updatedCartItems.push({ productId: ObjectId(product._id), quantity: newQantity });
//             }

//             const updatedCart = { items: updatedCartItems };

//             const res = await db.collection('users').updateOne(
//                 { _id: ObjectId(this._id) },
//                 { $set: { cart: updatedCart } }
//             );

//             return res;
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     async getCart () {
//         try {
//             const db = await mongo.getInstance();
//             const productIds = this.cart.items.map(item => {
//                 return item.productId;
//             });
//             const productsArr = await db.collection('products').find({ _id: { $in: productIds } }).toArray();

//             return productsArr.map(product => {
//                 return {
//                     ...product,
//                     quantity: this.cart.items.find(item => {
//                         return item.productId.toString() === product._id.toString();
//                     }).quantity
//                 };
//             });
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     async deleteItemFromCart (productId) {
//         try {
//             const updatedCartItems = this.cart.items.filter(item => {
//                 return item.productId.toString() !== productId.toString();
//             });

//             const db = await mongo.getInstance();
//             await db.collection('users').updateOne(
//                 { _id: ObjectId(this._id) },
//                 { $set: { cart: { items: updatedCartItems } } }
//             );
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     async addOrder () {
//         try {
//             const db = await mongo.getInstance();
//             const products = await this.getCart();
//             const order = {
//                 items: products,
//                 user: {
//                     _id: ObjectId(this._id),
//                     name: this.name
//                 }
//             };
//             await db.collection('orders').insertOne(order);
//             this.cart = { items: [] };
//             await db.collection('users').updateOne(
//                 { _id: ObjectId(this._id) },
//                 { $set: { cart: { items: [] } } }
//             );
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     async getOrders () {
//         try {
//             const db = await mongo.getInstance();
//             const orders = await db.collection('orders').find({ 'user._id': ObjectId(this._id) }).toArray();

//             return orders;
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     async save () {
//         try {
//             const db = await mongo.getInstance();
//             await db.collection('users').insertOne(this);
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }

//     static async findById (userId) {
//         try {
//             const db = await mongo.getInstance();
//             const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
//             return user;
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }
// }

// module.exports = User;
// // const Sequelize = require('sequelize');

// // const sequelize = require('../util/database');

// // const User = sequelize.define('user', {
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull: false,
// //         primaryKey: true
// //     },
// //     name: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     email: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// // module.exports = User;
