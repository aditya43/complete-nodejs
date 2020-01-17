const { validationResult } = require('express-validator');
const models = require('../models/index');

exports.getPosts = async (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: new Date().toISOString(),
                title: 'First Post',
                content: 'First post content',
                imageUrl: 'images/macbook.png',
                creator: {
                    name: 'Aditya Hajare'
                },
                createdAt: new Date()
            }
        ]
    });
};

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Failed to validate',
            errors: errors.array()
        });
    }

    const title = req.body.title;
    const content = req.body.content;

    try {
        const post = await models.post.create({
            title,
            content,
            imageUrl: 'images/macbook.png',
            creator: 1
        });

        res.status(201).json({
            code: 201,
            message: 'Success',
            post
        });
    } catch (error) {
        return error;
    }
};
