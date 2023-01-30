const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
  id: String,
  fullName: String,
  description: String,
  latitude: String, 
  longitude: String, 
  activities: Array, 
  topics: Array, 
  states: String,
  entranceFees: Array, 
  operatingHours: Array, 
  images: Array, 
  name: String, 
  designation: String, 
  parkCode: {
    type: String,
    // required: true,
  },
  comments: {
    type: Schema.Types.ObjectId, 
    ref: "Comment"
  },
  upVotes: {
    type: Array,
    default: []
  },
  users: {
    type: Schema.Types.ObjectId, 
    ref: "User"
  }
})

module.exports = mongoose.model("Park", parkSchema)