import express from 'express';

import {getAllTasks, getTaskByID} from '../database/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await getAllTasks();
  res.render('index', {
    user: req.user,
    tasks: tasks,
  });
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const task = await getTaskByID(id);
  res.render('task', {
    user: req.user,
    task: task,
  });
});

export default router;
