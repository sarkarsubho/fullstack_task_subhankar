import express from 'express';
import { getAllTasks } from '../services/redisService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

export default router;