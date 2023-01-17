const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  parkCode: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
}
})

module.exports = mongoose.model("Park", parkSchema)