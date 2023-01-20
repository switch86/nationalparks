import {useParams} from "react-router-dom"
import {useContext} from "react"
import { ParksContext } from "../components/Context/ParksContext"
import DisplayPage from "../components/DisplayPage"
import { useEffect } from "react"
import axios from "axios"

export default function Parks() {

    //change park from useContext to useParams so it stays when the page refreshes. 
    const {parkId} = useParams()
    const {getPark, park, handleSelect} = useContext(ParksContext)
    console.log(park)
    const parkCode = {parkCode: parkId}
    console.log(parkId)
    
    useEffect(() => {
        if (!park) {
            handleSelect(parkCode)
        }
    }, [])

    return (
        park ? 
            <div className="ParkPage">
            <h1 className="parkName">{park.fullName}</h1>
            <img className="parkImage" src={park.images[0].url}/>
            {park.activities.map((activity, index) => {
                return(<span key={index}>{activity.name}</span>)
            })}
            {/* <DisplayPage 
            collection={park.images}
            /> */}
            </div>
            :
            <h1>Please Try Again</h1>
        
    )
}