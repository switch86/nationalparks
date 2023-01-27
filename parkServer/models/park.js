const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
  parkCode: {
    type: String,
    required: true,
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