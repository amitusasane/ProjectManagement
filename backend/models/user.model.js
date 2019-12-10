const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  empId: {
    type: Number
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
  //tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});
module.exports = mongoose.model('Users', Users);
