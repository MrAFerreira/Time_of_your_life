'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
//const uploader = require('./../middleware/uploader');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'jan20',
  allowedFormats: ['jpg', 'png', 'mov', 'mp4']
});

const uploader = multer({ storage });

router.post('/sign-up', uploader.single('picture'), (req, res, next) => {
  const { username, email, password, bio } = req.body;
  const { url } = req.file;
  console.log(req.file);
  console.log(req.body);
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
        res.redirect('/private');
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
