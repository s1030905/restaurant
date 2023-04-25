const express = require("express")
const router = express.Router()

const home = require("./modules/home")
const routes = require("./modules/routes")
const user = require("./modules/user")
const auth = require("./modules/auth")
const { authenticator } = require("../middleware/auth")

router.use("/auth", auth)
router.use("/user", user)

router.use("/search", authenticator, routes)
router.use("/restaurant", authenticator, routes)
router.use("/", authenticator, home)


module.exports = router