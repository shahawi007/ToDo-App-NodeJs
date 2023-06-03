const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks, amount: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      Task: newTask,
    },
  });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id :${req.params.id}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id :${req.params.id}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ task });
  if (!task) {
    return next(createCustomError(`No task with id :${req.params.id}`, 404));
  }
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
