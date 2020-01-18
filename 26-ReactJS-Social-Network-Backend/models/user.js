'use strict';
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
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'User'
    });

    user.associate = function (models) {
        user.hasMany(models.post, {
            sourceKey: 'id',
            foreignKey: 'creator'
        });
    };

    return user;
};
