import {Link} from "react-router-dom"
// import {  useContext, useState } from 'react'
// import { UserContext } from './Context/UserContext'
// import { ParksContext } from "./Context/ParksContext"


export default function DisplayCard(props){
    // const {saveUserPark, savedParks} = useContext(ParksContext)
    // const { favorites } = useContext(UserContext)
    const {parkCode, images, description, id, fullName} = props

                return (

                    <div key={id}  className="Card">
                        <Link to={`/parks/${parkCode}`}>
                            <div key={parkCode} className="imageContainer">
                                <img className="Image" src={images[0].url}  alt={images[0].description}/>    
                                <h1 className="Title">{fullName}</h1>
                                {/* <h3 className="Description" id={parkCode} onClick={() => handleClick(park)}>{images[0].title}</h3> */}
                            </div>
                        </Link>

                                    {/* <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }> */}
                                    {/* <span className="likes-counter">{ `Like | ${likes || 0}` }</span> */}
                                    {/* </button> */}
                                {/* <Like 
                                    {...props}
                                    // handleSave={handleSave}
                                    // park={park}
                                /> */}
                        {/* <button onClick={() => handleSave(park)}>save</button> */}
                    </div>
                    )}
