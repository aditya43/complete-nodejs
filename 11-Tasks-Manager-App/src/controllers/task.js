require('../db/mongoose'); // Database connection

const Task = require('../models/task');

exports.add = async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const sortByParts = req.query.sortBy.split(':');
        sort[sortByParts[0]] = sortByParts[1] === 'asc' ? 1 : -1;
    }

    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.find = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            res.status(404).send({ error: 'Task not found!' });
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.update = async (req, res) => {
    const parameters = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isParamAllowedToUpdated = parameters.every(param => allowedUpdates.includes(param))
    ;

    if (!isParamAllowedToUpdated) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        // If we use findByIdAndUpdate(), Mongoose middleware won't be executed.
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!task) {
            res.status(404).send({ error: 'Task not found!' });
        }

        parameters.forEach(param => {
            task[param] = req.body[param];
        });

        await task.save();

        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            res.status(400).send({ error: 'Task not found!' });
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};
