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
  author: String,
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
  picture: {
    type: String,
    default:
      'https://res.cloudinary.com/duykugih7/image/upload/v1582549333/jan20/profiledefaultimage_pfl2a5.png'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Path', schema);
