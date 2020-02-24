'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const Path = require('./../models/path');
const uploader = require('./../middleware/uploader');
const routeGuard = require('./../middleware/route-guard');
const bindUser = require('./../middleware/bind-user-to-view-locals');

const router = new Router();

router.get('/create', (req, res, next) => {
  const google = res.locals.environment.GOOGLE_API_KEY;
  res.render('path/create', { google });
});

router.get('/edit', (req, res, next) => {
  res.render('path/edit');
});

router.post('/create', routeGuard(true), bindUser, (req, res, next) => {
  const userId = req.user._id;
  const { name, location } = req.body;
  Path.create({
    user: userId,
    name,
    location
  })
    .then(element => {
      res.redirect(`/`);
      console.log(element);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
