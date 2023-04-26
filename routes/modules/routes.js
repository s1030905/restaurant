const express = require("express")
const router = express.Router()
const restaurantList = require("../../models/restaurant")

// ----------------------------------------------------------------favorite
router.get("/favorite", (req, res) => {
  let userId = req.user._id
  restaurantList.find({ userId })
    .lean()
    .then((restaurant) => {
      res.render("favorite", { restaurant })
    })
    .catch((e) => console.log(e))
})

router.put("/favorite/:id", (req, res) => {
  let userId = req.user._id
  let id = req.params.id
  return restaurantList.findOneAndUpdate({ _id: id }, { $addToSet: { userId: userId } })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e))
})

// --------------------------------------------------------------delete
router.put("/delete/:id", (req, res) => {
  let userId = req.user._id
  let id = req.params.id
  return restaurantList.findOneAndUpdate({ _id: id }, { $pull: { userId: userId } })
    .then(() => res.redirect("/restaurant/favorite"))
    .then((i) => console.log(i))
    .catch((e) => console.log(e))
})

// ----------------------------------------------------------------restaurant
router.get("/:id", (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((e) => console.log(e))
})

// ----------------------------------------------------------------search
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

// ----------------------------------------------------------------edit
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