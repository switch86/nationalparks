import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';
import "./styles/Like.css"

export default function Like(props) {
    const {parkCode, isSaved} = props
    const {saveUserPark, updateUserPark, removeUserPark} = useContext(ParksContext)
    const { user, setUserState } = useContext(UserContext)
    const [isClicked, setIsClicked] = useState(user.favorites.includes(parkCode));
    console.log(isSaved)

    const handleClick = () => {
        if (user.favorites.includes(parkCode)) {
            removeUserPark(props)
            const newFavorites = [...user.favorites]
            const newUser = {
                ...user,
                favorites: newFavorites.filter(favorite => favorite != parkCode)
            }
            setUserState(prev => ({
                ...prev, 
                user: newUser
            }))
            localStorage.setItem("user", JSON.stringify(newUser))
        }
        else {
            if (!isSaved) {
                saveUserPark(props)
            } else {
                updateUserPark(props)
            }
            const newUser = {
                ...user, 
                favorites: [...user.favorites, parkCode]
            }
            setUserState(prev => ({
                ...prev, 
                user: newUser,
            }))
            localStorage.setItem("user", JSON.stringify(newUser))
        }

    };

    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>Like</button>
        //  <span className="likes-counter">{ `Like | ${likes || 0}` }</span> 
        
    );
};
