import React, {useContext} from "react"
import { UserContext } from "./Context/UserContext"
import { Link} from "react-router-dom"
import "./styles/Header.css"

// import ImageCarousel from "./Carousel";

// import { useHorizontalScroll } from "../assets/useSideScroll"

  export default function Header() {

    const  {user , logout} = useContext(UserContext)
    console.log(user)
    return (
    // <Router>
        <header>
          <div className="NavBar">
            <h1>United States National Parks</h1>
            {
              user.username ? 
              <button onClick={logout}>logout</button>  
              :
              <Link to="/">Log In</Link>
            }
            <Link to="/Welcome">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/videos">All Videos</Link>
          </div>
              {/* <div className="CarouselContainer" ref={scrollRef}> */}
                {/* {carouselHtml} */}
              {/* </div> */}
            {/* <Link to="/saved">Saved</Link> */}
        </header>

    )
  }
