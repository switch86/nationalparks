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


module.exports = apiRouter