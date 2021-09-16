const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

UserSchema.post('save', function() {
  console.log('User Save Sucess');
});

module.exports = mongoose.model('user', UserSchema);