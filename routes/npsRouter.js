const express = require("express")
const axios = require("axios")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`
const Park = require("../models/park")




apiRouter.get("/", (req, res, next) => {
    const {q, stateCode, parkCode} = req.query

    axios.get(`${baseUrl}?${stateCode?`stateCode=${stateCode}&` : ""}${parkCode ? `parkCode=${parkCode}&` : ""}${q? `q=${q}&` : ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})


        
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