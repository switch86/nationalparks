import React, {useContext} from "react"
import { UserContext } from "./Context/UserContext"
import { Link} from "react-router-dom"
import "./styles/Header.css"

  export default function Header() {

    const  {logout} = useContext(UserContext)


    return (
    // <Router>
        <header>
          <div className="NavBar">
            <h1>United States National Parks</h1>
            <Link to="/" onClick={logout}>Log Out</Link>  
            <Link to="/Welcome">Home</Link>
            <Link to="/Profile">Profile</Link>
          </div>
        </header>

    )
  }
