import React, { useContext} from 'react';
import {UserContext} from "./components/Context/UserContext"
import { Route, Routes, Navigate} from "react-router-dom"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Parks from "./pages/Parks"
import DisplayPage from './pages/DisplayPage';
import Welcome from "./pages/Welcome"
// import Video from "./pages/Video"
import Auth from "./pages/Auth"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const {token} = useContext(UserContext)
  return (
      <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={token ? <Navigate to="/profile" /> : <Auth />}></Route>
            {/* <Route path="/parks" element={<Parks />}></Route> */}
            <Route path="/parks/:parkId" element={token ? <Parks /> : <Auth />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            {/* <Route path="/videos/:videoId" element={<Video />}></Route> */}
            {/* <Route path="/livestreams" element={<LiveStreams />}></Route> */}
          </Routes>
      </div>

        
  )
}

export default App;
