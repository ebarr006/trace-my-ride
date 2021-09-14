const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
  trackingId: { type: String, unique: true, require: true },
  lat: { type: String, require: true },
  lng: { type: String, require: true },
});

CoordinateSchema.post('save', function() {
  console.log('Coordinate Save Sucess');
});

module.exports = mongoose.model('coordinate', CoordinateSchema);