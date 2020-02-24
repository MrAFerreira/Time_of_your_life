'use strict';
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const uploader = require('./../middleware/uploader');
const router = new Router();
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});
router.post('/sign-up', uploader.single('picture'), (req, res, next) => {
  const { username, email, password, bio } = req.body;
  if (req.file == null || undefined) {
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
          email,
          bio,
          passwordHash: hash
        });
      })
      .then(user => {
        req.session.user = user._id;
        res.redirect('/');
      })
      .catch(error => {
        next(error);
      });
  } else {
    const { url } = req.file;
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
          email,
          bio,
          picture: url,
          passwordHash: hash
        });
      })
      .then(user => {
        req.session.user = user._id;
        res.redirect('/');
      })
      .catch(error => {
        next(error);
      });
  }
});
router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});
router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});
router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
