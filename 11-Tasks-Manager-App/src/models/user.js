const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate (value) {
            if (value < 0) {
                throw new Error('Age must be positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate (value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain the word 'password'`);
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// methods = 'generateJwtAuthToken' method can be called on an instance of 'User' model.
userSchema.methods.generateJwtAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'random-secret-characters');
    this.tokens = this.tokens.concat({ token }); // Save token to 'User' model.

    await this.save(); // Save 'User' model

    return token;
};

// statics = 'findByCredentials' method will be accessible for calling on 'User' model itself.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid credentials'); // User not found for given email
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid credentials'); // Password doesn't match
    }

    return user;
};

// Hash the plain text password before saving.
userSchema.pre('save', async function (next) { // Using standard function since arrow functions don't bind 'this'.
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next(); // If we don't call 'next()' code will hang here forever and user won't be saved.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
