var express = require("express"),
    app = module.exports = express(),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    User = require("../models/user");


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Setup Passport - MOVE TO SOMEWHERE ELSE
// serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findByEmail(email , function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Unknown user' })
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' })
      }
      return done(null, user)
    })
  }
));

//  ------ CLEAN UP
app.use(express.cookieParser())

// bodyParser should be above methodOverride
app.use(express.bodyParser())
app.use(express.methodOverride())

app.use(passport.initialize())
app.use(passport.session())

app.use(express.favicon())

// routes should be at the last
app.use(app.router)

// Add routes
require('./routes')(app, passport)
