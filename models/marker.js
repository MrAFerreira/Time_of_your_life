'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: 'String',
  coordinates: [
    {
      type: Number,
      min: -180,
      max: 180
    }
  ]
});

module.exports = mongoose.model('Marker', schema);
