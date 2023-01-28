import {useParams} from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../components/Context/UserContext"
import { ParksContext } from "../components/Context/ParksContext"
import Carousel from "../components/Carousel"
import Display from "../components/Display"
import "./styles/Profile.css"

export default function Profile() {
    const { user} = useContext(UserContext)
    console.log(user.favorites)
    const {getParks, park, getUserLikedParks} = useContext(ParksContext)
    const collection = []
    // user.favorites.map(favorite => {
    //         favorite = { parkCode : favorite }
    //         const newPark = getParks(favorite)
    //         console.log(newPark)        
    //         // collection.push(newPark)
    // })
    
    console.log(collection)
    return (
        <div className="Profile">
        <section className="topSection">
            <div className="ProfileDetails">
                <h1>Welcome {user.username}!</h1>
                
            </div>
            <h1>Click the images to learn more about the parks below!</h1> 
            <Carousel />
        </section>
        {user.favorites.length > 1?
        <section className="bottomSection">
            {/* <Display 
            collection={collection}/> */}
        </section>
        :
        <h1>You can save and view your favorite parks here!</h1>    
    }
        </div>
    )
}