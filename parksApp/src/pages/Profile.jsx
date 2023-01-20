import {useParams} from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../components/Context/UserContext"
import { ParksContext } from "../components/Context/ParksContext"
import Carousel from "../components/Carousel"
import DisplayPage from "../components/DisplayPage"

export default function Profile() {
    const { user} = useContext(UserContext)
    
    const getPark = useContext(ParksContext)
    console.log(user.parks)
    return (
        <div className="Profile">
        <section className="topSection">
            <div className="ProfileDetails">
                <h1>Welcome {user.username}!</h1>
                
            </div>
            <h1>Click the images to learn more about the parks below!</h1> 
            <Carousel />
        </section>
        {user.parks?
        <section className="bottomSection">
            <DisplayPage 
            collection={user.parks}/>
        </section>
        :
        <h1>You can save and view your favorite parks here!</h1>    
    }
        </div>
    )
}