const express = require("express")
const router = express.Router()
const restaurantList = require("../../models/restaurant")

router.get("/", (req, res) => {
  let userId = req.user._id
  restaurantList.findOne({ userId })
    .lean()
    .then((restaurant) => {
      res.render("index", { restaurant })
    })
    .catch((e) => console.log(e))
})

module.exports = router