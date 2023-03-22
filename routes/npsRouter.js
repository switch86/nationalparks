const express = require("express")
const axios = require("axios")
const apiRouter = express.Router()
require('dotenv').config()
const baseUrl = "https://developer.nps.gov/api/v1/parks"
const key = `api_key=${process.env.KEY}`
const Park = require("../models/park")




apiRouter.get("/", async (req, res, next) => {
    const {q, stateCode, parkCode} = req.query
    await axios.get(`${baseUrl}?${stateCode?`stateCode=${stateCode}&` : ""}${parkCode ? `parkCode=${parkCode}&` : ""}${q? `q=${q}&` : ""}${key}`)
        .then ((parks) => res.json(parks.data))
        .catch (err => next(err))
})


        
apiRouter.get("/parks/:parkId", async(req, res, next) => {
    const park = await Park.findOne({parkCode: req.params.parkId})
    if (park) {
        console.log("park: " + park)
        res.json(park)
    } else {
        await axios.get(`${baseUrl}?${`parkCode=${req.params.parkId}&`}${key}`)
        .then ((npsres) => res.send(npsres.data.data[0]))
        .catch (err => next(err))
    }
})


module.exports = apiRouter