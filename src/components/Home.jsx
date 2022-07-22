import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames } from "../actions";
import Card from "./Card";

export default function Home() {

    const dispatch = useDispatch();

    const allGames = useSelector(state => state.videogames);

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);


    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());

    }

    return (
        <div className="container"> 
            <Link to="/videogame"> Crear Game</Link>
            <h1> Videogame</h1>
            <button onClick={e=> {handleClick(e)}}> Volver a cargar todos los videogames</button>
            <div>
                <select >
                    <option value="asc"> Ascendente</option>
                    <option value="desc"> Descendente</option>
                </select>
                <select> 
                    <option value="All"> All </option>
                    <option value="Adventure"> Adventure </option>
                    <option value="Puzzle"> Puzzle </option>
                    <option value="RPG"> RPG </option>
                    <option value="Shooter"> Shooter </option>
                    <option value="Action"> Action </option>
                    <option value="Indie"> Indie </option>
                    <option value="Platformer"> Platformer </option>
                    <option value="Masively Multiplayer"> Massively Multiplayer </option>
                    <option value="Sports"> Sports </option>
                    <option value="Racing"> Racing </option>
                    <option value="Simulation"> Simulation </option>
                    <option value="Arcade"> Arcade </option>
                    <option value="Fighting"> Fighting </option>
                </select>

                <select>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                { allGames?.map((game) => {
                    return (
                        <fragment className="CardGame">
                            <Link to={`/videogame/${game.id}`}>
                            <Card key={game.id} name={game.name} image={game.image} genre={game.genre} />
                            </Link>
                        </fragment>
                    );
                } )}
                
            </div>
        </div>

    );


}

// el primer select es para ordenar por nombre de manera ascendente o descendente. 
// el segundo select es para filtar por generos.
//el tercer select es para filtar por videogame, ya sea creados o de la api.