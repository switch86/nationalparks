const express = require("express")
const axios = require("axios")
// const api = require("../models/api")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks?"
const key = `api_key=${process.env.KEY}`

// const apiModel = require('../models/api')

apiRouter.get("/", (req, res, next) => {
    const {q, stateCode, parkCode} = req.query
    console.log(req.query)
    // const query = `q=${req.params.q}&` || ""
    // console.log(query)
    axios.get(`${baseUrl}${stateCode?`stateCode=${stateCode}&` : ""}${parkCode ? `parkCode=${parkCode}&` : ""}${q? `q=${q}&` : ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})

// apiRouter.get("/park/:parkId", (req, res, next) => {
//     console.log(req.params)
//     axios.get(`${baseUrl}${`parkCode=${req.query.parkCode}` || ""}${key}`)
//         .then ((park) => res.json(park.data))
//         .catch (err => next(err))
// })

module.exports = apiRouter