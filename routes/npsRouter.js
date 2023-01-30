const express = require("express")
const axios = require("axios")
// const api = require("../models/api")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`
const Park = require("../models/park")
const User = require("../models/user")

// const apiModel = require('../models/api')

apiRouter.get("/", (req, res, next) => {
    const {q, stateCode, parkCode} = req.query
    // console.log(req.query)
    // const query = `q=${req.params.q}&` || ""
    // console.log(query)
    axios.get(`${baseUrl}?${stateCode?`stateCode=${stateCode}&` : ""}${parkCode ? `parkCode=${parkCode}&` : ""}${q? `q=${q}&` : ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})

// function newPark(park, userId) {
//     const parkDoc = new Park(park)
//     const user = User.findOne({_id: req.auth._id})
//     parkDoc.upVotes.push(userId)
//     parkDoc.users.push(user)
//     parkDoc.save((err, saved)=> {
//         if(err){
//           res.status(500)
//           return next(err)
//         }
//         return res.status(201).send(saved)
//       })
// }

// apiRouter.get("/parks/:parkId", (req, res, next) => {
//     const savedPark = Park.findOne({parkCode: req.params.parkId})
//     if (!savedPark) {
//         axios.get(`${baseUrl}?${`parkCode=${req.params.parkId}&` || ""}${key}`)
//             .then (function (parks) {
//                 newPark(parks, req.user._id)
//             })
//             .catch (err => next(err)) 
//     } else {
//         return res.json(savedPark)
//     }
//     })
        
apiRouter.get("/parks/:parkId", (req, res, next) => {
    Park.find({parkCode: req.params.parkId}, (err, park) => {
        axios.get(`${baseUrl}?${`parkCode=${req.params.parkId}&` || ""}${key}`)
        .then ((parks) => res.json(parks.data.data[0]))
        .catch (err => next(err))
    })
})



// if (err) {
//     res.status(500)
//     return next(err)
// } else if (park.length > 0) {
//     console.log(park)
//     return res.status(200).send(park)
// }     
// const newPark = new Park(
// newPark.save()
    
// apiRouter.get("/parks", (req,res,next) => {
//     axios.request({
//         method: "get",
//         url: baseUrl,
//         params: {...req.params},
//         api_key: process.env.KEY
//     })
//         .then(res => console.log(res.data))
//         .catch(err => console.log(err))
// })

module.exports = apiRouter