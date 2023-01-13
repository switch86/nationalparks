import React from "react" 
import Carousel from "../components/Carousel"
import Search from "../components/Search"
import DisplayPage from "./DisplayPage"
import "../components/styles/Welcome.css"

export default function Welcome() {

    return (
        <div className="welcome">
            <Search />
            <DisplayPage />
        </div>
    )
}