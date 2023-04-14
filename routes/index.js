const express = require("express")
const router = express.Router()

const home = require("./modules/home")
const routes = require("./modules/routes")

router.use("/", home)
router.use("/search", routes)
router.use("/restaurant", routes)

module.exports = router