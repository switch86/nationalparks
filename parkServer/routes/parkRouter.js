const express = require("express")
const park = require("../models/park.js")
const parkRouter = express.Router()
const Park = require('../models/park.js')

// Get All parks
parkRouter.get("/", (req, res, next) => {
  Park.find((err, parks) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parks)
  })
})

// get parks by user 

parkRouter.get('/user', (req, res, next) => {
  Park.find( {user: req.auth._id}, (err, parks) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(parks)
  })
})

// Add new park
parkRouter.post("/", (req, res, next) => {
  let isLiked = Park.exists({parkCode: req.body.parkCode})
  console.log(isLiked)
  if (isLiked) {
    Park.findOneAndUpdate(
      { _id: isLiked._id, user: req.auth._id },
      req.body,
      { new: true },
      (err, updatedpark) => {
        if(err){
          res.status(500)
          return next(err)
        }
        console.log(updatedpark)
        return res.status(201).send(updatedpark)
      }
    )
  }
  else {
    req.body.user = req.auth._id
    const newpark = new Park(req.body)
    newpark.save((err, savedpark) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedpark)
    })
  }
})

// Delete park
parkRouter.delete("/:parkId", (req, res, next) => {
  Park.findOneAndDelete(
    { _id: req.params.parkId, user: req.auth._id},
    (err, deletedpark) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete park: ${deletedpark.title}`)
    }
  )
})

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