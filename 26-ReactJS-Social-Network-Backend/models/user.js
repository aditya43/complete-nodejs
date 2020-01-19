'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            default: 'I am new'
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user, options) => {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        classMethods: {
            findByCredentials: async function (email, password) {
                const users = await this.findAll({ where: { email } });

                if (!users.length || users.length < 1) {
                    throw new Error('User not found');
                }

                const isPasswordMatch = await bcrypt.compare(password, users[0].password);

                if (!isPasswordMatch) {
                    throw new Error('Invalid credentials'); // Password doesn't match
                }

                return users[0];
            }
        }
    });

    user.associate = function (models) {
        user.hasMany(models.post, {
            sourceKey: 'id',
            foreignKey: 'creator'
        });
    };

    return user;
};
