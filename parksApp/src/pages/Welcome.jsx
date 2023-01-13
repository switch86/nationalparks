import React, {useContext} from "react" 
import Carousel from "../components/Carousel"
import Search from "../components/Search"
import DisplayPage from "./DisplayPage"
import {ParksContext} from "../components/Context/ParksContext"
import "../components/styles/Welcome.css"

export default function Welcome() {
    const {collection} = useContext(ParksContext)
    return (
        <div className="welcome">
            <Search />
            <DisplayPage 
                collection={collection}/>
        </div>
    )
}