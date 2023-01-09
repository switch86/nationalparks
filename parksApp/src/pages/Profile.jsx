import {useContext} from "react"
import { UserContext } from "../components/Context/UserContext"

export default function Profile() {
    const { user} = useContext(UserContext)
    console.log(user)
    return (
        <>
        <h1>Welcome {user.username}!</h1>
        </>
    )
}