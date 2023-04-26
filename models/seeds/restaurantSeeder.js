const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")
// const User = require("../user")
const db = require("../../config/mongoose")


db.once("open", () => {
  const restaurants = restaurantList.results
  for (let i = 0; i < restaurants.length; i++) {
    if (restaurants[i].id <= 3) {
      Restaurant.create({
        name: restaurants[i].name,
        name_en: restaurants[i].name_en,
        description: restaurants[i].description,
        location: restaurants[i].location,
        image: restaurants[i].image,
        userId: "6447de77cf0b8849eccf2d90"
      })
    } else if (restaurants[i].id <= 6) {
      Restaurant.create({
        name: restaurants[i].name,
        name_en: restaurants[i].name_en,
        description: restaurants[i].description,
        location: restaurants[i].location,
        image: restaurants[i].image,
        userId: "6447de77cf0b8849eccf2d91"
      })
    }
    else {
      Restaurant.create({
        name: restaurants[i].name,
        name_en: restaurants[i].name_en,
        description: restaurants[i].description,
        location: restaurants[i].location,
        image: restaurants[i].image
      })

    }

  }
  console.log("done")
})
