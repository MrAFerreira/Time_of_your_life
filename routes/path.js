'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const Path = require('./../models/path');
const Marker = require('./../models/marker');
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

router.get('/searchpaths', (req, res, next) => {
  res.render('path/searchpaths');
});

//Themes routes
router.get('/cultural', (req, res, next) => {
  res.render('holdthemes/cultural');
});

router.get('/city', (req, res, next) => {
  res.render('holdthemes/city');
});

router.get('/country', (req, res, next) => {
  res.render('holdthemes/country');
});

router.get('/party', (req, res, next) => {
  res.render('holdthemes/party');
});

router.get('/romantic', (req, res, next) => {
  res.render('holdthemes/romantic');
});

router.get('/sea', (req, res, next) => {
  res.render('holdthemes/sea');
});

router.get('/sport', (req, res, next) => {
  res.render('holdthemes/sport');
});

router.get('/wildlife', (req, res, next) => {
  res.render('holdthemes/wildlife');
});

router.post('/create', routeGuard(true), bindUser, (req, res, next) => {
  const userId = req.user._id;
<<<<<<< HEAD
  const { name, location } = req.body;
=======
  const { name } = req.body;
  const { title } = req.body;
  const { lat } = req.body;
  const { lng } = req.body;
  console.log(title);
>>>>>>> 20eb776ea90b2b148a12a669e2b5f1a795589d23

  Path.create({
    user: userId,
    name,
    location: {
      title,
      coordinates: [lng, lat]
    }
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
