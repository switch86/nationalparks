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
    favorites: []
}

const [userState, setUserState] = React.useState(initState)
console.log(userState.user)
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
            token: "",
            parks: []
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
    // function likePark(newPark) {
    //     // if (userState.parks.includes(park => park.parkCode === newPark.parkCode)) {
    //     //     userAxios.put(`http://localhost:9000/api/parks/${newPark.parkCode}`)
    //     //         .then(res => console.log(res))
    //     //         .catch(err => console.log(err))
    //     // } else {
    //         userAxios.post(`http://localhost:9000/api/parks/`, newPark) 
    //             .then(res => setUserState(prev => ({
    //                 ...prev, 
    //                 parks: [res.data],
    //                 likes: prev.likes +1,
    //             })))
    //             .catch(err => console.log(err))
    //     }
        // const getUserParks = () => {
        //     userAxios.get('http://localhost:9000/api/parks/user')
        //         .then(res => setUserParks([...res.data]))
        //         .catch(err => console.log(err.response.data.errMsg))
        // }    
    // useEffect(
    //     function getUserParks() {
    //     userAxios.get('http://localhost:9000/api/parks/user')
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }, []
    // )
    
    // function saveUserPark(parksArr) {
    //     if (userState.favorites.includes(parkCode)) {
    //         userState.favorites.filter(id => id != parkCode)
    //     } else (userState.favorites.push(parkCode))
    //     console.log(userState)
    //     userAxios.post(`http://localhost:9000/api/parks/user/${parkCode}`, userState)
    //         .then(res => setUserState(prev => ({
    //             ...prev, 
    //             favorites: res.data.favorites})))
    //         .catch(err => console.log(err))
    // }

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
            
        }}>
            {props.children}
        </UserContext.Provider>
    )
}