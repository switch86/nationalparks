import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import UserProvider from './components/Context/UserContext'
import { SearchProvider } from './components/Context/SearchContext'
import './index.css'
import { ParksProvider } from './components/Context/ParksContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ParksProvider>
          <SearchProvider>
            <App /> 
          </SearchProvider>
        </ParksProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
