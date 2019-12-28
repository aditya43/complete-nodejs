const express = require('express');

require('./db/mongoose'); // Database connection

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
