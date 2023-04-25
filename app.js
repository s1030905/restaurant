const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const session = require("express-session")
const methodOverride = require("method-override")
const usePassport = require("./config/passport")
const flash = require("connect-flash")
const router = require("./routes/index")
require("./config/mongoose")


app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash("success_msg")
  res.locals.warning_msg = req.flash("warning_msg")
  next()
})
app.use(router)


app.listen(2700, () => {
  console.log("http://localhost:2700")
})