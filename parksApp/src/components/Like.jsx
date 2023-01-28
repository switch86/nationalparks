import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';
import "./styles/Like.css"

export default function Like(props) {
    const {parkCode} = props
    const {saveUserPark} = useContext(ParksContext)
    const { user, setUserState } = useContext(UserContext)
    const [isClicked, setIsClicked] = useState(user.favorites.includes(parkCode));
    console.log(parkCode)

    const handleClick = () => {
        if (isClicked) {
            // let updated = favorites.filter(current => current.parkCode != parkCode)
            removeUserPark(parkCode)
            setUserState(prev => ({
                ...prev, 
                user: {
                    ...prev.user,
                    favorites: user.favorites.filter(favorite => favorite != parkCode)
                }
            }))
        } else {
            saveUserPark(parkCode)
            setUserState(prev => ({
                ...prev, 
                user: {
                    ...prev.user,
                    favorites: [...prev.user.favorites, parkCode]
                }
            }))
        }
        setIsClicked(!isClicked);
    };

    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>Like</button>
        //  <span className="likes-counter">{ `Like | ${likes || 0}` }</span> 
        
    );
};
