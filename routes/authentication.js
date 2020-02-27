'use strict';
const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const uploader = require('./../middleware/uploader');
const nodemailer = require('nodemailer');
const router = new Router();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const passport = require('passport');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

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
        transporter.sendMail({
          from: `The time of your life team  <${EMAIL}>`,
          to: user.email,
          subject: 'Welcome to the time of your life!',
          html: `Hello <strong>${user.username}</strong>! Thanks for joining! Now is the time to discover new experiences, create your own and share them with the world. Have Fun! <br> - The TYL Team, Raquel & André `
        });
        req.session.user = user._id;
        res.redirect('/path/searchpaths');
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
        transporter.sendMail({
          from: `The time of your life team  <${EMAIL}>`,
          to: user.email,
          subject: 'Welcome to the time of your life!',
          html: `Hello <strong>${user.username}</strong>! Thanks for joining! Now is the time to discover new experiences, create your own and share them with the world. Have Fun! <br> - The TYL Team, Raquel & André `
        });
        req.session.user = user._id;
        res.redirect('/path/searchpaths');
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
