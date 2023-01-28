import axios from "axios"
import React, {createContext, useState, useEffect, useContext} from "react"



const ParksContext = createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    // const user = JSON.parse(localStorage.getItem("user"))
    // config.headers.user = user
    config.headers.Authorization = `Bearer ${token}`
    return config
})
function ParksProvider(props) {
  // set state for image carousel park and collection 
  const [parksArray, setParksArray] = useState([])
  const [park, setPark] = useState()
  const [collection, setCollection] = useState([])
  const [userParks, setSavedParks] = useState([])
  const [allLikedParks, setAllLikedParks] = useState([])

// get parks based on parameters saved in selections 
  const handleSubmit = (selections) => {
    userAxios.request({
      method: "get",
      url: "http://localhost:9000/nps/",  
      params: {...selections}
    })
    .then(res => {setCollection(res.data.data)})
    .catch(error => console.dir(error))
  }
  
  //get park from nps route with parkcode 
  function getPark(parkId) {
    console.log(parkId)
      userAxios.get(`http://localhost:9000/nps/parks/${parkId.parkCode}`)
        .then(res => setPark(res.data))
        .catch(error => console.log(error))
      }
      function getParks(parkId) {
        console.log(parkId)
          userAxios.get(`http://localhost:9000/nps/parks/${parkId.parkCode}`)
            .then(res => setSavedParks(prev => [...prev,res.data]))
            .catch(error => console.log(error))
          }

  
  // // get Parks Array from nps - these are used in the carousel
  function getAllParks() {
      userAxios.get(`http://localhost:9000/nps/`)
              .then(res => {
                setParksArray(res.data.data)
                // setCollection(res.data.data)
              })
              .catch(err => console.log(err))
    }
// function to get all parks saved in DB
    function getAllLikedParks() {
      userAxios.get("http://localhost:9000/api/parks/")
        .then( res => {
          setAllLikedParks(res.data)
        })
        .catch(err => console.log(err))
      }
      //get user liked parks 
      function getUserLikedParks(){
        userAxios.get(`http://localhost:9000/api/parks/user/`)
          .then(res => setSavedParks(res))
          .catch(err => console.log(err))
      }
  
    function saveUserPark(park) {
        userAxios.post(`http://localhost:9000/api/parks/user/${park.parkCode}`, park)
          .then(res => setPark(res))
          .catch(err => console.log(err))
        }
    function updateUserPark(park) {
        userAxios.put(`http://localhost:9000/api/parks/user/${park.parkCode}`)
          .then(res => setPark(res))
          .catch(err => console.log(err))
          
    }
    function removeUserPark(park) {
        userAxios.put(`http://localhost:9000/api/parks/user/${park.parkCode}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }
  
    return (
      <>
        <ParksContext.Provider value={{
          parksArray,
          collection,
          handleSubmit,
          saveUserPark,
          removeUserPark,
          updateUserPark,
          getAllLikedParks,
          allLikedParks,
          userParks,
          // handleSelect,
          setPark,
          getPark,
          getParks, 
          getAllParks, 
          park
        }}>
          {props.children}
        </ParksContext.Provider>
      </>
  
  )
}

export {ParksContext, ParksProvider}
