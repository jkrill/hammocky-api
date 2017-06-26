const path = require('path');
const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, config) {
  
  const admins = require('./admins.json').admins;
  
  passport.use(new LocalStrategy(
    function(username, password, cb) {
      // todo check password
      var user = admins.find(admin => admin.username == username);
      return cb(null, user);
    }
  ));

  passport.serializeUser(function(user, cb) {
    return cb(null, user.username);
  });

  passport.deserializeUser(function(username, cb) {
    return cb(null, admins.find(admin => admin.username == username));
  });

  app.use(require('cookie-parser')());
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(require('express-session')({ secret: 'hammocky', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());  

  app.get('/admin',
    require('connect-ensure-login').ensureLoggedIn('/admin/login'),
    (req, res) => res.sendFile(path.resolve(__dirname, './app.html'))
  );

  app.get('/admin/login',
    (req, res) => res.sendFile(path.resolve(__dirname, './login.html'))
  );

  app.post('/admin/login',
    passport.authenticate('local', {
      failureRedirect: '/admin/login'
    }),
    (req, res) => res.redirect('/admin')
  );
}
