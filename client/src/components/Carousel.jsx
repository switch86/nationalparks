import { useContext, useState} from "react"
import {Link} from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import { ParksContext } from "./Context/ParksContext"
import "./styles/Carousel.css"
import { useEffect } from "react"


export default function ImageCarousel() {
    // import parksArray
    const {parksArray, getAllParks} = useContext(ParksContext)

    useEffect(() => {
        getAllParks()
    }, [])
    // controls caption hover effect 
    const [show, setShow] = useState(false)
    function hoverShow() {
        setShow(!show)
    }
    const hover = {
        display: show ? "block" : "none"
    }

    // map through parksArray and return a carousel item for each park 
    const html = parksArray.map(park => {
    const image = park.images[0]    
    return (
        <Carousel.Item key={park.parkCode}>
            <Link to={`/parks/${park.parkCode}`}>
                <img 
                    className="d-block w-100 CarouselImage"
                    src={image.url}
                    alt={image.altText}
    
                    />
                <Carousel.Caption style={hover}>
                    {/* <h5>{image.title}</h5> */}
                        <h4>{park.fullName}</h4>
                        <span>Photographer Credit: {image.credit}</span>
                    {/* <p>{image.caption}</p> */}
                </Carousel.Caption>
            </Link>
            </Carousel.Item>
)    
})

// return carousel with all carousel items from above
return (
    <div className="CarouselContainer" >
        <div className="Carousel" onMouseEnter={hoverShow} onMouseLeave={hoverShow}>
        <Carousel  
            interval="2000"
            >
            {html}
        </Carousel>
        </div>
        </div>
    )
}