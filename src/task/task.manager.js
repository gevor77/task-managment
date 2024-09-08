import Task from './task.models.js';

const timestampToMilliseconds = (timestamp) => {
  return new Date(timestamp).getTime();
}

const calculateDuration = (startDate, endDate) => {
  const start = timestampToMilliseconds(startDate);
  const end = timestampToMilliseconds(endDate);
  return Math.abs(end - start);
}
const calculateAverageTime = (pairs) => {
  const totalMilliseconds = pairs.reduce((sum, pair) => {
    return sum + calculateDuration(pair.startDate, pair.endDate);
  }, 0);
  return totalMilliseconds / pairs.length;
}

const millisecondsToDaysAndHours = (milliseconds) => {
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return { days, hours };
}

export const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getAllTasks = async (filter) => {
  const query = await getTasksByFilter(filter);  
  return Task.find(query);
};

export const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

export const updateTask = async (taskId, taskData) => {
  taskData.endDate = Date.now();
  return await Task.findByIdAndUpdate(taskId, {...taskData,completed: true});
};

export const countTasks = async (filter) => {
  const query = getTasksByFilter(filter);  
  return Task.countDocuments(query);
};

export const report = async (filter) => {
  const query = await getTasksByFilter(filter);
  const taskCount = await Task.countDocuments(query);
  const tasks = await Task.find(query);
  const averageTime =tasks.map(task=>({
    startDate:task.startDate,
    endDate:task.endDate
  }))
 const averageMilliseconds = calculateAverageTime(averageTime);

const { days, hours } = millisecondsToDaysAndHours(averageMilliseconds);
 return {
  'Tasks completed':averageTime.length,
  'Average Time':`Average Time: ${days} day(s) and ${hours} hour(s)`
 }
}

export const getTasksByFilter = async ({ completed, assignedMember }) => {
  const query = {};
  
  if (completed) {
    query.completed = completed;
  }

  if (assignedMember) {
    query.assignedMember = assignedMember;
  }  

  return query;
};