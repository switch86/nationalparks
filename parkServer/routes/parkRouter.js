const express = require("express")
const parkRouter = express.Router()
const Park = require('../models/park.js')
const User = require('../models/user.js')

// Get All liked parks
parkRouter.get("/", (req, res, next) => {
  Park.find((err, parks) => {
    if(err){
      res.status(500)
      return next(err)
    }
    const parkCodes = []
    parks.map((park) => {
      parkCodes.push(park.parkCode)
    })    
    return res.status(200).send(parkCodes)
  })
})

// // get liked parks by favorites by user
parkRouter.get('/user', (req, res, next) => {
  Park.find({users: req.auth._id}, (err, parks) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    // user.favorites.map()
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
  console.log(req.body)
  // find the user who made the request
  const user = await User.findOneAndUpdate({ _id: req.auth._id}, {$addToSet: {"favorites": req.body.parkCode}}, {new:true})
  console.log(user)
  //of there is already a park, save it as parkItem and return
  parkItem = await Park.findOneAndUpdate({parkCode: req.body.parkCode}, {$addToSet: {"upVotes":  user._id}}, {new:true})
  if (parkItem) {
    console.log(parkItem)
    return
  } else {
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
    // // create a new version of user 
    // const user2 = {...user}
    // push the new Park to favorites in the new version 
    // user.favorites.push(newPark)
    // User.findOneAndUpdate({ _id: req.auth._id},
    //   user,
    //   { new: true },
    //   (err, updated) => {
    //   if(err){
    //     res.status(500)
    //     return next(err)
    //   }
    //   return res.status(201).send(updated)
    // })
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
  // const newPark = {...parkItem}
  // var match = parkItem.users.filter(current => current == user)
  // if (match) {
  //   newPark.users.filter(current => current != user)
  //   newPark.upVotes.filter(current => current != user._id)
  // // } else {
  //   newPark.users = [...parkItem.users, user]
  //   newPark.upVotes = [...parkItem.upVotes, user._id]
  // }
  
  // user.favorites.push(newPark)

  
  // function to add user 

//   Park.findOneAndUpdate(
//     {parkCode: req.body.parkCode}, 
//     newPark,
//     { new: true },
//     (err, user) => {
//       if (err) {
//         res.status(500)
//         return next(err)
//       }
//       return res.status(200).send(user)
//     })
//     User.findOneAndUpdate({_id: req.auth._id},
//       user, 
//       , 
//       (err, updatedUser) => {
//         if(err ) {
//           res.status(500)
//           return next(err)
//         }
//         return res.status(200).send(updatedUser)
//       })
//   }
// )
  
  
  // User.findOne(, (err, user) => {
    //   if (err) {
  //     res.status(500)
  //     return next(err)
  //   } if(user) {
  //     userObj = {...user.withoutPassword()}
  //     console.log(userObj)
  //   } return })
  //   const newBody = {
  //     favorites: [...req.body]
  //   }
    

//   else {
//     req.body.user = req.auth._id
//     const newpark = new Park(req.body)
//     newpark.save((err, savedpark) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       return res.status(201).send(savedpark)
//     })
//   }
// })

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