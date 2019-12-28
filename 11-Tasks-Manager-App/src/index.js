const express = require('express');

require('./db/mongoose'); // Database connection

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send({});
        }

        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/tasks/:id', async (req, res) => {
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
});

app.listen(port, () => console.log(`Server is running on ${port}`));
