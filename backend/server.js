const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Needs to configure .env variables

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
//-----------------------------------------------------------------------------
// User routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
//-----------------------------------------------------------------------------
// Project routes
const projectRoutes = require('./routes/project');
app.use('/project', projectRoutes);
//--------------------------------------------------------------------------
//Task routes
const taskRoutes = require('./routes/task');
app.use('/task', taskRoutes);
//--------------------------------------------------------------------------
//Parent Task routes
const parentTaskRoutes = require('./routes/parentTask');
app.use('/parentTask', parentTaskRoutes);
//--------------------------------------------------------------------------
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});
