import axios from "axios"
import React, {createContext, useState, useEffect, useContext} from "react"



const ParksContext = createContext()
const userAxios = axios.create()

// interceptor adds token and user from local storage to all userAxios requests
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    config.headers.user = user
    config.headers.Authorization = `Bearer ${token}`
    return config
})
function ParksProvider(props) {
  // set state for image carousel park and collection 
  // const [parksArray, setParksArray] = useState([])
  const [park, setPark] = useState()
  const [collection, setCollection] = useState([])
  const [savedParks, setSavedParks] = useState([])
  const [allLikedParks, setAllLikedParks] = useState([])

  // // get Parks Array from nps - these are used in the carousel
  // function getAllParks() {
  //     parksArray.length === 0 &&
  //     userAxios.get(`http://localhost:9000/nps/`)
  //             .then(res => {
  //               setCollection(res.data.data)
  //             })
  //             .catch(err => console.log(err))
  //   }
// get parks based on parameters saved in selections 
  const getSelectedParks = (selections) => {
    userAxios.request({
      method: "get",
      url: "/nps/",  
      params: {...selections}
    })
    .then(res => {
      setCollection(res.data.data)
    })
    .catch(error => console.dir(error))
  } 
  //get one park from nps route with parkcode 
  function getPark(parkId) {
      userAxios.get(`/nps/parks/${parkId.parkCode}/`)
        .then(res => {
          // console.log(res.data)
          setPark(res.data)
          // console.log(park)
        })
        .catch(error => console.log(error))
      }
//get all parks saved in mongoDB
    function getAllLikedParks() {
      userAxios.get("/api/parks/")
        .then( res => {
          setAllLikedParks(res.data)
        })
        .catch(err => console.log(err))
      }
      //get all full park objects the user has liked from mongoDB 
      function getUserLikedParks(){
        userAxios.get(`/api/parks/user/`)
          .then(res => setSavedParks(res.data))
          .catch(err => console.log(err))
      }
      // save a new park to the database 
    function saveUserPark(park) {
        userAxios.post(`/api/parks/user/${park.parkCode}`, park)
          .then(res => setPark(res.data))
          .catch(err => console.log(err))
        }
        //update a park that has already been saved to the database 
    // function updateUserPark(park) {
    //     userAxios.put(`http://localhost:9000/api/parks/user/${park.parkCode}`)
    //       .then(res => setPark(res))
    //       .catch(err => console.log(err))
          
    // }
      // update a when a user unlikes a park
    // function removeUserPark(park) {
    //     userAxios.put(`http://localhost:9000/api/parks/user/remove/${park.parkCode}`)
    //       .then(res => console.log(res))
    //       .catch(err => console.log(err))
    // }
  
    return (
      <>
        <ParksContext.Provider value={{
          // parksArray,
          collection,
          savedParks,
          allLikedParks,
          park,
          setPark,
          getSelectedParks,
          saveUserPark,
          // removeUserPark,
          // updateUserPark,
          getAllLikedParks,
          getUserLikedParks,
          getPark,
          // getAllParks, 
        }}>
          {props.children}
        </ParksContext.Provider>
      </>
  
  )
}

export {ParksContext, ParksProvider}
