const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json")
const User = require("../user")
const db = require("../../config/mongoose")
let user1_id = ""
let user2_id = ""



db.once("open", () => {
  User.find({ email: { $in: ["user1@example.com", "user2@example.com"] } })
    // .then((user) => console.log(user))
    .then((user) => {
      user1_id = user[0]._id
      user2_id = user[1]._id
    })
    .then(() => {
      const restaurants = restaurantList.results
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id <= 3) {
          Restaurant.create({
            name: restaurants[i].name,
            name_en: restaurants[i].name_en,
            description: restaurants[i].description,
            location: restaurants[i].location,
            image: restaurants[i].image,
            userId: user1_id
          })
        } else if (restaurants[i].id <= 6) {
          Restaurant.create({
            name: restaurants[i].name,
            name_en: restaurants[i].name_en,
            description: restaurants[i].description,
            location: restaurants[i].location,
            image: restaurants[i].image,
            userId: user2_id
          })
        }
        else {
          Restaurant.create({
            name: restaurants[i].name,
            name_en: restaurants[i].name_en,
            description: restaurants[i].description,
            location: restaurants[i].location,
            image: restaurants[i].image,
            // userId: []
          })
        }
      }
    })
    .catch((e) => console.log(e))
  console.log("done")
})
