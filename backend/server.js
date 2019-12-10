const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Needs to configure .env variables

//const userRoutes = express.Router();
//let User = require('./user.model');
//const projectRoutes = express.Router();
//let Project = require('./project.model');

const PORT = 4000;
const uri = process.env.ATLAS_URI;
//mongodb://127.0.0.1:27017/project-management
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB Atlas database connection established successfully');
});

// todoRoutes.route('/:id').get(function(req, res) {
//   let id = req.params.id;
//   Todo.findById(id, function(err, todo) {
//     res.json(todo);
//   });
// });

//-----------------------------------------------------------------------------
// User routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
//--------------------------------------------------------------
// Project routes
const projectRoutes = require('./routes/project');
app.use('/project', projectRoutes);
//--------------------------------------------------------------------------
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});
