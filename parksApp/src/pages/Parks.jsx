import {useContext} from "react"
import { ParksContext } from "../components/Context/ParksContext"

export default function Parks() {
    const {park} = useContext(ParksContext)
    console.log(park)
    return (
        <>
            
        </>
    )
}