const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UrlSchema = new Schema({
    originalUrl: {type: String, required: true},
    shortUrl: {type:String, required: true, unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    clicks: {count: { type: Number, default: 0}},
    description: {type: String}
})

module.exports = mongoose.model("Url", UrlSchema)