var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const db = require('../helper/dbhelper');

express().use(passport.initialize());

passport.use(new LocalStrategy(function verify(username, password, done) {
    console.log(username,password);
    db.any('SELECT * FROM person WHERE ds_username = $1', [ username ]).then(function(row) {
        try{
        if (row.length !== 1) {
            console.log(row);
            return done(null,false,{message: 'Incorrect username or password.'});
        }
      
        crypto.pbkdf2Sync(password, row[0].ds_password, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return done(err); }
            if (!crypto.timingSafeEqual(row[0].ds_password, hashedPassword)) {
              return done(null, false);
            }
        
            const token = crypto.randomBytes(32).toString('hex');
            return done(null, { token });
            // db.none('INSERT INTO authenticator (ds_username, ds_token) VALUES ($1, $2)', [username, hashedPassword])
            //     .then(() => {
            //         return done(null, { token });
            //     })
            //     .catch((err) => {
            //         return done(err);
            //     });
          });
        }
        catch (e){
            console.log(e);
            return done(e);
        }
    });
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.cd_person, username: user.ds_username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


var router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;