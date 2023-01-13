import {React, useContext} from "react"
import Image from "react-bootstrap/Image"
// import ReactPlayer from "react-player"
import {UserContext} from "../components/Context/UserContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import "../components/styles/Display.css"
// import "../components/styles/Video.css"
import { ParksContext } from "../components/Context/ParksContext"

function DisplayPage(props) {
    const {setPark} = useContext(ParksContext)
    const {savePark} = useContext(UserContext)
    function handleClick(park) {
        console.log(park)
        setPark(park)
    }
    function handleSave(park) {
        console.log(park)
        savePark(park)
    }
    const imageHTML = props.collection.map((park) => {
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

                    <div key={id} onClick={() => handleClick(park)} className="Card">
                        <Link to={`/parks/${parkCode}`} >
                            <div key={parkCode} className="imageContainer">
                                <Image className="Image" src={images[0].url}  alt={images[0].description}/>    
                                <h1 className="Title">{fullName}</h1>
                                <h3 className="Description" id={parkCode} onClick={() => handleClick(park)}>{images[0].title}</h3>
                            </div>
                        </Link>
                        <button onClick={() => handleSave(park)}>Save</button>
                    </div>
                    )})
        return (
            <div className="Cards">
                {imageHTML}
                </div>
        )

}
export default DisplayPage