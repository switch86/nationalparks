const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  parkCode: {
    type: String,
    required: true,
  },
  url: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Park", parkSchema)