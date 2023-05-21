const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Employees = mongoose.model('Employees', employeeSchema);
module.exports = Employees;