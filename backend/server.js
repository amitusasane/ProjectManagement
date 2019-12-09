const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
let User = require('./user.model');
const projectRoutes = express.Router();
let Project = require('./project.model');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/project-management', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

// todoRoutes.route('/:id').get(function(req, res) {
//   let id = req.params.id;
//   Todo.findById(id, function(err, todo) {
//     res.json(todo);
//   });
// });

//-----------------------------------------------------------------------------
// User routes
//1 . Fetch All users
userRoutes.route('/').get(function(req, res) {
  User.find(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.json(resp);
    }
  });
});

//2. Add new user
userRoutes.route('/add').post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ message: 'User added successfully' });
    })
    .catch(err => {
      res.status(400).send('Adding new user failed');
    });
});

//3. Update user by Id
userRoutes.route('/update/:id').put(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send('User data is not found');
    else user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.empId = req.body.empId;

    user
      .save()
      .then(user => {
        res.json({ message: 'User updated successfully' });
      })
      .catch(err => {
        res.status(400).send('User Update not possible');
      });
  });
});

//4. Delete user by Id
userRoutes.route('/delete/:id').get(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send('User data is not found');
    else
      user
        .remove({ _id: req.params.id })
        .then(user => {
          res.json({ message: 'User deleted successfully' });
        })
        .catch(err => {
          res.status(400).send('User deletion not possible');
        });
  });
});

app.use('/user', userRoutes);
//--------------------------------------------------------------
// Project routes
//1 . Fetch All project
projectRoutes.route('/').get(function(req, res) {
  Project.find(function(err, resp) {
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
    else project.projectName = req.body.projectName;
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
app.use('/project', projectRoutes);
//--------------------------------------------------------------------------
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});
