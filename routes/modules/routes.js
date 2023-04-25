const express = require("express")
const router = express.Router()
const restaurantList = require("../../models/restaurant")

router.get("/:id", (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((e) => console.log(e))
})

router.get("/", (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  return restaurantList.find()
    .lean()
    .then((restaurants) => {
      let restaurant =
        restaurants.filter((e) => e.name.includes(keyword) || e.name_en.toLocaleLowerCase().includes(keyword))
      res.render("index", { restaurant, keyword })
    })
    .catch((e) => console.log(e))
})

router.delete("/:id", (req, res) => {
  let id = req.params.id
  return restaurantList.findById(id)
    .then((e) => e.remove())
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e))
})

router.get("/:id/edit", (req, res) => {
  let id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((e) => console.log(e))
})

router.put("/:id", (req, res) => {
  let restaurant = req.body
  let id = req.params.id
  return restaurantList.updateOne({ _id: id }, {
    name_en: restaurant.name_en,
    description: restaurant.description,
    location: restaurant.location
  })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((e) => console.log(e))
})

module.exports = router