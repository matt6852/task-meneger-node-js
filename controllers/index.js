const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch ({ errors }) {
    res.status(500).json(errors);
  }
};
const addNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch ({ errors }) {
    res.status(500).json({ errors });
  }
};
const getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res.status(404).json({ msg: "no such task by this Id " + id });
    }
    res.status(200).json(singleTask);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deletedSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    console.log();
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ msg: "no such task by this Id " + id });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updatedSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (!Object.keys(body).length) {
      return res.status(500).json({ msg: "provide name" });
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true, runValidators: true }
    );
    console.log(updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ msg: "no such task by this Id " + id });
    }

    res.status(200).json({ msg: "success", updatedTask });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  deletedSingleTask,
  updatedSingleTask,
};
