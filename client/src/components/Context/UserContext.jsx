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

// check credentials through signup route and save token and user to local storage
function signup(credentials) {
    axios.post("/auth/signup", credentials) 
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
    // send credentials to login route and save token and user to local storage from the response 
    function login(credentials) {
        axios.post("/auth/login", credentials) 
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
    // remove token and user from local storage
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: ""
        })
    }
    // if there is an error, add the message to userState 
    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }
    // remove the error message from userState 
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
            resetAuthErr,
            setUserState
            
        }}>
            {props.children}
        </UserContext.Provider>
    )
}