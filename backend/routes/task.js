const express = require('express');

let Task = require('../models/task.model');
const taskRoutes = express.Router();

// ADD TASK ROUTES
taskRoutes.route('/add').post(function(req, res) {
  let task = new Task(req.body);
  task
    .save()
    .then(task => {
      res.status(200).json({ message: 'Task added successfully' });
    })
    .catch(err => {
      res.status(400).send('Adding new task failed');
    });
});

// fetch all tasks

taskRoutes.route('/').get(function(req, res) {
  Task.find(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.json(resp);
    }
  });
});

//fetch task by project Id
taskRoutes.route('/project/:id').get(function(req, res) {
  Task.find({ project: req.params.id })
    .populate('parentTask')
    .exec(function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp);
      }
    });
});

taskRoutes.route('/complete/:id').put(function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    if (!task) res.status(404).send('Project data is not found');
    else task.status = 'Completed';

    task
      .save()
      .then(task => {
        res.json({ message: 'Task Completed successfully' });
      })
      .catch(err => {
        res.status(400).send('Task completion is not possible');
      });
  });
});

module.exports = taskRoutes;
