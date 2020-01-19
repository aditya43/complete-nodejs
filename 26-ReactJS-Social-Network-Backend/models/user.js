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
        instanceMethods: {
            findByCredentials: async function (email, password) {
                //
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
