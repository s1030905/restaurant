const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const restaurantList = require("./restaurant.json")

app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: "main" }))

app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList.results })
})

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id
  let restaurant = restaurantList.results.find((e) => e.id === Number(id))
  res.render("show", { restaurant: restaurant })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  let restaurant = restaurantList.results.filter((e) => {
    if (e.name.includes(keyword) || e.name_en.toLocaleLowerCase().includes(keyword)) {
      return e
    }
  })
  res.render("index", { restaurant, keyword })
})

app.listen(3000, () => {
  console.log("http://localhost:3000")
})