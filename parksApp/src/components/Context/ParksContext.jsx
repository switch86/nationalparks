import axios from "axios"
import {React, createContext, useState, useEffect, useContext } from "react"



const ParksContext = createContext()

function ParksProvider(props) {

  // set empty state for image carousel 
  const [parksArray, setParksArray] = useState([])
  const [park, setPark] = useState({})
  const [collection, setCollection] = useState([])
  const [video, setVideo] = useState([])
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

  function handleSubmit(selections) {
    axios.request({
      method: "get",
      url: "http://localhost:9000/nps",  
      params: {...selections}
    })
    .then(res => {setCollection(res.data.data)})
    .catch(error => console.dir(error))
  }
  console.log(collection)
  
  // useEffect(() => {
  //   axios.get(`https://developer.nps.gov/api/v1/${selections.isPreRecorded ? "multimedia/videos" : "webcams"}?${selections.stateCode === "" ? "" : selections.stateCode}${selections.Parks === "" ? "" : `q=${selections.Parks}&`}api_key=ch5ZJCcqmTafvaWiR3oUP2lf6vBHo2RfWxPzNoe3`)
  //   .then(res => {setCollection(res.data.data)})
  //   .catch(error => console.log(error))
  // }, [])
  
  
  // useEffect(() => {
  //   let random = Math.floor(Math.random() * 50 + 1)
  //   console.log(random)
  //   function getParks() {
  //     axios.get(`https://developer.nps.gov/api/v1/parks?${selections.stateCode === '' ? `statecode=${stateCodes[random].abbreviation}&` : selections.stateCode}limit=10&api_key=ch5ZJCcqmTafvaWiR3oUP2lf6vBHo2RfWxPzNoe3`)
  //     // .then(res => setImageArray(res.data.data[0].Parks))
  //             // .then(res => setImageArray(res.data.data.map(image => image.Parks[0])))
  //             .then(res => setParksArray(res.data.data))
  //             .catch(err => console.log(err))
  //   }
  //   getParks()  
  //     }, [])  

  
    return (
      <>
        <ParksContext.Provider value={{
          parksArray,
          collection,
          video, 
          setVideo,
          handleSubmit,
          setPark
        }}>
          {props.children}
        </ParksContext.Provider>
      </>
  
  )
}

export {ParksContext, ParksProvider}
