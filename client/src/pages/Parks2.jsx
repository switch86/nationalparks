// import React from "react"
// // import PropTypes from "prop-types"
// // import ReactPlayer from "react-player"
// // import VideoEmbed from "../assets/VideoEmbed"
// import { useContext } from "react"
// import { ParksContext } from "../components/Context/ParksContext"
// import { UserContext } from "../components/Context/UserContext"
// import {useParams} from "react-router-dom"
// // import "../components/styles/Video.css"

// export default function Video(props) {
//     const {parkId} = useParams()
//     const {park} = useContext(ParksContext)
//     const {savePark} = useContext(UserContext)
//     const video = collection.find(item => item.id === videoId)
//     setVideo(video)
//     function handleSubmit(event) {
//         event.preventDefault()
//         savePark(videoId)
//     } 

//     console.log(park)
//     console.log(parkId)
//     return (
//         <div className="videoPage">
//             <h1>{video.title}</h1>
//             <iframe className="videoWindow" src={`https://www.nps.gov/media/video/embed.htm?id=AE81211C-B8C2-4EA2-A8CE-0A5AFA531C2C`}></iframe>
//             <div className="text">
//                 <button onClick={handleSubmit}>Save</button>
//             <span>Video Description: </span>
//             <p>{video.description}</p>
//             </div>   
//         </div>
//     )

// }