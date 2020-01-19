const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');
const models = require('../models/index');
const io = require('../socket');

exports.test1 = async (req, res, next) => {
    try {
        const user = await models.user.findAll({
            where: { id: 2 },
            include: ['posts']
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.test2 = async (req, res, next) => {
    try {
        const posts = await models.post.findAll({
            // include: ['user']
        });

        posts.filter(post => {
            post.creator = post.user;
            delete post.user;
        });
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 2;
        const totalItems = await models.post.count();

        const posts = await models.post.findAll({
            offset: ((currentPage - 1) * perPage),
            limit: perPage,
            order: [
                ['createdAt', 'DESC']
            ]
            // include: ['user']
        });

        if (!posts.length || posts.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Posts not found'
            });
        }

        posts.filter(post => {
            post.creator = post.user;
            delete post.user;
        });

        res.status(200).json({
            code: 200,
            status: 'success',
            posts,
            totalItems
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

        const users = await models.user.findAll({ where: { id: req.userId } });

        if (!users.length || users.length < 1) {
            throw new Error('User not found.');
        }

        const newPost = await models.post.create({
            title,
            content,
            imageUrl: imageUrl,
            creator: req.userId
        });

        const posts = await models.post.findAll({ where: { id: newPost.id } });

        posts[0].creator = posts[0].user;
        delete posts[0].user;

        io.getIO().emit('posts', {
            action: 'create',
            post: posts[0]
        });

        res.status(201).json({
            code: 201,
            status: 'Success',
            post: posts[0],
            creator: posts[0].creator
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

        const posts = await models.post.findAll({
            where: {
                id: postId,
                creator: req.userId
            }
        });

        if (!posts.length || posts.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Post not found'
            });
        }

        posts[0].title = title;
        posts[0].content = content;
        posts[0].imageUrl = imageUrl;

        const updatedPost = await posts[0].save();

        updatedPost.creator = updatedPost.user;
        delete updatedPost.user;

        io.getIO().emit('posts', {
            action: 'update',
            post: updatedPost
        });

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

exports.deletePost = async (req, res, next) => {
    try {
        const posts = await models.post.findAll({
            where: {
                id: req.params.postId,
                creator: req.userId
            }
        });

        if (!posts.length || posts.length < 1) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Post not found'
            });
        }

        await posts[0].destroy();
        clearImage(posts[0].imageUrl);

        res.status(200).json({
            code: 200,
            status: 'Success',
            message: 'Post deleted'
        });
    } catch (error) {
        next(error);
    }
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};
