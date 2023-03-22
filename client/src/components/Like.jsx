import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';
import "./styles/Like.css"


export default function Like(props) {
    const {parkCode, isSaved} = props
    const park = {...props}
    const {saveUserPark, updateUserPark, removeUserPark} = useContext(ParksContext)
    const { user, setUserState } = useContext(UserContext)
    const [isClicked, setIsClicked] = useState(user.favorites?.includes(parkCode) || false);
 
// when user clicks like button 
    const handleClick = () => {
        saveUserPark(park)
// first check that their favorites array exists and then see if it includes the park code 
        if (user.favorites?.includes(parkCode)) {
            // if it does, remove the user park that was passed in from props 
            // saveUserPark(props)
            //make a new favorites array with the contents of favorites filtered to remove the park code
            const newFavorites = [...user.favorites.filter(favorite => favorite != parkCode)]
            // create a new user object with new favorites array
            const newUser = {
                ...user,
                favorites: newFavorites
            }
            //save new user to local storage 
            localStorage.setItem("user", JSON.stringify(newUser))
            //update user state with the new user 
            setUserState(prev => ({
                ...prev, 
                user: newUser
            }))
        }
        //if their favorites list either doesn't exist or doesn't include this park code  
        else {
            // check if the park has been saved to the database 
            // if (!isSaved) {
            //     // if it hasn't, save it. 
            //     saveUserPark(props)
            // } else {
                // if it has, update it. 
            // saveUserPark(props)
            // create a new user object with park Code added to the favorites array
            const newUser = {
                ...user, 
                favorites: [...user.favorites, parkCode]
            }
            // save updated user to local storage
            localStorage.setItem("user", JSON.stringify(newUser))
            //set the User state to include the new user 
            setUserState(prev => ({
                ...prev, 
                user: newUser,
            }))
        }
        setIsClicked(isClicked => !isClicked)
    };


    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>Like</button>
        //  <span className="likes-counter">{ `Like | ${likes || 0}` }</span> 
        
    );
};
