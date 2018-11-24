const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
      type: String,
      required: true
  },
  url: {
      type: String
  }
}, {collection: 'news'});

const model = mongoose.model('news', NewsSchema);

module.exports = model;
