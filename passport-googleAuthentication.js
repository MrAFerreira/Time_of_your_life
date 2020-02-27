'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://the-time-of-your-life.herokuapp.com/authentication/google/callback'
    },
    (accessToken, refreshToken, profile, callback) => {
      User.findOne({
        googleId: profile.id
      })
        .then(user => {
          if (user) {
            return Promise.resolve(user);
          } else {
            return User.create({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value
              //picture: profile.photos[0].value
            });
          }
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);
