import {Link} from "react-router-dom"
import {  useContext, useState } from 'react'
import { UserContext } from './Context/UserContext'
import Image from "react-bootstrap/Image"
import Like from "./Like"

export default function DisplayCard(props){
    const [isClicked, setIsClicked] = useState(false);
    const { favorites, saveUserPark} = useContext(UserContext)
    const {parkCode, images, description, id, fullName} = props

    const handleClick = () => {
        saveUserPark(parkCode)   
        setIsClicked(!isClicked);
    };

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
                                <img className="Image" src={images[0].url}  alt={images[0].description}/>    
                                <h1 className="Title">{fullName}</h1>
                                {/* <h3 className="Description" id={parkCode} onClick={() => handleClick(park)}>{images[0].title}</h3> */}
                            </div>
                        </Link>
                                    <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
                                    {/* <span className="likes-counter">{ `Like | ${likes || 0}` }</span> */}
                                    </button>
                                {/* <Like 
                                    {...props}
                                    // handleSave={handleSave}
                                    // park={park}
                                /> */}
                        {/* <button onClick={() => handleSave(park)}>save</button> */}
                    </div>
                    )}
