import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, filterGameByGenre, filterCreatedBy, orderBy } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {

    const dispatch = useDispatch();
    
    const allGames = useSelector((state) => state.videogames);
    const allFilter = useSelector((state) => state.filteredGames);
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // setea la pagina actual
    const [gamesPerPage,setGamesPerPage] = useState(15); // setea cuantos games van a mostrar por pagina
    const indexOfLastGame = currentPage * gamesPerPage; // calcula el indice del ultimo game a mostrar en la pagina actual
    const indexOfFirstGame = indexOfLastGame - gamesPerPage; // calcula el indice del primer game a mostrar en la pagina actual
    const currentGames = allFilter.length > 0 ? allFilter.slice(indexOfFirstGame, indexOfLastGame) : allGames.slice(indexOfFirstGame, indexOfLastGame) // es la constante que contiene los games a mostrar en cada pagina (CLAVE: currentGames)

    const [genre, setGenre] = useState(""); // setea el genero a filtrar
    const [filteredGames, setFilteredGames] = useState([]); // setea los games filtrados por genero (CLAVE: filteredGames)
    const [filtered, setFiltered] = useState(false); // setea si hay games filtrados o no (CLAVE: filtered)

    

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

    useEffect(() => {
        dispatch(getVideogames());
    }, []);

    useEffect(() => {
        if (genre !== "") {
            dispatch(filterGameByGenre(genre));
            setFiltered(true);
        } else {
            setFiltered(false);
        }
    } ,[genre]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());

    }

    function handleFilterGenre(e){
        dispatch(filterGameByGenre(e.target.value));
        setGenre(e.target.value);
        setCurrentPage(1);
       

    }

    function handleFilterCreated(e){
        dispatch(filterCreatedBy(e.target.value));
        setOrder(e.target.value);
    }

    function handleOrderBy(e){
        e.preventDefault();
        dispatch(orderBy(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado por: ${e.target.value}`); // setea el orden de los games desde la pagina 1, es CLAVE: setOrder
    }

    return (
        <div className="container"> 
            <Link to="/videogame"> Crear Game</Link>
            <h1> Videogame</h1>
            <button onClick={e=>{handleClick(e)}}> Volver a cargar todos los videogames</button>
            <div>
                <select onChange={e => handleOrderBy(e)}>
                    <option value="asc"> Ascendente</option>
                    <option value="desc"> Descendente</option>
                </select>
                <select onChange={e=> { handleFilterGenre(e) }}> 
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

                <select onChange={e => {handleFilterCreated(e)}}>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
            
                <Paginado
                 gamesPerPage={gamesPerPage}
                 allGames={allGames.length}
                 allFilter= {allFilter.length} 
                 paginado={paginado} 
                    />

                 {  filteredGames.length > 0 ? allFilter.map((game) => {
                    return (
                        <div className="CardGame">
                            <Link to={`/videogame/${game.id}`}>
                            <Card key={game.id} name={game.name} image={game.image} genre={game.genre} />
                            </Link>
                        </div>
                    );
                } ) :                  
                currentGames?.map((game) => {
                    return (
                        <div className="CardGame">
                            <Link to={`/videogame/${game.id}`}>
                            <Card key={game.id} name={game.name} image={game.image} genre={game.genre} />
                            </Link>
                        </div>
                    );
                } )}
                
                
            </div>
        </div>

    );


}

// el primer select es para ordenar por nombre de manera ascendente o descendente. 
// el segundo select es para filtar por generos.
//el tercer select es para filtar por videogame, ya sea creados o de la api.