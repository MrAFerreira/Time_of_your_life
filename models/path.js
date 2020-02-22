'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  user: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: [String],
    required: true,
    enum: [
      'Gastronomic',
      'Culture',
      'Country',
      'City',
      'Sea',
      'Sport',
      'Romantic',
      'Fun',
      'Party',
      'Wildlife'
    ]
  },
  // Probably we will need to create a model just for markers(map)
  markers: {
    type: String,
    required: true
  },
  timestamps: {
    createdAt: 'creationDate',
    updatedAt: 'updateDate'
  }
});

module.exports = mongoose.model('Path', schema);
