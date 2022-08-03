import React from 'react';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ratingLow} from "../actions";


export default function FilterInputRating() {

    
    const dispatch = useDispatch();
    const [rating, setRating2] = useState("");

    


    function handleChange(e) {
        e.preventDefault();
        setRating2(e.target.value)
    }
    function handleClick(e) {
        e.preventDefault();
        dispatch(ratingLow(rating));
        setRating2("");
        
    }
   
  console.log(rating);


    return (
        <div className="filter-input-rating">
            <button type="submit" onClick={(e) => handleClick(e)}>Filtrar por Rating menor a ... </button>
            <input type="text" placeholder="Número con un decimal (.) ... " value={rating} onChange={e =>handleChange(e)} />
        </div>
    );
}