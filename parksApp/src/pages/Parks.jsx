import {useParams} from "react-router-dom"
import {useContext} from "react"
import { ParksContext } from "../components/Context/ParksContext"
import Display from "../components/Display"
import { useEffect } from "react"
import axios from "axios"

export default function Parks() {

    //change park from useContext to useParams so it stays when the page refreshes. 
    const {parkId} = useParams()
    const {getPark, setPark, park} = useContext(ParksContext)
    const parkCode = {parkCode: parkId}
    console.log(park)
    
    useEffect(() => {
        if (!park) {
            setPark(getPark(parkCode))
        }
    }, [])

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