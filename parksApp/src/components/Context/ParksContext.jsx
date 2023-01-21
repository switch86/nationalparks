import axios from "axios"
import {React, createContext, useState, useEffect} from "react"



const ParksContext = createContext()

function ParksProvider(props) {

  // set state for image carousel park and collection 
  const [parksArray, setParksArray] = useState([])
  const [park, setPark] = useState()
  const [collection, setCollection] = useState([])
  const stateCodes = [
    {name: 'All', abbreviation: ""},
   { name: 'ALABAMA', abbreviation: 'AL'},
   { name: 'ALASKA', abbreviation: 'AK'},
   { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
   { name: 'ARIZONA', abbreviation: 'AZ'},
   { name: 'ARKANSAS', abbreviation: 'AR'},
   { name: 'CALIFORNIA', abbreviation: 'CA'},
   { name: 'COLORADO', abbreviation: 'CO'},
   { name: 'CONNECTICUT', abbreviation: 'CT'},
   { name: 'DELAWARE', abbreviation: 'DE'},
   { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
   { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
   { name: 'FLORIDA', abbreviation: 'FL'},
   { name: 'GEORGIA', abbreviation: 'GA'},
   { name: 'GUAM', abbreviation: 'GU'},
   { name: 'HAWAII', abbreviation: 'HI'},
   { name: 'IDAHO', abbreviation: 'ID'},
   { name: 'ILLINOIS', abbreviation: 'IL'},
   { name: 'INDIANA', abbreviation: 'IN'},
   { name: 'IOWA', abbreviation: 'IA'},
   { name: 'KANSAS', abbreviation: 'KS'},
   { name: 'KENTUCKY', abbreviation: 'KY'},
   { name: 'LOUISIANA', abbreviation: 'LA'},
   { name: 'MAINE', abbreviation: 'ME'},
   { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
   { name: 'MARYLAND', abbreviation: 'MD'},
   { name: 'MASSACHUSETTS', abbreviation: 'MA'},
   { name: 'MICHIGAN', abbreviation: 'MI'},
   { name: 'MINNESOTA', abbreviation: 'MN'},
   { name: 'MISSISSIPPI', abbreviation: 'MS'},
   { name: 'MISSOURI', abbreviation: 'MO'},
   { name: 'MONTANA', abbreviation: 'MT'},
   { name: 'NEBRASKA', abbreviation: 'NE'},
   { name: 'NEVADA', abbreviation: 'NV'},
   { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
   { name: 'NEW JERSEY', abbreviation: 'NJ'},
   { name: 'NEW MEXICO', abbreviation: 'NM'},
   { name: 'NEW YORK', abbreviation: 'NY'},
   { name: 'NORTH CAROLINA', abbreviation: 'NC'},
   { name: 'NORTH DAKOTA', abbreviation: 'ND'},
   { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
   { name: 'OHIO', abbreviation: 'OH'},
   { name: 'OKLAHOMA', abbreviation: 'OK'},
   { name: 'OREGON', abbreviation: 'OR'},
   { name: 'PALAU', abbreviation: 'PW'},
   { name: 'PENNSYLVANIA', abbreviation: 'PA'},
   { name: 'PUERTO RICO', abbreviation: 'PR'},
   { name: 'RHODE ISLAND', abbreviation: 'RI'},
   { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
   { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
   { name: 'TENNESSEE', abbreviation: 'TN'},
   { name: 'TEXAS', abbreviation: 'TX'},
   { name: 'UTAH', abbreviation: 'UT'},
   { name: 'VERMONT', abbreviation: 'VT'},
   { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
   { name: 'VIRGINIA', abbreviation: 'VA'},
   { name: 'WASHINGTON', abbreviation: 'WA'},
   { name: 'WEST VIRGINIA', abbreviation: 'WV'},
   { name: 'WISCONSIN', abbreviation: 'WI'},
   { name: 'WYOMING', abbreviation: 'WY' }
  ]
// get parks based on parameters saved in selections 
  const handleSubmit = (selections) => {
    axios.request({
      method: "get",
      url: "http://localhost:9000/nps/",  
      params: {...selections}
    })
    .then(res => {setCollection(res.data.data)})
    .catch(error => console.dir(error))
  }
  //get parks based on URL route
  function handleSelect(selections) {
    console.log(selections)
    axios.request({
      method: "get",
      url: "http://localhost:9000/nps/",  
      params: {...selections}
    })
    .then(res => {
      setPark(res.data.data[0])
    })
    .catch(error => console.dir(error))
  }

  
  //get park with parkcode 
  function getPark(parkId) {
    console.log(parkId)
      axios.request({
        method: "get",
        url: "http://localhost:9000/nps/park",  
        params: {parkCode: parkId}
      })
        .then(res => console.log(res.data.data))
        .catch(error => console.log(error))
    }

  
  // // get Parks Array - these are used in the carousel
  function getAllParks() {
      axios.get(`http://localhost:9000/nps/`)
              .then(res => {
                setParksArray(res.data.data)
                setCollection(res.data.data)
              })
              .catch(err => console.log(err))
    }
    useEffect(() => {
    getAllParks()  
      }, [])  

  
    return (
      <>
        <ParksContext.Provider value={{
          parksArray,
          collection,
          handleSubmit,
          handleSelect,
          setPark,
          getPark,
          park
        }}>
          {props.children}
        </ParksContext.Provider>
      </>
  
  )
}

export {ParksContext, ParksProvider}
