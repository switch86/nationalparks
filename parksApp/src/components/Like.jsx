import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';

export default function Like(props) {
    const {park, setPark} = useContext(ParksContext)
    const {parks, likePark} = useContext(UserContext)
    const [likes, setLikes] = useState("");
    const [isClicked, setIsClicked] = useState();
    // console.log(parks)
    
    if (park) {
        const match = parks.includes(park.parkCode)
        setLikes(park.likes)
        setIsClicked(match)
    }
    const handleClick = () => {
        if (isClicked) {
            setLikes(prev => prev - 1)
            setPark( prev => ({
               ...prev,
               likes: likes  
            }))
            parks.filter(current => current.parkCode != park.parkCode)
        } else {
            setLikes(prev => prev + 1)
            setPark( prev => ({
                ...prev,
                likes: likes  
             }))
            likePark(park)
        }
        setIsClicked(!isClicked);
    };

    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
        <span className="likes-counter">{ `Like | ${likes || 0}` }</span>
        </button>
    );
};
