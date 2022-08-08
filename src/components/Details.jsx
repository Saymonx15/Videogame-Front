 import React from "react";
import { useEffect } from "react";
import {Link, useParams } from "react-router-dom";
import { getDetailsVideogames, cleanDetails } from "../actions";
import { useDispatch, useSelector } from "react-redux";


export default function Details(){
    const dispatch = useDispatch();
    let {id}= useParams()


    useEffect(()=>{
        dispatch(getDetailsVideogames(id));
        dispatch(cleanDetails());
     
    },[dispatch,id])



const myDetails = useSelector((state) => state.details);

console.log(myDetails);
return (
    <div >
    {myDetails? <div>
        <h1>{myDetails.name}</h1>
        <img src={myDetails.image} alt={myDetails.name} width="600px" hight="600px"/>
        <div><strong>Sinopsis: </strong>{<p dangerouslySetInnerHTML={{__html: myDetails.description}}></p>}</div>
        <p><strong>Rating:</strong> {myDetails.rating} ✨</p>
        <p><strong>Fecha de Lanzamiento:</strong> {myDetails.released}</p>
        <p><strong>Generos: </strong>{myDetails.genres? myDetails.genres.map((genre)=> genre +" "): ""}</p>
        <p><strong>Plataformas:</strong> {myDetails.platforms? myDetails.platforms.map((platform)=> platform +" "): ""}</p>
    </div> : <div>Cargando...</div>}
        <Link to="/home"> <button>Volver</button> </Link>
    </div>
)
}
