const express = require("express")
const { createProfileinfo } = require("../Controllers/Profileinfo")

const router = express.Router()

router.post("/uploadprofile", createProfileinfo)

module.exports = router;