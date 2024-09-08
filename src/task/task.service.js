import * as taskManager from './task.manager.js';

export const createTask = async (taskData) => {
  return taskManager.createTask(taskData);
};

export const getAllTasks = async (filter) => {
  const tasks = await taskManager.getAllTasks(filter);
  const count = filter.propertyId
    ? tasks.length
    : await taskManager.countTasks(filter);

  return {
    items: tasks,
    count: count,
  };
};

export const getTaskById = async (taskId) => {
  return taskManager.getTaskById(taskId);
};

export const updateTask = async (taskId, taskData) => {
  return taskManager.updateTask(taskId,taskData)
};

export const getTasksByFilter = async (filterOptions) => {
  const tasks = await taskManager.report(filterOptions);
return tasks
}