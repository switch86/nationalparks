import {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../components/Context/UserContext"
import { ParksContext } from "../components/Context/ParksContext"
import Carousel from "../components/Carousel"
import DisplayCard from "../components/DisplayCard"
import "./styles/Profile.css"



export default function Profile() {
    const { user} = useContext(UserContext)
  
    const { savedParks, getUserLikedParks} = useContext(ParksContext)

    // on page load, get all park objects from db
    useEffect(() => {
            getUserLikedParks()    
    } , [])

    
    
    return (
        <div className="Profile">
        <section className="topSection">
            <div className="ProfileDetails">
                <h1>Welcome @{user.username}!</h1>

            </div>
        </section>
        {user.favorites.length > 1? 

        <section className="bottomSection">
            {savedParks.map((park, index) => {
                return <DisplayCard {...park} key={index}/>
            })  }          
            
        </section>
        :
        <section className="bottomSection">
            <h1>Parks you have liked will appear below</h1>
            <h2>Please visit the <Link to="/Welcome">Home</Link> page to find and like new parks!  </h2>
        </section>
            
        }
        <Carousel />
        </div>
    )
}