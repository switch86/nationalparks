const express = require("express")
const axios = require("axios")
const parkRouter = express.Router()
const Park = require('../models/park.js')
const User = require('../models/user.js')
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`

// Get All db parks
parkRouter.get("/", (req, res, next) => {
  Park.find({}, (err, parks) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parks)
  })
})

// // get liked parks by favorites by user
parkRouter.get('/user/', async (req, res, next) => {
  const user = await User.findOne({_id: req.auth._id})
  console.log(user.favorites)
  // const results = []
    Park.find({parkCode: {$in: user.favorites}}, (err, parks) => {  
      if(err){
        res.status(500)
        return next(err)
      } 
      return res.status(200).send(parks)
      // console.log(parks)
      // results.push(parks)
    })
  })

  // console.log(results)
  // const parks = await Park.find({upVotes: {$in: user._id}})
  //   if(!parks) {
  //     res.status(500)
  //     return next(new Error("No parks found"))
  //   }  

// Like park 

parkRouter.post("/user/:parkId", async (req, res, next) => {
  const liked = await User.findOne({ _id: req.auth._id})
  if (liked.favorites.includes(req.params.parkId)) {
    //REMOVE PARK FROM USER FAVORITES
    await User.findOneAndUpdate({ _id: req.auth._id}, { $pull: {favorites: req.params.parkId }}, { new: true})
    await Park.findOneAndUpdate({parkCode: req.params.parkId}, {$pull: {"upVotes":  liked._id}}, {new: true})
  } else {
    await User.findOneAndUpdate({ _id: req.auth._id}, {$addToSet: {"favorites": req.body.parkCode}}, {new:true})
    parkItem = await Park.findOneAndUpdate({parkCode: req.body.parkCode}, {$addToSet: {"upVotes":  liked._id}}, {new:true})
  
  // find the user who made the request, add park to favorites and save it as user
  // const user = await User.findOneAndUpdate({ _id: req.auth._id}, {$addToSet: {"favorites": req.body.parkCode}}, {new:true})

  //if there is already a park, add user to favorites save it as parkItem and return
  
  if (parkItem) {
    return res.status(200).send(parkItem)
  } else {
   // if there is not a park, create one  
  let fullParkObj = {...req.body}
        
  // axios.get(`${baseUrl}?${`parkCode=${req.body.parkCode}&` || ""}${key}`)
  //       .then ((parks) => fullParkObj = {...parks.data.data[0]})
  //       .catch (err => next(err))
    console.log(fullParkObj)
    // create a new Park from the request body 
    const newPark = new Park(fullParkObj)
    // add user to park users 
    newPark.users = liked
    newPark.upVotes = [liked._id]
    // save new Park 
    newPark.save((err, result) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(result)
    })
  }
}
})

// Update park that has been added

// parkRouter.put("/user/:parkId", async(req, res, next) => {
//   const user = await User.findOneAndUpdate({ _id: req.auth._id}, { $addToSet: {favorites: req.params.parkId }}, { new: true})
//   const parkItem = await Park.findOneAndUpdate({parkCode: req.params.parkId}, {$addToSet: {"upVotes":  user._id}}, {new: true})
//   if (!parkItem) { 
//     return next(new Error("can't like. this park hasn't been saved before"))
//   } 
//   return res.status(200).send("updated")
// })

// //Update park that user unlikes
parkRouter.put("/user/remove/:parkId", async(req, res, next) => {
  const user = await User.findOneAndUpdate({ _id: req.auth._id}, { $pull: {favorites: req.params.parkId }}, { new: true})
  const parkItem = await Park.findOneAndUpdate({parkCode: req.params.parkId}, {$pull: {"upVotes":  user._id}}, {new: true})
  if (!parkItem) { 
    return next(new Error("unlike failed"))
  } 
  return res.status(200).send("updated")
})

module.exports = parkRouter