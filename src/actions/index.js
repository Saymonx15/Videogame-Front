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