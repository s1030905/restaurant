const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
// const mongoose = require("mongoose")
const methodOverride = require("method-override")
const router = require("./routes/index")
require("./config/mongoose")


// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config()
// }
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))


app.listen(3000, () => {
  console.log("http://localhost:3000")
})