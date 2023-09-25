require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const app = express()

// Database setup
const mongoDb = process.env.DB_URL
const main = async () => {
    await mongoose.connect(mongoDb)
}
main().catch((err) => console.log(err))

// Routing
const user = require("./routes/users")

app.use("/users",user)

app.listen(3000, () => {
    console.log(`App is running on http://localhost:${process.env.PORT}`)
})