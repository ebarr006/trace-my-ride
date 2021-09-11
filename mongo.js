const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tracedata');

const UserSchema = new mongoose.Schema({
  name: String,
  trackingId: String,
});

UserSchema.post('save', function() {
  console.log('User Save Sucess');
})

UserSchema.query.byTrackingId = function(id) {
  return this.where({ trackingId: id });
}

const CoordinateSchema = new mongoose.Schema({
  trackingId: String,
  lat: String,
  lng: String
});

CoordinateSchema.post('save', function() {
  console.log('Coordinate Save Sucess');
})

User = mongoose.model('User', UserSchema);
Coordinate = mongoose.model('Coordinate', CoordinateSchema);

// User.findOne().byTrackingId('1234').exec((err, user)) => {
//   console.log(user)
// }

module.exports = {
  User,
  Coordinate
}
