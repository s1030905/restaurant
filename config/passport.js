const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require("passport-facebook")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = app => {
  // ----------------------------------------------------------middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // --------------------------------------------------------strategy setting
  passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { type: "warning_msg", message: "此信箱未被註冊" })
        }
        return bcrypt.compare(password, user.password)
          .then((match) => {
            if (!match) {
              return done(null, false, { type: "warning_msg", message: "Password incorrect" });
            }
            return done(null, user)
          })

      })
      .catch((err) => console.log(err))
  }
  ));

  // ------------------------------------------------strategy setting-facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ["email", "displayName"]
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then((user) => {
          if (user) { return done(null, user) }
          let randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) =>
              User.create({ name, email, password: hash })
                .then((user) => done(null, user))
                .catch(err => done(err, false))
            )
            // .then((user) => done(err, user))
            .catch(err => done(err, false))
        })
        .catch(err => done(err, false))
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

