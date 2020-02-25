'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path'
  },
  title: 'String',
  lat: {
    type: Number,
    min: -180,
    max: 180
  },
  lng: {
    type: Number,
    min: -180,
    max: 180
  }
});

module.exports = mongoose.model('Marker', schema);
