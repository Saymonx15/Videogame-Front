import React from "react";
import { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {postVideogame,getGenres} from "../actions";
import { useDispatch, useSelector } from "react-redux";


function validate(formulario) {
    let errors = {};
    if (!formulario.name) {
        errors.name = "El nombre es requerido";
    } 
    if (formulario.description === "") {
        errors.description = "La descripcion es requerida";
    }
      if (formulario.rating < 0 || formulario.rating > 5) {
        errors.rating = "El rating debe estar entre 0 y 5";
    }
    return errors;
  
}



export default function VideogameCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); // se utiliza para redigir al usuario a una pagina
    const genres = useSelector((state) => state.genres);  // recordar que para obterner el state de redux debemos usar useSelector.
    const [errors, setErrors] = useState({});
    const [formulario, setFormulario] = useState({
        name: "",
        description: "",
        rating: "",
        image: "",
        released: "",
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
        setErrors(validate({
            ...formulario,
            [e.target.name]: e.target.value
        }));
        
        
      }
    
    const handleChangeGenre = (e) => {
        setFormulario({
            ...formulario,
            genres:[...formulario.genres, e.target.value]
        })
        setErrors(validate({
            ...formulario,
            [e.target.name]: e.target.value
        }));
        
    }
    const handleCheck = (e) => {
        if(e.target.checked) {
            setFormulario({
                ...formulario,
                platforms: [...formulario.platforms, e.target.value]
            })
        }
    } 

    const handleDeleteGenre = (el) => {
        setFormulario({
            ...formulario,
            genres: formulario.genres.filter(genre => genre !== el)
        })
        console.log(el)
    }




    let regexRating =/[+]?([0-9]*[.])?\b[0-5]{1,1}\b/;; 
    let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formulario.name){
            return alert('Complete el nombre del juego');
        }else if(!expReg.test(formulario.name)){
            return alert('Colocar solo letras y numeros en el nombre');
        }else if(!formulario.released){
            return alert('Colocar una fecha de lanzamiento');
        }else if(!regexRating.test(formulario.rating)) {
            return alert('Colocar un rating entre 0 y 5');
        }else if(!formulario.genres.length){
            return alert('Seleccionar al menos un genero');
        }else if(!formulario.platforms.length){
            return alert('Seleccionar al menos 1 plataforma');
        }else if(!formulario.description){
            return alert('Completar la descripcion');
        }
        dispatch(postVideogame(formulario));
        alert("Videojuego creado con exito");
        setFormulario({
            name: "",
            description: "",
            rating: "",
            image: "",
            released: "",
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
                    {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                    <label>Descripcion:</label>
                    <input type="text" name="description" onChange={(e) =>handleChange(e)}/>
                    {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                    <label>Rating:</label>
                    <input type="number"  name="rating" onChange={(e) =>handleChange(e)}/>
                    {errors.rating && <p style={{color: 'red'}}>{errors.rating}</p>}   
                    <label>Image:</label>
                    <input type="text" name="image" onChange={(e) =>handleChange(e)}/>
                    <label>Fecha de lanzamiento:</label>
                    <input type="date" name="released" onChange={(e) =>handleChange(e)}/>
                    <label>Generos:</label>
                    <div>
                     <select name="genres" onChange={(e) =>handleChangeGenre(e)}>
                        <option value="">Seleccione un genero</option>
                        {genres.map((genre) => {
                            return (<option key={genre.id} value={genre.name}>{genre.name} </option>                      
                            )
                        } )} 
                        </select>
                    </div>
                    
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
                
                    <button type="submit" >Crear Videogame</button>
   
                    </div>
            </form>
            {formulario.genres.map(el => 
                            <div>
                                <p>{el}</p>
                                <button  onClick={() => handleDeleteGenre(el)}>X</button>
                            </div>)}

            </div>
    )

}