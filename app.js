require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Database setup
const mongoDb = process.env.DB_URL
const main = async () => {
    await mongoose.connect(mongoDb)
}
main().catch((err) => console.log(err))

// Routing
const user = require("./routes/users")
const url = require("./routes/urls")

app.use("/users",user)
app.use("/urls",url)

app.listen(3000)