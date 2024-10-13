const TaskModel = require("../models/task.model");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const task = await TaskModel.find({});
      this.res.status(200).send(task);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;
      const task = await TaskModel.findById(taskId);

      this.res.status(200).send(task);
    } catch (error) {
      this.res.status(404).send("Essa tarefa não foi encontrada");
    }
  }

  async post() {
    try {
      const newTask = new TaskModel(this.req.body);

      await newTask.save();
      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;
      const taskToUpdate = await TaskModel.findById(taskId);

      const allowedUpdates = ["isCompleted"];

      const requestedUpdates = Object.keys(this.req.body);

      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return this.res
            .status(500)
            .send("Um ou mais campos não são editaveis.");
        }
      }

      await taskToUpdate.save(taskToUpdate);

      return this.res.status(200).send();
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;

      const taskToDelete = await TaskModel.findById(taskId);

      if (!taskToDelete) {
        return this.res.status(404).send("Essa tarefa não foi encontrada");
      }

      const deleteTask = await TaskModel.findByIdAndDelete(taskId);

      this.res.status(200).send(deleteTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;
