import {useParams} from "react-router-dom"
import {useContext, useState} from "react"
import { ParksContext } from "../components/Context/ParksContext"
import Display from "../components/Display"
import { useEffect } from "react"
import axios from "axios"

export default function Parks() {

    //change park from useContext to useParams so it stays when the page refreshes. 
    const {parkId} = useParams()
    const {getPark, setPark, park} = useContext(ParksContext)
    const [Park, SetPark] = useState(park)
    const parkCode = {parkCode: parkId}
    
    useEffect(() => {
        if (!park) {
            let newpark = getPark(parkCode)
            console.log(newpark)
        }
    }, [])
    console.log(park)
    
    return (
        park ? 
            <div className="ParkPage">
            <h1 className="parkName">{park.fullName}</h1>
            <img className="parkImage" src={park?.images[0]?.url}/>
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