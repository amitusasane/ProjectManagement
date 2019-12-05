const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000;

let User = require('./user.model');

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

// todoRoutes.route('/update/:id').post(function(req, res) {
//   Todo.findById(req.params.id, function(err, todo) {
//     if (!todo) res.status(404).send('data is not found');
//     else todo.todo_description = req.body.todo_description;
//     todo.todo_responsible = req.body.todo_responsible;
//     todo.todo_priority = req.body.todo_priority;
//     todo.todo_completed = req.body.todo_completed;

//     todo
//       .save()
//       .then(todo => {
//         res.json('Todo updated!');
//       })
//       .catch(err => {
//         res.status(400).send('Update not possible');
//       });
//   });
// });

//-----------------------------------------------------------------------------
// Add User routes
userRoutes.route('/').get(function(req, res) {
  User.find(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.json(resp);
    }
  });
});

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

app.use('/user', userRoutes);

//--------------------------------------------------------------
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});
