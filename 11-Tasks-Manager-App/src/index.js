const express = require('express');

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     res.status(503).send('Site is in maintainance mode.');
//     next();
// });

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => console.log(`Server is running on ${port}`));
