const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Parent = new Schema({
  parentTask: {
    type: String
  }
});
module.exports = mongoose.model('Parent', Parent);
