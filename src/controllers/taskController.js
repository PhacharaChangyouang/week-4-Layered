const service = require('../services/taskService');

exports.getTasks = async (req, res, next) => {
  try {
    res.json(await service.getAllTasks());
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    res.json(await service.getTaskById(req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.nextStatus = async (req, res, next) => {
  try {
    res.json(await service.nextStatus(req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await service.deleteTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    res.json(await service.getStats());
  } catch (err) {
    next(err);
  }
};
