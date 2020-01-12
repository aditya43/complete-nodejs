const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        dropDups: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    resetToken: {
        type: String,
        required: false,
        trim: true
    },
    resetTokenExpiration: {
        type: Date,
        required: false
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
};

userSchema.methods.clearCart = async function () {
    this.cart = { items: [] };
    await this.save();
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next(); // If we don't call 'next()' code will hang here forever and user won't be saved.
});

module.exports = mongoose.model('User', userSchema);
