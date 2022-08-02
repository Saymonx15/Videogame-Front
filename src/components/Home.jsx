import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, getGenres, filterGameByGenre, filterCreatedBy, orderBy, filterbyRating, ratingLow } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import GenreSelector from "./Genres";
import FilterInputRating from "./FilterRating";

export default function Home() {

    const dispatch = useDispatch();
    
    const allGames = useSelector((state) => state.videogames);
    const allFilter = useSelector((state) => state.filteredGames);
    const GenresAll = useSelector((state) => state.genres);


    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // setea la pagina actual
    const [gamesPerPage,setGamesPerPage] = useState(15); // setea cuantos games van a mostrar por pagina
    const indexOfLastGame = currentPage * gamesPerPage; // calcula el indice del ultimo game a mostrar en la pagina actual
    const indexOfFirstGame = indexOfLastGame - gamesPerPage; // calcula el indice del primer game a mostrar en la pagina actual
    const currentGames = allFilter.length > 0 ? allFilter.slice(indexOfFirstGame, indexOfLastGame) : allGames.slice(indexOfFirstGame, indexOfLastGame) // es la constante que contiene los games a mostrar en cada pagina (CLAVE: currentGames)



    const [filteredGames, setFilteredGames] = useState([]); // setea los games filtrados por genero (CLAVE: filteredGames)
    const [filtered, setFiltered] = useState(false); // setea si hay games filtrados o no (CLAVE: filtered)

    

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);


    useEffect( ()=>{
        dispatch(getGenres())
    },[dispatch])


    function handleClickAllGames(e){
        e.preventDefault();
        dispatch(getVideogames());
        setCurrentPage(1);
    }

    function handleFilterGenre(e){
        dispatch(filterGameByGenre(e.target.value));
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

    function handleFilterRating(e){
        dispatch(filterbyRating(e.target.value));
        setOrder(`Ordenado por: ${e.target.value}`); 
        setCurrentPage(1);
    }



    return (
        <div className="container"> 
            <Link to="/videogame"> Crear Game</Link>
            <h1> Videogame</h1>
            <button onClick={e=>{handleClickAllGames(e)}}> Volver a cargar todos los videogames</button>
            <FilterInputRating/>
            <SearchBar />
            <div>
                <select onChange={e => handleOrderBy(e)}>
                    <option value="asc"> Ascendente</option>
                    <option value="desc"> Descendente</option>
                </select>
                <select onChange={e=> { handleFilterGenre(e) }}> 
                    <option value="All"> All </option>
                    <GenreSelector GenresAll={GenresAll} />
                </select>

                <select onChange={e => {handleFilterCreated(e)}}>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                <select onChange={e => {handleFilterRating(e)}}>
                            <option value="All">Rating</option>
                            <option value="Hight">Hight Rating</option>
                            <option value="Low">Low Rating</option>
                    </select>
            
                <Paginado
                 gamesPerPage={gamesPerPage}
                 allGames={allGames.length}
                 allFilter= {allFilter.length} 
                 paginado={paginado} 
                    />

                 {  filteredGames.length > 0 ? allFilter.map((game) => {
                    return (
                        <div className="CardGame" key={game.id}>
                            <Link to={`/videogame/${game.id}`}>
                            <Card  name={game.name} image={game.image} genre={game.genres} platforms={game.platforms} rating={game.rating}/>
                            </Link>
                        </div>
                    );
                } ) :                  
                currentGames?.map((game) => {
                    return (
                        <div className="CardGame" key={game.id}>
                            <Link to={`/videogame/${game.id}`}>
                            <Card  name={game.name} image={game.image} genres={game.genres} platforms={game.platforms} rating={game.rating}/>
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