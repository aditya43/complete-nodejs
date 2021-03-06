const { clearImage } = require('../utils/fileUtils');

const jwt = require('jsonwebtoken');
const validator = require('validator');
const models = require('../models/index');

module.exports = {
    createUser: async function (args, req) {
        const { email, name, password } = args.userInput;
        const errors = [];

        if (!validator.isEmail(email)) {
            errors.push({ message: 'Invalid Email-Address' });
        }

        if (validator.isEmpty(password) || !validator.isLength(password, { min: 3 })) {
            errors.push({ message: 'Password too short' });
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input data');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const users = await models.user.findAll({ where: { email } });

        if (users.length && users.length > 0) {
            throw new Error('User already exists');
        }

        const user = await models.user.create({
            email,
            name,
            password
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    },

    login: async function (args, req) {
        const { email, password } = args;

        const user = await models.user.findByCredentials(email, password);

        if (!user) {
            const error = new Error('User not found');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            userId: user.id
        };
    },

    createPost: async function (args, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            throw error;
        }

        const { title, content, imageUrl } = args.postInput;
        const errors = [];

        if (validator.isEmpty(title) || !validator.isLength(title, { min: 3 })) {
            errors.push({ message: 'Title is invalid' });
        }

        if (validator.isEmpty(content) || !validator.isLength(content, { min: 3 })) {
            errors.push({ message: 'Content is invalid' });
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input data');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const users = await models.user.findAll({ where: { id: req.userId } });

        if (!users.length || users.length < 1) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }

        const newPost = await models.post.create({
            title,
            content,
            imageUrl: imageUrl || 'images/no-product-image.jpg',
            creator: req.userId
        });

        const posts = await models.post.findAll({ where: { id: newPost.id } });

        posts[0].creator = posts[0].user;
        delete posts[0].user;

        return {
            id: posts[0].id,
            title: posts[0].title,
            content: posts[0].content,
            imageUrl: posts[0].imageUrl,
            creator: posts[0].creator,
            createdAt: posts[0].createdAt.toISOString(),
            updatedAt: posts[0].updatedAt.toISOString()
        };
    },

    posts: async function ({ page }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            // throw error;
        }

        const currentPage = page || 1;
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

        return {
            posts: posts.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    creator: post.user,
                    createdAt: post.createdAt.toISOString(),
                    updatedAt: post.updatedAt.toISOString()
                };
            }),
            totalPosts: totalItems
        };
    },

    post: async function ({ id }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            throw error;
        }

        const posts = await models.post.findAll({
            where: { id }
        });

        if (!posts.length || posts.length < 1) {
            const error = new Error('Post not found');
            error.code = 404;
            throw error;
        }

        posts[0].creator = posts[0].user;
        delete posts[0].user;

        return {
            id: posts[0].id,
            title: posts[0].title,
            content: posts[0].content,
            imageUrl: posts[0].imageUrl,
            creator: posts[0].creator,
            createdAt: posts[0].createdAt.toISOString(),
            updatedAt: posts[0].updatedAt.toISOString()
        };
    },

    updatePost: async function ({ id, postInput }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            throw error;
        }

        const errors = [];

        if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, { min: 3 })) {
            errors.push({ message: 'Title is invalid' });
        }

        if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 3 })) {
            errors.push({ message: 'Content is invalid' });
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input data');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const posts = await models.post.findAll({
            where: {
                id,
                creator: req.userId
            }
        });

        if (!posts.length || posts.length < 1) {
            const error = new Error('Post not found');
            error.code = 404;
            throw error;
        }

        posts[0].title = postInput.title;
        posts[0].content = postInput.content;

        if (typeof postInput.imageUrl != 'undefined') {
            posts[0].imageUrl = postInput.imageUrl;
        }

        const updatedPost = await posts[0].save();

        updatedPost.creator = updatedPost.user;
        delete updatedPost.user;

        return {
            id: updatedPost.id,
            title: updatedPost.title,
            content: updatedPost.content,
            imageUrl: updatedPost.imageUrl,
            creator: updatedPost.creator,
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        };
    },

    deletePost: async function ({ id }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            throw error;
        }

        const posts = await models.post.findAll({
            where: {
                id,
                creator: req.userId
            }
        });

        if (!posts.length || posts.length < 1) {
            const error = new Error('Post not found');
            error.code = 404;
            throw error;
        }

        clearImage(posts[0].imageUrl);
        await posts[0].destroy();

        return true;
    },

    user: async function (args, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            // throw error;
        }

        const users = await models.user.findAll({ where: { id: req.userId } });

        if (!users.length || users.length < 1) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        console.log(users);
        return {
            id: users[0].id,
            name: users[0].name,
            email: users[0].email,
            status: users[0].status
        };
    },

    updateStatus: async function ({ status }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated');
            error.code = 401;
            throw error;
        }

        const users = await models.user.findAll({ where: { id: req.userId } });

        if (!users.length || users.length < 1) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }

        users[0].status = status;
        await users[0].save();

        return {
            id: users[0].id,
            name: users[0].name,
            email: users[0].email,
            status: users[0].status
        };
    }
};
