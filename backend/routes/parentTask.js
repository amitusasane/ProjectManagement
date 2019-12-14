const express = require('express');
let ParentTask = require('../models/parentTask.model');
const parentTaskRoutes = express.Router();

// fetch all parent tasks
parentTaskRoutes.route('/').get(function(req, res) {
  ParentTask.find(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.json(resp);
    }
  });
});

// update parent task by id

parentTaskRoutes.route('/update/:id').put(function(req, res) {
  ParentTask.findById(req.params.id, function(err, parentTask) {
    if (!parentTask) res.status(404).send('Parent Task data is not found');
    else {
      parentTask.isParentTask = req.body.isParentTask;
      parentTask.taskName = req.body.taskName;
      parentTask
        .save()
        .then(parentTask => {
          res.json({ message: 'Parent Task updated successfully' });
        })
        .catch(err => {
          res.status(400).send('Parent Task Update not possible');
        });
    }
  });
});

// add parent task
parentTaskRoutes.route('/add').post(function(req, res) {
  let parentTask = new ParentTask(req.body);
  parentTask
    .save()
    .then(parentTask => {
      res.status(200).json({ message: 'Parent Task added successfully' });
    })
    .catch(err => {
      res.status(400).send('Adding new Parent task failed');
    });
});
module.exports = parentTaskRoutes;
