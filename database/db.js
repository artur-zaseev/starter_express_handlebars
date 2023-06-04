import {db} from '../app.js';

export const getAllTasks = async () => {
  return await db.all('SELECT * FROM tasks');
};

export const getTaskByID = async id => {
  return await db.get('SELECT * FROM tasks WHERE id = ?', id);
};

export const addTask = async text => {
  return await db.run('INSERT INTO tasks (title) VALUES (?)', text);
};
