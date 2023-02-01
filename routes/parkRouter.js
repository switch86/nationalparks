const express = require("express")
const axios = require("axios")
const parkRouter = express.Router()
const Park = require('../models/park.js')
const User = require('../models/user.js')
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`

// Get All liked parks
parkRouter.get("/", (req, res, next) => {
  Park.find( (err, parks) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parks)
  })
})

// // get liked parks by favorites by user
parkRouter.get('/user', (req, res, next) => {
  Park.find({users: req.auth._id}, (err, parks) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parks)
  })
})

// Like park that has not been liked before. 

parkRouter.post("/user/:parkId", async (req, res, next) => {
  // find the user who made the request
  const user = await User.findOneAndUpdate({ _id: req.auth._id}, {$addToSet: {"favorites": req.body.parkCode}}, {new:true})

  //of there is already a park, save it as parkItem and return
  parkItem = await Park.findOneAndUpdate({parkCode: req.body.parkCode}, {$addToSet: {"upVotes":  user._id}}, {new:true})
  if (parkItem) {
    console.log(parkItem)
    return
  } else {
    
  let fullParkObj
        
  axios.get(`${baseUrl}?${`parkCode=${req.body.parkCode}&` || ""}${key}`)
        .then ((parks) => fullParkObj = parks.data.data[0])
        .catch (err => next(err))
    
    // create a new Park from the request body 
    const newPark = new Park(req.body)
    // add user to park users 
    newPark.users = user
    newPark.upVotes = [user._id]
    // save new Park 
    newPark.save((err, result) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(result)
    })

  }
})


// Update park that has been added

parkRouter.put("/user/:parkId", async(req, res, next) => {
  const user = User.findOneAndUpdate({ _id: req.auth._id}, { $addToSet: {favorites: req.body.parkCode }}, { new: true})
  const parkItem = Park.findOneAndUpdate({parkCode: req.body.parkCode}, {$addToSet: {"upVotes":  user._id}}, {new: true})
  if (!parkItem) { 
    return next(new Error("this park hasn't been saved before"))
  } 
  return res.status(200).send("updated")
})

module.exports = parkRouter