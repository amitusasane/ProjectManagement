const express = require('express');

let Project = require('../models/project.model');
const projectRoutes = express.Router();

//1 . Fetch All project
projectRoutes.route('/').get(function(req, res) {
  Project.find()
    .populate('task')
    .exec(function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp);
      }
    });
});

//2. Add new project
projectRoutes.route('/add').post(function(req, res) {
  let project = new Project(req.body);
  project
    .save()
    .then(project => {
      res.status(200).json({ message: 'Project added successfully' });
    })
    .catch(err => {
      res.status(400).send('Adding new project failed');
    });
});

//3. Update project by Id
projectRoutes.route('/update/:id').put(function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (!project) res.status(404).send('Project data is not found');
    else {
      project.projectName = req.body.projectName;
      project.dateRequired = req.body.dateRequired;
      project.startDate = req.body.startDate;
      project.endDate = req.body.endDate;
      project.priority = req.body.priority;
      project.manager = req.body.manager;

      project
        .save()
        .then(project => {
          res.json({ message: 'Project updated successfully' });
        })
        .catch(err => {
          res.status(400).send('Project Update not possible');
        });
    }
  });
});

//4. Delete project by Id
projectRoutes.route('/delete/:id').get(function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (!project) res.status(404).send('Project data is not found');
    else
      project
        .remove({ _id: req.params.id })
        .then(project => {
          res.json({ message: 'Project deleted successfully' });
        })
        .catch(err => {
          res.status(400).send('Project deletion not possible');
        });
  });
});

//5 Get data for Edit Mode
projectRoutes.route('/:id').get(function(req, res) {
  Project.findById(req.params.id)
    .populate('manager')
    .exec(function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp);
      }
    });
});

module.exports = projectRoutes;
