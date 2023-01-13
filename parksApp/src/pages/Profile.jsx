import {useContext} from "react"
import { UserContext } from "../components/Context/UserContext"
import Carousel from "../components/Carousel"
import DisplayPage from "./DisplayPage"

export default function Profile() {
    const { user} = useContext(UserContext)
    console.log(user)
    return (
        <div className="Profile">
        <section className="topSection">
            <div className="ProfileDetails">
                <h1>Welcome {user.username}!</h1>
            </div>
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