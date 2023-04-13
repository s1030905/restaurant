const mongoose = require("mongoose")
const db = mongoose.connection
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useNewUrlParser: true })

db.on("error", () => {
  console.log("mongodb error")
})
db.once("open", () => {
  console.log("mongodb connected")
  console.log(restaurantList)
  // for (let i = )
})
