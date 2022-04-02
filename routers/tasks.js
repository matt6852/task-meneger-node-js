const express = require("express");

const router = express.Router();
const {
  getAllTasks,
  addNewTask,
  getSingleTask,
  deletedSingleTask,
  updatedSingleTask,
} = require("../controllers");

router.route("/").get(getAllTasks).post(addNewTask);
router
  .route("/:id")
  .get(getSingleTask)
  .patch(updatedSingleTask)
  .delete(deletedSingleTask);

module.exports = router;
