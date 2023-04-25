const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const methodOverride = require("method-override")
const session = require("express-session")
const router = require("./routes/index")
require("./config/mongoose")

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.listen(2700, () => {
  console.log("http://localhost:2700")
})