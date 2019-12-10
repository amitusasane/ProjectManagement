const express = require('express');

let User = require('../models/user.model');
const userRoutes = express.Router();

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

module.exports = userRoutes;
