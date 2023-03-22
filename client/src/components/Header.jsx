import React, {useContext} from "react"
import { UserContext } from "./Context/UserContext"
import { Link} from "react-router-dom"
import "./styles/Header.css"

  export default function Header() {

    const  {logout} = useContext(UserContext)


    return (
    // <Router>
        <header>
            <h1>United States National Parks</h1>
          <div className="NavBar">
            <Link to="/" onClick={logout}><button>Log Out</button></Link>  
            <Link to="/Welcome"><button>Home</button></Link>
            <Link to="/Profile"><button>Profile</button></Link>
          </div>
        </header>

    )
  }
