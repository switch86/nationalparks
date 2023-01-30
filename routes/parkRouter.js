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
    console.log(parks)
    // const parkCodes = []
    // parks.map((park) => {
    //   parkCodes.push(park.parkCode)
    // })    
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


// parkRouter.get('/:parkId', (req, res, next) => {
//   User.countDocuments( {favorites: {$in: [req.params.parkId]}}, (err, count) => {
//     if (err) {
//       res.status(500)
//       return next(err)
//     }
//     return res.status(200).send(count)
//   })
// })

// const addLikeToPark = function (park, user) {
//   return Park.findByIdAndUpdate(
//     park, 
//     {$push: {users: user._id}},
//     { new: true, useFindAndModify: false }
//   )
// }
// const addParkToUser = function (park, user) {
//   return User.findByIdAndUpdate(
//     user, 
//     {$push: {favorites: park._id}},
//     { new: true, useFindAndModify: false }
//   )
// }

//   return Park.findById(id).populate("users")
  
//   const createPark = function(parkObj) { 
//   return Park.create(parkObj).then(park => {
//     console.log(park)
//   return park})
  // console.log(req.body)



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
    // create a new version
    // const newpark = {...newPark}
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

// Delete park
// parkRouter.delete("/:parkId", (req, res, next) => {
//   Park.findOneAndDelete(
//     { _id: req.params.parkId, user: req.auth._id},
//     (err, deletedpark) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       return res.status(200).send(`Successfully delete park: ${deletedpark.title}`)
//     }
//   )
// })

// // Update park
// parkRouter.put("/:parkId", (req, res, next) => {
//   Park.findOneAndUpdate(
//     { _id: req.params.parkId, user: req.auth._id },
//     req.body,
//     { new: true },
//     (err, updatedpark) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       console.log(updatedpark)
//       return res.status(201).send(updatedpark)
//     }
//   )
// })

module.exports = parkRouter