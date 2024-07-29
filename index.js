const express = require("express");
const ConnectDB = require("./config/dbconfig");
const env = require("dotenv").config();
const userRoute  = require("./Routes/userRoute");
const profileinfoRoute = require("./Routes/profileinfoRoute");
const cors =require("cors")

const app = express()

app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/Api/users",userRoute)
app.use("/Api/profile", profileinfoRoute)


ConnectDB()
const port = process.env.PORTS || 5200


app.listen(port,()=>{
    console.log(`App is running on this ${port}`)
})