const express = require("express")
const axios = require("axios")
// const api = require("../models/api")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`

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

apiRouter.get("/parks/:parkId", (req, res, next) => {
    axios.get(`${baseUrl}?${`parkCode=${req.params.parkId}&` || ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
    })

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