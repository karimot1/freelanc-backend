const express = require("express")
const router = express.Router()

const {SignUp,Login}= require("../Controllers/userController");
const {Users,getUsernames}  = require("../Controllers/Username")
const VerifyToken = require("../MiddleWare/ValidateToken")

router.post("/sign-up",SignUp)
router.post("/login",Login)
router.post('/username', Users)
router.get("/getuser/:id", getUsernames)

module.exports =  router