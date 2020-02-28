'use strict';

const { Router } = require('express');
const router = new Router();
const Path = require('./../models/path');

router.get('/', (req, res, next) => {
  Path.find()
    .limit(3)
    .then(value => {
      res.render('index', { value });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
