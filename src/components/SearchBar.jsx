import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNameVideogames} from "../actions";


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    


 
    function handleChange(e) {
     e.preventDefault();
       setName(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getNameVideogames(name));
        setName("");
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Buscar Name" value={name}  onChange={(e) => handleChange(e)} />
            <button type="submit" onClick={(e) => handleClick(e)}>Search</button>
        </div>
    )

}