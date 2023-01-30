const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
// const { default: Parks } = require('../../parksApp/src/pages/Parks')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    default : []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  joined: {
    type: Date, 
    default: Date.now
  }
})

//presave hook to encrypt user passwords on signup 
userSchema.pre('save', function(next) {
  const user = this
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
  })
})

//method to check encrypted password on login 
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if(err) return callback(err)
      return callback(null, isMatch)
  })
}

//  method to remove users password from the response 
userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}
module.exports = mongoose.model("User", userSchema)