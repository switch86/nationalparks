import React, {useContext} from "react" 
import Search from "../components/Search"
import Display from "../components/Display"
import {ParksContext} from "../components/Context/ParksContext"
import "./styles/Welcome.css"

export default function Welcome() {
    const {collection} = useContext(ParksContext)
    return (
        <div className="welcome">
            <Search />
            <Display 
                collection={collection}/>
        </div>
    )
}