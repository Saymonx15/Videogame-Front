import React from "react";
import { useEffect } from "react";
import {Link, useParams } from "react-router-dom";
import {  addFavoritesGame, getDetailsVideogames, cleanDetails } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Favorites.module.css";



export default function Favorites(){
  
    let {id}= useParams()

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetailsVideogames(id));
        dispatch(cleanDetails());
     
    },[dispatch,id])
     
    const favorites = useSelector((state) => state.favorites);
    const allGames = useSelector((state) => state.videogames);

    const handleDetails = (e) => {
        e.preventDefault();
        dispatch(getDetailsVideogames(e.target.value));
        dispatch(cleanDetails());
    }
    console.log(id)

    return (
        <div className={styles.AllFavoritesContainer}>
            <div>
                {favorites.map((game)=>{
                   
                    return (
                        <div  >
                            <div>
                                 <img  src={game.image} alt={game.name} width="250px" height="150px" /> 
                                <div>
                                <Link to={`/videogame/${id}`}>
                                    <p className={styles.namefav} >{game.name}</p>
                                </Link>
                                </div>
                            </div>
                        </div>
                    )
                } )}
            </div>
        </div>
    )
}