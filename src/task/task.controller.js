import express from 'express';
import * as taskService from './task.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/report', async (req, res) => {
  console.log(req.body);
  
  try {
    const { completed, startDate, endDate, assignedMember } = req.query;

    const filterOptions = {
      completed: completed === 'true',
      startDate,
      endDate,
      assignedMember
    };

    const tasks = await taskService.getTasksByFilter(req.query);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { completed, startDate, endDate, assignedMember } = req.query;
    const filterOptions = {
      completed: completed === 'true',
      startDate,
      endDate,
      assignedMember
    };
    const tasks = await taskService.getAllTasks(filterOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default { router };
