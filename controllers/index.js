const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/acync-wrapper");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find();
  res.status(200).json(allTasks);
});
const addNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const singleTask = await Task.findById(id);
  if (!singleTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
    // return res.status(404).json({ msg: "no such task by this Id " + id });
  }
  res.status(200).json(singleTask);
});
const deletedSingleTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  console.log();
  const deletedTask = await Task.findOneAndDelete({ _id: id });
  if (!deletedTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json(deletedTask);
});
const updatedSingleTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (!Object.keys(body).length) {
    return next(createCustomError(`msg: "provide name" `, 400));
  }
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json({ msg: "success", updatedTask });
});
module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  deletedSingleTask,
  updatedSingleTask,
};
