const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    department: String,
    salary: Number,
    profileImage: String
}, { timestamps: true }); //

module.exports = mongoose.model('Employee', EmployeeSchema);