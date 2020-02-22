'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  picture: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 200
  }
});

module.exports = mongoose.model('User', schema);
