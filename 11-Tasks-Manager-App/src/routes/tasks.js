const express = require('express');
const taskController = require('../controllers/task');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', authMiddleware, taskController.add);
router.get('/tasks', taskController.get);
router.get('/tasks/:id', taskController.find);
router.patch('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.delete);

module.exports = router;
