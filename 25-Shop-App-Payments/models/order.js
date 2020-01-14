const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: [{
        product: {
            // type: mongoose.Schema.Types.ObjectId,
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            trim: true
        }
    }],
    user: {
        email: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     }
// });

// module.exports = Order;
