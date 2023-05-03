const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  age: String,
  sex: String,
  mobile: String,
  govtIdType: String,
  govtId: String,
  guardianNameLabel: String,
  guardianName: String,
  guardianEmail: String,
  emergencyContactPhone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  occupation: String,
  region: String,
  maritalStatus: String,
  bloodGroup: String,
  nationality: String,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
