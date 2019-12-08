const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
  projectName: {
    type: String
  },
  dateRequired: {
    type: Boolean
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  priority: {
    type: Number
  }
});
module.exports = mongoose.model('Project', Project);
