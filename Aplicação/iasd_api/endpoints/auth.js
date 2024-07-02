var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
const db = require('../helper/dbhelper');

var app = express();
app.use(passport.initialize());

passport.use(new LocalStrategy({
  usernameField: 'username', // Specify the field names for username and password
  passwordField: 'password'
}, function verify(username, password, done) {
  db.any('SELECT * FROM person WHERE ds_username = $1', [username])
      .then(function (row) {
          if (row.length !== 1) {
              return done(null, false, { message: 'Incorrect username or password.' });
          }

          const user = row[0];
          const salt = user.ds_salt;
          crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
              if (err) { return done(err); }
              if (!crypto.timingSafeEqual(Buffer.from(user.ds_password, 'hex'), hashedPassword)) {
                  return done(null, false, { message: 'Incorrect username or password.' });
              }

              const token = crypto.randomBytes(32).toString('hex');
                db.none('INSERT INTO token_handler (cd_person, ds_token) VALUES ($1, $2)', [user.cd_person, token])
                .then(function () {
                    return done(null, { token });
                });
          });
      })
      .catch(function (err) {
          return done(err);
      });
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
      cb(null, { id: user.cd_person, username: user.ds_username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
      return cb(null, user);
  });
});

var router = express.Router();

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({ message: info.message || 'Login failed' }); }

      req.login(user, function (err) {
          if (err) { return next(err); }
          return res.json({ message: 'Login successful', token: user.token });
      });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  db.none('DELETE FROM token_handler WHERE ds_token = $1', [req.headers['authorization']])
      .then(function () {
          req.logout();
          res.json({ message: 'Logout successful' });
      })
      .catch(function (err) {
          res.status(500).json({ message: 'Internal server error' });
      });
});



app.use(router);

module.exports = app;

