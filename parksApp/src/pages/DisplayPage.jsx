import {React, useContext} from "react"
// import ReactPlayer from "react-player"
import {SearchContext} from "../components/Context/SearchContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Video from "./Video"
import "../components/styles/Video.css"
import { ParksContext } from "../components/Context/ParksContext"

function DisplayPage(props) {
    const {collection, setPark} = useContext(ParksContext)
    
    function handleClick(park) {
        console.log(park)
        setPark(park)
    }
    const imageHTML = collection.map((park) => {
        const {parkCode, images, description, id, fullName} = park
    //     return {
    //         key: park.id,
    //         id: park.parkCode,  
    //         ...park.images[0]
    //     }
    // })
    // console.log(images)
    // const imageHTML = images.map((image, index) => {
    //         if(image.url) {
                return (
                    <div key={parkCode} className="imageContainer">
                        <Link to={`/parks/${parkCode}`} >
                            <h1>{fullName}</h1>
                            <div className="Image">
                            <h3 id={parkCode} onClick={() => handleClick(park)}>{images[0].title}</h3>
                            <img src={images[0].url}  alt={images[0].description}/>
                            </div>
                        </Link>
                    </div>
                    )})
        return (
            <>
                {imageHTML}
                </>
        )

}
export default DisplayPage