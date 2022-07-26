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

export function filterGameByGenre(payload) {
    console.log(payload);
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
