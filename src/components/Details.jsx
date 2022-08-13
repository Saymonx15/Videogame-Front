 import React from "react";
import { useEffect } from "react";
import {Link, useParams, useHistory } from "react-router-dom";
import { getDetailsVideogames, cleanDetails, addFavoritesGame } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Details.module.css";
import Favorites from "./Favorites";

export default function Details(){
    const dispatch = useDispatch();
    let {id}= useParams()


    useEffect(()=>{
        dispatch(getDetailsVideogames(id));
        dispatch(cleanDetails());
     
    },[dispatch,id])

const myDetails = useSelector((state) => state.details);
const favorites = useSelector((state) => state.favorites);
const history = useHistory();



const handleAddFavorite = (e) => {
    e.preventDefault();
    dispatch(addFavoritesGame(myDetails));
}



return (
    <div className={styles.container} key={myDetails.id} >
        <div className={styles.containerFav} key={myDetails.id}>
        <h1 className={styles.titleFav}> Favoritos</h1>    
        {favorites.length > 3 ? alert("No puedes tener mas de 3 favoritos") &&  history.push("/home") : <Favorites  myDetails={id}/>}
        
        </div>
    {myDetails? <div className={styles.Detailgame}>
        <h1 className={styles.name}>{myDetails.name}</h1>
        <img  className={styles.image}  src={myDetails.image} alt={myDetails.name} width="600px" hight="600px"/>
        <div className={styles.description}><strong>Sinopsis: </strong>{<p dangerouslySetInnerHTML={{__html: myDetails.description}}></p>}</div>
        <p className={styles.rating}><strong>Rating:</strong> {myDetails.rating} ✨</p>
        <p className={styles.released}><strong>Fecha de Lanzamiento:</strong> {myDetails.released}</p>
        <p className={styles.genre}><strong>Generos: </strong>{myDetails.genres? myDetails.genres.map((genre)=> genre +" "): ""}</p>
        <p className={styles.platforms}><strong>Plataformas:</strong> {myDetails.platforms? myDetails.platforms.map((platform)=> platform +" "): ""}</p>
    </div> : <div className={styles.container} >Cargando...</div>}
    <div className={styles.buttons}>
        <button className={styles.button} onClick={handleAddFavorite}>Agregar a Favoritos</button>
        
        <Link to="/home"> <button  className={styles.button}>Volver</button> </Link>
    </div>
       
    </div>
)
}
