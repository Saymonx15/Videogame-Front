
const initialState = {
    videogames: [],
    filteredGames: []
   
}

function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }
        case 'FILTER_GAME_BY_GENRE':
            const allGames = state.videogames;
            let allFilteredGames = [];
             if(action.payload === 'All') {
                 allFilteredGames = allGames;
            } else {
             for (let index = 0; index < allGames.length; index++) {
                  allGames[index].genre.forEach(element => {
                    if (element === action.payload) {
                        allFilteredGames.push(allGames[index])
                    }
                }
                )
            }
        }
        return {
            ...state,
            filteredGames: allFilteredGames
        }

        default:
            return state;
            

    }
}

export default rootReducer;