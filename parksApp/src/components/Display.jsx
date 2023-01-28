import {React, useContext, useEffect} from "react"
import {UserContext} from "./Context/UserContext"
import "../components/styles/Display.css"
// import "../components/styles/Video.css"
import { ParksContext } from "./Context/ParksContext"
import DisplayCard from "./DisplayCard.jsx"
import Like from "./Like"
// import Parks from "../pages/Parks"

export default function Display(props) {
    const {collection } = props
    
    const {getAllLikedParks, allLikedParks} = useContext(ParksContext)
    // const {savePark} = useContext(UserContext)
    
    useEffect(() => {
        getAllLikedParks()  
          }, [])  
    
    // function handleClick(parkCode) {
    //     console.log(park)
    //     getPark(parkCode)
    // }
    // function handleSave() {
    //     console.log(park)
    //     savePark(park)
    // }

        return (
            <div className="Cards">
             {collection.map((park,index) => {
                let isSaved = allLikedParks.includes(park.parkCode)
                console.log(isSaved)
                return (
                    <div key={index}>
                    <DisplayCard
                        {...park}
                    /> 
                    <Like 
                        {...park}
                        isSaved={isSaved} 
                    />
                    </div>
                )
             })}
            </div>
        )

}
