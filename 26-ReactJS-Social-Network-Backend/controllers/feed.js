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
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array();

            res.status(422).json({
                message: 'Failed to validate',
                errors: errors.array()
            });

            throw error;
        }

        const title = req.body.title;
        const content = req.body.content;

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
        next(error);
    }
};

exports.getPost = async (req, res, next) => {

};
