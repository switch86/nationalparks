import {useParams, useLocation} from "react-router-dom"
import {useContext} from "react"
import { ParksContext } from "../components/Context/ParksContext"
import  Like  from "../components/Like"
import { useEffect } from "react"
import "./styles/Parks.css"

const Parks = (props) => {

    //change park from useContext to useParams so it stays when the page refreshes. 
    const {park, getPark} = useContext(ParksContext)
    console.log(park)
    
    const {parkId} = useParams()
    const parkCode = {parkCode: parkId}
    
    // if park doesn't exist on page load, run get park with the parkCode from useParams. 
    useEffect(() => {
            getPark(parkCode)
    }, [])

    return (
        // if there is a park, return this page. 
    park ? 
    <div className="Park">
        <div className="ParkPage">
            <h1 className="parkName">{park.fullName}</h1>
            
            <img className="parkImage" src={park.images[0].url} alt={park.images[0].alt || ""}/>
            <Like {...park}/>    
                <div className="bottomSection">

                    <p>{park.description}</p>
            </div>
        </div>   
                    <div className="parkActivities">
                        <h5>Activities: </h5>
                            <ul>
                                {park.activities.map((activity, index) => {
                                    return(<li key={index}>{activity.name}</li>)
                                })}
                            </ul>
                    </div>
    </div>
    : 
    <>
    <p>There is no park</p>
    </>
    )
}

export default Parks