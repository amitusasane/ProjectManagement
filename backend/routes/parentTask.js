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
