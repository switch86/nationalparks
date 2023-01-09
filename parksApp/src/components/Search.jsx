import { useContext, useState } from "react"
import { SearchContext } from "./Context/SearchContext"
import { ParksContext } from "./Context/ParksContext"
// import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"


export default function Search(props) {
    const {
        stateCodes}
  = useContext(SearchContext)
    const {handleSubmit} = useContext(ParksContext)
    const [selections, setSelections] = useState({})
    const stateCodeHtml = stateCodes.map((state, index) => {
        return (
                <option key={index} value={state.abbreviation}>{state.abbreviation} - {state.name}</option>
                )
            })


    function handleChange(event) {
        const {name, value} = event.target
        setSelections(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function handleClick(e) {
        e.preventDefault()
        console.log(selections)
        handleSubmit(selections)
    }
    return (
        <div className="Search">
            <div>
                <h1>Search!</h1>
                <h2>Please select from the options below</h2>
            </div>
            <form className="selectionForm">
                <label htmlFor="stateCode">State Selection: </label>
                <select value={selections.stateCode || ""} name="stateCode" onChange={handleChange}>
                    {stateCodeHtml}
                </select>
                {/* <label htmlFor="isPreRecorded">Video or Livestream: </label> */}
                {/* <select name="isPreRecorded" onChange={handleChange}>
                    <option value="true">Pre-Recorded Videos</option>
                    <option value="false">LiveStreamed Videos</option>
                </select> */}
                <label htmlFor="q">Search Topic: </label>
                <input placeholder="Search Topic" value={selections.q || ""} type="text" name="q" id="q"onChange={handleChange}></input>
                
            
                    <button onClick={handleClick} className="searchButton">Search</button>
            </form>


        </div>
    )
}