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
        defaultScope: {
            attributes: { exclude: ['password'] }
        }
    });

    user.associate = function (models) {
        user.hasMany(models.post, {
            sourceKey: 'id',
            foreignKey: 'creator'
        });
    };

    user.findByCredentials = async function (email, password) {
        const users = await this.findAll({ where: { email } });

        if (!users.length || users.length < 1) {
            return false;
        }

        const isPasswordMatch = await bcrypt.compare(password, users[0].password);

        if (!isPasswordMatch) {
            return false;
        }

        return users[0];
    };
    return user;
};
