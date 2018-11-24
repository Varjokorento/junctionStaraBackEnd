const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrafficSchema = new Schema({
  congestion: {
    type: Number,
    required: true,
  },
  throughput: {
      type: Number,
      required: true
  }
}, {collection: 'traffics'});

const model = mongoose.model('traffic', TrafficSchema);

module.exports = model;
