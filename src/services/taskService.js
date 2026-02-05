const repo = require('../repositories/taskRepository');

const STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

exports.getAllTasks = () => repo.findAll();

exports.getTaskById = async (id) => {
  const task = await repo.findById(id);
  if (!task) throw new Error('Task not found');
  return task;
};

exports.createTask = async (data) => {
  if (!data.title || data.title.length < 3 || data.title.length > 100) {
    throw new Error('Title must be 3-100 characters');
  }

  if (data.priority === 'HIGH' && !data.description) {
    throw new Error('HIGH priority task must have description');
  }

  if (!STATUSES.includes(data.status)) {
    throw new Error('Invalid status');
  }

  if (!PRIORITIES.includes(data.priority)) {
    throw new Error('Invalid priority');
  }

  return repo.create(data);
};

exports.nextStatus = async (id) => {
  const task = await repo.findById(id);
  if (!task) throw new Error('Task not found');

  if (task.status === 'DONE') {
    throw new Error('Cannot move DONE task');
  }

  const next =
    task.status === 'TODO' ? 'IN_PROGRESS' : 'DONE';

  await repo.updateStatus(id, next);
  return { ...task, status: next };
};

exports.deleteTask = async (id) => {
  const deleted = await repo.remove(id);
  if (!deleted) throw new Error('Task not found');
};

exports.getStats = () => repo.getStats();
