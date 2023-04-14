const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
// const restaurantList = require("./restaurant.json")
const mongoose = require("mongoose")
const db = mongoose.connection
const restaurantList = require("./models/restaurant")


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))

app.get("/", (req, res) => {
  restaurantList.find()
    .lean()
    .then((restaurant) => {
      res.render("index", { restaurant })
    })
    .catch((e) => console.log(e))
})

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((e) => console.log(e))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  return restaurantList.find()
    .lean()
    .then((restaurants) => {
      let restaurant =
        restaurants.filter((e) => e.name.includes(keyword) || e.name_en.toLocaleLowerCase().includes(keyword))
      res.render("index", { restaurant })
    })
    .catch((e) => console.log(e))
})

app.post("/restaurant/:id/delete", (req, res) => {
  let id = req.params.id
  return restaurantList.findById(id)
    .then((e) => e.remove())
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e))
})

app.get("/restaurant/:id/edit", (req, res) => {
  let id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((e) => console.log(e))
})

app.post("/restaurant/:id", (req, res) => {
  let restaurant = req.body
  let id = req.params.id
  console.log(restaurant)
  return restaurantList.updateOne({ _id: id }, {
    name_en: restaurant.name_en,
    description: restaurant.description,
    location: restaurant.location
  })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((e) => console.log(e))
})

app.listen(3000, () => {
  console.log("http://localhost:3000")
})