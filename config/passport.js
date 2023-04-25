const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/user")

module.exports = app => {
  // ----------------------------------------------------------middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // --------------------------------------------------------strategy setting
  passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) { return done(null, false) }
        if (password !== user.password) { return done(null, false); }
        return done(null, user)
      })
      .catch((err) => console.log(err))
  }
  ));


  // --------------------------------------------------------serialize&deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  });
}

