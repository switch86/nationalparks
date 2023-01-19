import React, { useState, useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ParksContext } from './Context/ParksContext';

export default function Like(props) {
    const {park, setPark} = useContext(ParksContext)
    const {parks, likePark} = useContext(UserContext)
    // console.log(parks)
    const match = parks.includes(park.parkCode) 
    const [likes, setLikes] = useState(park.likes || 0 );
    const [isClicked, setIsClicked] = useState(match);
    
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
        <span className="likes-counter">{ `Like | ${likes}` }</span>
        </button>
    );
};
