require('../db/mongoose'); // Database connection

const Task = require('../models/task');

exports.add = async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.find = async (req, res) => {
    try {
        const _id = req.params.id;

        const task = await Task.findById(_id);

        if (!task) {
            res.status(404).send({});
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
        const _id = req.params.id;
        const task = await Task.findById(_id);

        parameters.forEach(param => {
            task[param] = req.body[param];
        });

        await task.save();

        if (!task) {
            res.status(404).send({ error: 'Task not found!' });
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            res.status(400).send({ error: 'Task not found!' });
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};
