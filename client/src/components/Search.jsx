import { useContext, useState } from "react"
import { SearchContext } from "./Context/SearchContext"
import { ParksContext } from "./Context/ParksContext"
import "./styles/Search.css"
// import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"


export default function Search() {
    const {stateCodes, selections, setSelections}  = useContext(SearchContext)
    const {getSelectedParks} = useContext(ParksContext)

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
        getSelectedParks(selections)
    }
    return (
        <div className="Search">
            <div>
                <h1>Explore our National Parks!</h1>
                <h2></h2>
            </div>
            <form className="selectionForm">
                <label htmlFor="stateCode">State Selection: </label>
                <select value={selections.stateCode ? selections.stateCode : ""} name="stateCode" onChange={handleChange}>
                    {stateCodeHtml}
                </select>
                <label htmlFor="q">Search Topic: </label>
                <input placeholder="Search Topic" value={selections.q || ""} type="text" name="q" id="q"onChange={handleChange}></input>
                    <button onClick={handleClick} className="searchButton">Search</button>
            </form>


        </div>
    )
}