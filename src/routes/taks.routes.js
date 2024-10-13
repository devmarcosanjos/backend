const express = require("express");

const TaskModel = require("../models/task.model");
const TaskController = require("../controller/task.controllers");

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);

    res.status(200).send(task);
  } catch (error) {
    res.status(404).send("Essa tarefa não foi encontrada");
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];

    const requestedUpdates = Object.keys(req.body);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res.status(500).send("Um ou mais campos não são editaveis.");
      }
    }

    await taskToUpdate.save(taskToUpdate);

    return res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskToDelete = await TaskModel.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).send("Essa tarefa não foi encontrada");
    }

    const deleteTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
