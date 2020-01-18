const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');
const models = require('../models/index');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await models.post.findAll();

        if (!posts.length || posts.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Posts not found'
            });
        }

        res.status(200).json({
            code: 200,
            status: 'success',
            posts
        });
    } catch (error) {
        next(error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await models.post.findAll({
            where: { id: req.params.postId }
        });

        if (!post.length || post.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            code: 200,
            status: 'success',
            post: post[0]
        });
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array();

            res.status(422).json({
                code: 422,
                status: 'failed',
                message: 'Failed to validate',
                errors: errors.array()
            });

            throw error;
        }

        const title = req.body.title;
        const content = req.body.content;
        const imageUrl = !req.file ? 'images/no-product-image.jpg' : req.file.path;

        const post = await models.post.create({
            title,
            content,
            imageUrl: imageUrl,
            creator: 1
        });

        res.status(201).json({
            code: 201,
            status: 'Success',
            post
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array();

            res.status(422).json({
                code: 422,
                status: 'failed',
                message: 'Failed to validate',
                errors: errors.array()
            });

            throw error;
        }

        const postId = req.params.postId;
        const title = req.body.title;
        const content = req.body.content;

        // When image is not updated, we will receive it on body as text.
        let imageUrl = req.body.image;

        // When image is updated, we will receive it on request.
        if (req.file) {
            imageUrl = req.file.path;
        }

        // Even if at this point we have no image then set it to default no-image.
        if (!imageUrl || typeof imageUrl === 'undefined' || imageUrl === 'undefined') {
            imageUrl = 'images/no-product-image.jpg';
        }

        const post = await models.post.findAll({
            where: { id: postId }
        });

        if (!post.length || post.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Post not found'
            });
        }

        post[0].title = title;
        post[0].content = content;
        post[0].imageUrl = imageUrl;

        const updatedPost = await post[0].save();

        if (imageUrl !== updatedPost.imageUrl) {
            clearImage(updatedPost.imageUrl);
        }

        res.status(200).json({
            code: 200,
            status: 'Success',
            post: updatedPost
        });
    } catch (error) {
        next(error);
    }
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};
