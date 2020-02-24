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

module.exports = router;
