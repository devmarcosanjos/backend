const express = require("express");

const TaskModel = require("../models/task.model");
const TaskController = require("../controller/task.controllers");

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).get();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).post();
});

router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).delete();
});

module.exports = router;
