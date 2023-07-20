import React, { useContext} from 'react';
import {UserContext} from "./components/Context/UserContext"
import { Route, Routes, Navigate} from "react-router-dom"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Parks from "./pages/Parks"
import Welcome from "./pages/Welcome"
// import Video from "./pages/Video"
import Auth from "./pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const {token} = useContext(UserContext)
  return (
      <div className="App">
          { token && <Header />}
          <Routes>
            <Route 
            path="/" 
            element={
              token ? <Navigate to="/welcome" /> : <Auth />}>
          </Route>
            {/* <Route path="/parks" element={<Parks />}></Route> */}
          <Route 
              path="/parks/:parkId" 
              element={              
                <ProtectedRoute token={token} redirectTo="/">
                  <Parks />
                </ProtectedRoute>
              }
            >
          </Route>
          <Route 
              path="/welcome" 
              element={              
                <ProtectedRoute token={token} redirectTo="/">
                  <Welcome />
                </ProtectedRoute>}>
          </Route>
          <Route 
              path="/profile" 
              element={
              <ProtectedRoute token={token} redirectTo="/">
                <Profile />
              </ProtectedRoute>}>
          </Route>
          </Routes>
      </div>

        
  )
}

export default App;
