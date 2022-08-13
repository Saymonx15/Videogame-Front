import React from "react";
import style from './Card.module.css';

export default function Card({name, image, genres, id, platforms, rating}) {
    return (

        
        <div className={style.cards}>
            <div className={style.containerName}>
            <h3 className={style.name}>{name}</h3>
            </div>
            <div className={style.Cardimage}>
                <img className={style.image} src={image} alt={name} />
            </div>
            <div  className={style.cards} >
             
                <p className={style.genres}>Géneros: {genres.join(", ")}</p>


               

            </div>
        </div>
    );
}