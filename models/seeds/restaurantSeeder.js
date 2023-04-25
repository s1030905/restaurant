const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")
const db = require("../../config/mongoose")


db.once("open", () => {
  const restaurants = restaurantList.results
  for (let i = 0; i < restaurants.length; i++) {
    if (i.id <= 3) {
      Restaurant.create({
        name: restaurants[i].name,
        name_en: restaurants[i].name_en,
        description: restaurants[i].description,
        location: restaurants[i].location,
        image: restaurants[i].image,
        // userId:
      })
    } else if (i.id <= 6) {
      Restaurant.create({
        name: restaurants[i].name,
        name_en: restaurants[i].name_en,
        description: restaurants[i].description,
        location: restaurants[i].location,
        image: restaurants[i].image
      })
    } else {
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
