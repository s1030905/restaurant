const db = require("../../config/mongoose")
const User = require("../user")

db.once("open", () => {
  console.log("seeders creating")
  User.create(
    [{
      name: "user1",
      email: "user1@example.com",
      password: "12345678"
    }, {
      name: "user2",
      email: "user2@example.com",
      password: "12345678"
    }])
    .then(() => console.log("done"))
})