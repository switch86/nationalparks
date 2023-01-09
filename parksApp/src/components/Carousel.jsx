// import axios from "axios"
// import { useEffect } from "react"
import { useContext} from "react"
import {Link} from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel'
// import { SearchContext } from "./Context/SearchContext"
import { ParksContext } from "./Context/ParksContext"
import "./styles/Carousel.css"


export default function ImageCarousel() {
    const {parksArray} = useContext(ParksContext)
    // const images = imagesArray.map(park => park.images[0])
    console.log(parksArray)
    // const [show, setShow] = useState(false)
    // function onClick() {
    //     setShow(!show)
    // }
    // const hover = {
    //     display: show ? "block" : "none"
    // }
    // const img = {
    //     backgroundImage: `url(${url})`
        
    // }
    // const img = images[0]
    const html = parksArray.map(park => {
    const image = park.images[0]    
    return (

        <Carousel.Item key={park.parkCode}>
            <Link to={`/parks/${park.parkCode}`}>
                <img 
                    className="d-block w-100"
                    src={image.url}
                    alt={image.altText}
                    />
                <Carousel.Caption>
                    <h5>{image.title}</h5>
                    <h4>{park.fullName}</h4>
                    <span>Photographer Credit: {image.credit}</span>
                    <p>{image.caption}</p>
                </Carousel.Caption>
            </Link>
            </Carousel.Item>
)    
    })
    

    return (
        <div className="CarouselContainer"> 
        <Carousel variant="light" interval="2000" className="Carousel">
            {html}
        </Carousel>
        </div>
    )
}