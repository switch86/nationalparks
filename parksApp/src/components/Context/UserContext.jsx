import React, {useEffect} from "react"
import axios from "axios"


export const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {

    const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "",

}

const [userState, setUserState] = React.useState(initState)

function signup(credentials) {
    axios.post("http://localhost:9000/auth/signup", credentials) 
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prev => ({
            ...prev,
            user,
            token 
        }))})
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    function login(credentials) {
        axios.post("http://localhost:9000/auth/login", credentials) 
            .then(res=> {
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({
                ...prev,
                user,
                token 
            }))})
            .catch(err => handleAuthErr(err.response.data.errMsg))     
}
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: ""
        })
    }
    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }
   
    return (
        <UserContext.Provider
        value={{
            ...userState,
            signup,
            login,
            logout,
            // getUserParks,
            // saveUserPark,
            resetAuthErr,
            setUserState
            
        }}>
            {props.children}
        </UserContext.Provider>
    )
}