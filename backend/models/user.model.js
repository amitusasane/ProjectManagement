const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100
  },
  lastName: {
    type: String,
    required: true,
    max: 100
  },
  empId: {
    type: Number,
    required: true,
    max: 100
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
  //tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});
module.exports = mongoose.model('Users', Users);
