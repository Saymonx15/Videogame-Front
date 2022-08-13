import axios from 'axios';

export function getVideogames(){
    return async dispatch => {
        var json = await axios('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        });
    }
}

export function getGenres(){
    return async dispatch => {
        var json = await axios('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        });
    }
}

export  function filterGameByGenre(payload) {
    
    return {
        type: 'FILTER_GAME_BY_GENRE',
        payload: payload
    }

}

export function filterCreatedBy(payload) {
    return {
        type: 'FILTER_CREATED_BY',
        payload: payload
}
}

export function orderBy(payload) {
    return {
        type: 'ORDER_BY',
        payload: payload
    }
}

export function filterbyRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload: payload
    }
}

export function ratingLow(payload){
    console.log(payload);
    return{
        type: "LOW_RATING",
        payload: payload
    }
}



export function getNameVideogames(payload) {
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${payload}`  )
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
            
        }
        catch (error) {
            console.log(error);
        }
       
    }

}

export function getDetailsVideogames(payload) {
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/videogame/${payload}`  )
            return dispatch({
                type: 'GET_DETAILS_VIDEOGAMES',
                payload: json.data
            })
            
        }
        catch (error) {
            console.log(error);
        }
       
    }
}
export function cleanDetails(){
    return{
        type: "CLEAN_DETAILS"
    }
}

export function postVideogame(payload){
    return async function (dispatch) {
        const data = await axios.post('http://localhost:3001/videogame', payload);
        console.log(data);
        return data
    }

}

export function addFavoritesGame(game){
    console.log(game.id);
       return{
        type: "ADD_FAVORITES_GAME",
        payload: game
    }
}
