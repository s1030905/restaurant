// const mongoose = require("mongoose")
// const db = mongoose.connection
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")
const db = require("../../config/mongoose")


db.once("open", () => {
  console.log("mongodb connected")
  const restaurants = restaurantList.results
  for (let i = 0; i < restaurants.length; i++) {
    Restaurant.create({
      name: restaurants[i].name,
      name_en: restaurants[i].name_en,
      description: restaurants[i].description,
      location: restaurants[i].location,
      image: restaurants[i].image
    })
  }
  console.log("done")
})
