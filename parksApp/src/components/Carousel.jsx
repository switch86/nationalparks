// import axios from "axios"
// import { useEffect } from "react"
import {useState, useContext} from "react"
import Carousel from 'react-bootstrap/Carousel'
import { SearchContext } from "./Context/SearchContext"
import { ParksContext } from "./Context/ParksContext"
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
        
    return (

        <Carousel.Item>
                <img 
                    className="d-block w-100"
                    src={"img.url"}
                    alt={"altText"}
                    />
                <Carousel.Caption>
                    <h5>{"title"}</h5>
                    <span>Photographer: {"credit"}</span>
                    <p>{"caption"}</p>
                </Carousel.Caption>
            </Carousel.Item>
)    
    })
    

    return (
        <Carousel variant="dark">
        </Carousel>
    )
}