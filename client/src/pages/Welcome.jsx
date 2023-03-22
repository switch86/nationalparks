import React, {useContext} from "react" 
import Search from "../components/Search"
import Display from "../components/Display"
import {ParksContext} from "../components/Context/ParksContext"
import "./styles/Welcome.css"

export default function Welcome() {
    const {collection, getSelectedParks} = useContext(ParksContext)
    React.useEffect(() => {
        getSelectedParks()
    }, [])
    
    return (
        <div className="welcome">
            <Search />
            <Display 
                collection={collection}/>
        </div>
    )
}