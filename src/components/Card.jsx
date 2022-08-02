import React from "react";

export default function Card({name, image, genres, id, platforms, rating}) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={name} height="400px" width="500px"/>
            </div>
            <div  className="card-content" >
                <h3>{name}</h3>
                <p>Géneros: {genres.join(", ")}</p>
                <p>Plataformas: {platforms.join("|| ")}</p>
                <p>Rating: {rating}</p>

               

            </div>
        </div>
    );
}