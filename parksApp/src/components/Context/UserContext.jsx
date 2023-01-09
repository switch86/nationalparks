import React from "react"
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
    parks: []
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
        .catch(err => console.dir(err))
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
            .catch(err => console.dir(err))     
}
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            parks: []
        })
    }
    function savePark(newPark) {
        userAxios.post('http://localhost:9000/api/parks', newPark) 
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <UserContext.Provider
        value={{
            ...userState,
            signup,
            login,
            logout,
            savePark
        }}>
            {props.children}
        </UserContext.Provider>
    )
}