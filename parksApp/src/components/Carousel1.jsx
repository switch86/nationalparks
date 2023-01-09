// import axios from "axios"
// import { useEffect } from "react"
import {useState} from "react"

export default function Carousel(props) {
    const {url, title, altText, caption, credit} = props
    const [show, setShow] = useState(false)
    function onClick() {
        setShow(!show)
    }
    const hover = {
        display: show ? "block" : "none"
    }
    const img = {
        backgroundImage: `url(${url})`
        
    }
    return (
        <div className="Carousel" style={img} >
            <button onClick={onClick} className="Details">{show ? "Show Less" : "Details"}</button>
            <div style={hover} className="DetailsPanel">
            <h4 className="imageTitle">{title}</h4>
            {/* <img src={url} alt={altText}/> */}
            <span  className="hoverShow">Photographer: {credit}</span>
            <p  className="hoverShow">{caption}</p>
            </div>
        </div>
    )
}