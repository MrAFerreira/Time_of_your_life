'use strict';

const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const Path = require('./../models/path');

const routeGuard = require('./../middleware/route-guard');

router.get('/edit', (req, res, next) => {
  res.render('profile/edit');
});

router.post('/edit', routeGuard(true), (req, res, next) => {
  const userId = req.user._id;
  const { name } = req.body;

  User.findByIdAndUpdate(userId, {
    name
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  let user;

  User.findById(userId)
    .then(document => {
      user = document;
      if (document) {
        return Path.find({ user: userId });
      } else {
        next(new Error('USER_NOT_FOUND'));
      }
    })
    .then(paths => {
      const isOwnProfile = req.user && req.user._id.toString() === user._id.toString();
      res.render('profile/profile', { profile: user, paths, isOwnProfile });
    })
    .catch(error => {
      next(error);
    });
});

//file cloudinary
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  resource_type: 'raw'
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'jan20',
  resource_type: 'raw'
  // allowedFormats: ['jpg', 'png', 'mov', 'mp4']
});

const uploader = multer({ storage });

router.post('/create', uploader.single('picture'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  const { name, description } = req.body;
  const { url } = req.file;
  Place.create({
    name,
    description,
    picture: url
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
