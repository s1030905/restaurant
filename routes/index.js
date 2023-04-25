const express = require("express")
const router = express.Router()

const home = require("./modules/home")
const routes = require("./modules/routes")
const user = require("./modules/user")

router.use("/user", user)
router.use("/search", routes)
router.use("/restaurant", routes)
router.use("/", home)

module.exports = router