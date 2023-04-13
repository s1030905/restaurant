const mongoose = require("mongoose")
const db = mongoose.connection
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on("error", () => {
  console.log("mongodb error")
})
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
