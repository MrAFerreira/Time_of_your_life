'use strict';

const mongoose = require('mongoose');
//const Marker = require('./marker');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 700
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
  duration: {
    type: String,
    min: 0,
    max: 24 * 60 * 60 * 1000
  },
  // Probably we will need to create a model just for markers(map)
  /*   location: [
    {
      title: {
        type: String,
        default: 'Point'
      },
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ]
    }
  ], */
  location: [
    {
      title: {
        type: String
      },
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    }
  ],

  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Path', schema);
