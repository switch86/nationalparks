import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';
import "./styles/Like.css"

export default function Like(props) {
    const {parkCode} = props
    const { favorites, saveUserPark} = useContext(UserContext)
    const [isClicked, setIsClicked] = useState();
    // console.log(park)
    console.log(favorites)
    if (parkCode) {
        const match = favorites.includes(parkCode)
        setIsClicked(match)
    }
    const handleClick = () => {
        if (isClicked) {
            // let updated = favorites.filter(current => current.parkCode != parkCode)
            removeUserPark(parkCode)
        } else {
            saveUserPark(parkCode)
        }
        setIsClicked(!isClicked);
    };

    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>Like</button>
        //  <span className="likes-counter">{ `Like | ${likes || 0}` }</span> 
        
    );
};
