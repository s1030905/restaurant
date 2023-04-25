const db = require("../../config/mongoose")
const User = require("../user")
const bcrypt = require("bcryptjs")
const userSeeder = [{
  name: "user1",
  email: "user1@example.com",
  password: "12345678"
}, {
  name: "user2",
  email: "user2@example.com",
  password: "12345678"
}]

db.once("open", () => {
  console.log("seeders creating")
  for (let i = 0; i < userSeeder.length; i++) {
    bcrypt.genSalt(10)
      .then((salt) => bcrypt.hash(userSeeder[i].password, salt))
      .then((hash) =>
        User.create({
          name: userSeeder[i].name,
          email: userSeeder[i].email,
          password: hash,
        })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))
  }
  console.log("done")
})