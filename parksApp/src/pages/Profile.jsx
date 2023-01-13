import {useContext} from "react"
import { UserContext } from "../components/Context/UserContext"
import Carousel from "../components/Carousel"

export default function Profile() {
    const { user} = useContext(UserContext)
    console.log(user)
    return (
        <>
        <h1>Welcome {user.username}!</h1>
        <section className="topSection">
                <Carousel />
        </section>
        </>
    )
}