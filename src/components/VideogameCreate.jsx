import React from "react";
import { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {postVideogame,getGenres} from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); // se utiliza para redigir al usuario a una pagina
    const genres = useSelector((state) => state.genres);  // recordar que para obterner el state de redux debemos usar useSelector.
    

    const [formulario, setFormulario] = useState({
        name: "",
        description: "",
        rating: "",
        image: "",
        fechadelanzamiento: "",
        genres: [],
        platforms: [],
    
    })

    useEffect( () => {
        dispatch(getGenres());
    } , []);
    
    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }
    
    const handleChangeGenre = (e) => {
        setFormulario({
            ...formulario,
            genres:[...formulario.genres, e.target.value]
        })
    }
    const handleCheck = (e) => {
        if(e.target.checked) {
            setFormulario({
                ...formulario,
                platforms: [...formulario.platforms, e.target.value]
            })
        }
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formulario);
        dispatch(postVideogame(formulario));
        alert("Videojuego creado con exito");
        setFormulario({
            name: "",
            description: "",
            rating: "",
            image: "",
            fechadelanzamiento: "",
            genres: [],
            platforms: [],
        })
        history.push("/home");
    }


    return(
        <div className="container">
            <Link to='/home'> <button> Volver </button></Link>
            <h1>Crear un nuevo videojuego</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" onChange={(e) =>handleChange(e)}/>
                    <label>Descripcion:</label>
                    <input type="text" name="description" onChange={(e) =>handleChange(e)}/>
                    <label>Rating:</label>
                    <input type="number" name="rating" onChange={(e) =>handleChange(e)}/>
                    <label>Image:</label>
                    <input type="text" name="image" onChange={(e) =>handleChange(e)}/>
                    <label>Fecha de lanzamiento:</label>
                    <input type="date" name="fechadelanzamiento" onChange={(e) =>handleChange(e)}/>
                    <label>Generos:</label>
                    <select name="genres" onChange={(e) =>handleChangeGenre(e)}>
                        <option value="">Seleccione un genero</option>
                        {genres.map((genre) => {
                            return (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            )
                        } )}
                    </select>
                    <label>Plataformas:</label>
                    <label><input type="checkbox" name="platforms" value="PC" onChange={(e) => handleCheck(e)}/>PC</label>
                    <label><input type="checkbox" name="platforms" value="Playstation" onChange={(e) => handleCheck(e)}/>Playstation</label>
                    <label><input type="checkbox" name="platforms" value="Xbox" onChange={(e) => handleCheck(e)}/>Xbox</label>
                    <label><input type="checkbox" name="platforms" value="Nintendo" onChange={(e) => handleCheck(e)}/>Nintendo</label>
                    <label><input type="checkbox" name="platforms" value="Switch" onChange={(e) => handleCheck(e)}/>Switch</label> 
                    <label><input type="checkbox" name="platforms" value="Android" onChange={(e) => handleCheck(e)}/>Android</label>
                    <label><input type="checkbox" name="platforms" value="IOS" onChange={(e) => handleCheck(e)}/>IOS</label>
                    <label><input type="checkbox" name="platforms" value="macOS" onChange={(e) => handleCheck(e)}/>macOS</label>
                    <label><input type="checkbox" name="platforms" value="Linux" onChange={(e) => handleCheck(e)}/>Linux</label>

                    <ul><li>{formulario.genres.map(el => el + ' ,' )}</li></ul>

                    <button type="submit" onSubmit={(e) => handleSubmit(e)}>Crear Videogame</button>




                        
                        
                    </div>
            </form>

            </div>
    )

}