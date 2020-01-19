'use strict';

module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creator: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'Post'
    });

    post.associate = function (models) {
        post.belongsTo(models.user, {
            foreignKey: 'creator'
        });
    };

    return post;
};
