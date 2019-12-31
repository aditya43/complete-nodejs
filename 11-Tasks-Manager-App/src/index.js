const express = require('express');
const bodyParser = require('body-parser');

const checkMaintainanceMode = require('./middleware/checkMaintainanceMode');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(checkMaintainanceMode); // Middleware
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => console.log(`Server is running on ${port}`));
