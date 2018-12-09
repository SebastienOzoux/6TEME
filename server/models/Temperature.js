const mongoose = require('mongoose');
const TemperatureSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  temperature: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
});
module.exports = mongoose.model('Temperature', TemperatureSchema);
