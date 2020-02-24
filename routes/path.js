'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const uploader = require('./../middleware/uploader');

const router = new Router();

router.get('/create', (req, res, next) => {
  res.render('path/create');
});

router.get('/edit', (req, res, next) => {
  res.render('path/edit');
});

module.exports = router;
