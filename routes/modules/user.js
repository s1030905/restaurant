const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../../models/user")

// ----------------------------------------------------------------login
router.get("/login", (req, res) => {
  res.render("login")
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
  successRedirect: "/"
}));

// ----------------------------------------------------------------register
router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  let { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) { errors.push({ message: "請填寫所有欄位" }) }
  if (password !== confirmPassword) { errors.push({ message: "密碼與確認密碼不符" }) }
  if (errors.length !== 0) { res.render("register", { name, email, password }) }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "此電子郵件已註冊過" })
        return res.render("register", { errors, name, email, password })
      }
      return User.create({ name, email, password })
        .then(() => { res.render("index") })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// ----------------------------------------------------------------logout
router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "已登出")
  res.redirect("/user/login")
})

module.exports = router