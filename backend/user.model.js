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
  }
});
module.exports = mongoose.model('Users', Users);
