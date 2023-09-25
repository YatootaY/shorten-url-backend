require('dotenv').config();

const express = require("express")

const app = express()

app.listen(3000, () => {
    console.log(`App is running on http://localhost:${process.env.PORT}`)
})