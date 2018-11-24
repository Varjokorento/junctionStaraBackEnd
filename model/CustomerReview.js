const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  question1: {
    type: Number,
    required: true,
  },
  question2: {
      type: Number,
      required: true
  },
  question3: {
      type: Number,
      required: true
  },
  question4: {
      type: String
  }
}, {collection: 'customers'});

const model = mongoose.model('customer', CustomerSchema);

module.exports = model;
