const express = require('express');
const taskController = require('../controllers/task');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', authMiddleware, taskController.add);

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:asc
// GET /tasks?sortBy=createdAt:desc
// GET /tasks?sortBy=completed:asc
// GET /tasks?sortBy=completed:desc
router.get('/tasks', authMiddleware, taskController.get);

router.get('/tasks/:id', authMiddleware, taskController.find);
router.patch('/tasks/:id', authMiddleware, taskController.update);
router.delete('/tasks/:id', authMiddleware, taskController.delete);

module.exports = router;
