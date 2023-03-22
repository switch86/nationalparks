import {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../components/Context/UserContext"
import { ParksContext } from "../components/Context/ParksContext"
import Carousel from "../components/Carousel"
import DisplayCard from "../components/DisplayCard"
import Like from "../components/Like"
import "./styles/Profile.css"



export default function Profile() {
    const { user} = useContext(UserContext)
  
    const { savedParks, getUserLikedParks} = useContext(ParksContext)
    console.log(savedParks)
    // on page load, get user liked parks for savedParks
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
        {savedParks.length > 0? 

        <section className="bottomSection">
            {savedParks.map((park, index) => {
                return <div key={index}>
                    <DisplayCard {...park} />
                    <Like {...park} />
                    </div>
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