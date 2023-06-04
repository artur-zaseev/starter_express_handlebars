import express from 'express';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Please provide env variables!');
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {scope: ['profile email']}),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => res.redirect('/auth/profile'),
);

router.get('/profile', (req, res) => {
  res.render('profile', {
    user: req.user,
  });
});

router.get('/logout', function (req, res, next) {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;
