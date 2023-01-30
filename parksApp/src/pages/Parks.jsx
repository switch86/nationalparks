import {useParams} from "react-router-dom"
import {useContext, useState} from "react"
import { ParksContext } from "../components/Context/ParksContext"

import { useEffect } from "react"


export default function Parks() {

    //change park from useContext to useParams so it stays when the page refreshes. 
    const {parkId} = useParams()
    const {getPark, park} = useContext(ParksContext)
   
    const parkCode = {parkCode: parkId}

    useEffect(() => {
        if (!park) {
            getPark(parkCode)
        }  
    }, [])
    
    return (
    park && 
        <div className="ParkPage">
        <h1 className="parkName">{park.fullName}</h1>
        <img className="parkImage" src={park.images[0].url}/>
        {park.activities.map((activity, index) => {
            return(<span key={index}>{activity.name}</span>)
        })}
        </div>

        
    )
}