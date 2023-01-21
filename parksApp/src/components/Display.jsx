import {React, useContext} from "react"
import Image from "react-bootstrap/Image"
// import ReactPlayer from "react-player"
import {UserContext} from "./Context/UserContext"
import {Link} from "react-router-dom"
import "../components/styles/Display.css"
// import "../components/styles/Video.css"
import { ParksContext } from "./Context/ParksContext"
import Like from "./Like"

function Display(props) {
    const {park, setPark, collection} = useContext(ParksContext)
    const {savePark} = useContext(UserContext)
    function handleClick() {
        console.log(park)
        setPark(park)
    }
    function handleSave() {
        console.log(park)
        savePark(park)
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

                    <div key={id}  className="Card">
                        <Link to={`/parks/${parkCode}`} onClick={() => handleClick(park)}>
                            <div key={parkCode} className="imageContainer">
                                <Image className="Image" src={images[0].url}  alt={images[0].description}/>    
                                <h1 className="Title">{fullName}</h1>
                                {/* <h3 className="Description" id={parkCode} onClick={() => handleClick(park)}>{images[0].title}</h3> */}
                            </div>
                        </Link>
                                <Like 
                                    park={park}
                                    // handleSave={handleSave}
                                    // park={park}
                                />
                        {/* <button onClick={() => handleSave(park)}>save</button> */}
                    </div>
                    )})
        return (
            <div className="Cards">
                {imageHTML}
                </div>
        )

}
export default Display