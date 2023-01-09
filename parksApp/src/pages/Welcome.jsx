import React from "react" 
import Carousel from "../components/Carousel"
import Search from "../components/Search"
import DisplayPage from "./DisplayPage"

export default function Welcome() {

    // const html = imageArray.map
    return (
        <div className="welcome">
            <Carousel />
            <Search />
            <DisplayPage />
        </div>
    )
}