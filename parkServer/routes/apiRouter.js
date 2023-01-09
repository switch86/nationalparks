const express = require("express")
const axios = require("axios")
// const api = require("../models/api")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks?"
const key = `api_key=${process.env.KEY}`
console.log(key)
// const apiModel = require('../models/api')

apiRouter.get("/", (req, res, next) => {
    const {q, statecode} = req.query
    console.log(req.query)
    // const query = `q=${req.params.q}&` || ""
    // console.log(query)
    axios.get(`${baseUrl}${statecode ? `stateCode=${statecode}` : ""}${q? `q=${q}&` : ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})

apiRouter.get("/:parkID", (req, res, next) => {
    console.log(req.query)
    axios.get(`${baseUrl}${req.query.parkcode || ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})

module.exports = apiRouter