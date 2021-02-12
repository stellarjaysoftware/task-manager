const express = require('express');
const router = new express.Router();
const { Task } = require('../models/Task');
const { auth } = require('../middleware/auth');

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.error(error);
    if (error._message.toLowerCase().includes('validation')) {
      return res.status(400).send({Error: error.toString()});
    }
    res.status(500).send();
  }
});

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt&dir=asc
router.get("/tasks", auth, async (req, res) => {
  let query = {
    owner: req.user._id
  }
  const sort = {};
  if (req.query.completed) {
    query = { ...query, completed: req.query.completed === "true" }
  }
  if (req.query.sortBy && req.query.dir) {
    sort[req.query.sortBy] = req.query.dir === 'asc' ? 1 : -1;
  }

  console.warn('query',query);

  try {
    const tasks = await Task.find(query, null,{
      limit: parseInt(req.query.limit),
      skip:  parseInt(req.query.skip),
      sort
    });
    if (!tasks) {
      return res.status(404).send();
    }
    // const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    if (error.toString().toLowerCase().includes('cast to')) {
      return res.status(400).send({ "Error": error.toString() });
    }
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    // 400: validation error
    // 404: no user found
    console.log(error);
    const message = error.toString().toLowerCase();
    if (message.includes('validation') || message.includes('cast to')) {
      return res.status(400).send({ "Error": error.toString() });
    }
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({_id, owner: req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    if (error.toString().toLowerCase().includes('cast to')) {
      return res.status(400).send({ "Error": error.toString() });
    }
    res.status(500).send(error);
  }
});

module.exports = router;
