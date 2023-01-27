import {React, useContext} from "react"
import {UserContext} from "./Context/UserContext"
import "../components/styles/Display.css"
// import "../components/styles/Video.css"
import { ParksContext } from "./Context/ParksContext"
import DisplayCard from "./DisplayCard.jsx"
// import Parks from "../pages/Parks"

function Display(props) {
    const {park, setPark, collection} = useContext(ParksContext)
    const {savePark} = useContext(UserContext)
    
    function handleClick() {
        console.log(park)
        setPark(park)
    }
    function handleSave() {
        console.log(park)
        savePark(park)
    }

        return (
            <div className="Cards">
             {collection.map((park,index) => {
                return (
                    <DisplayCard
                    {...park}
                    handleClick={handleClick}
                    handleSave={handleSave}
                    key={index}
                    /> 
                )
             })}
                </div>
        )

}
export default Display