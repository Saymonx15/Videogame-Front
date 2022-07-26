
const initialState = {
    videogames: [],
    filteredGames: [],
    stateAllVideogames: [],
   
}

function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                stateAllVideogames: action.payload
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

        case 'FILTER_CREATED_BY':
            const CreateFilter = action.payload === 'created' ? state.videogames.filter(el => el.createInDB) : state.stateAllVideogames.filter(el => !el.createInDB);
            return {
                ...state,
                videogames: action.payload === 'All' ? state.stateAllVideogames : CreateFilter,
               
            }
        case 'ORDER_BY':
            let filteredGames = state.filteredGames;
            if (filteredGames.length > 0) {
                let sortedGame = action.payload === 'asc' ?  state.filteredGames.sort((a, b) => {if(a.name > b.name){return 1;} if(a.name < b.name){return -1;} return 0;}) : state.filteredGames.sort((a, b) =>  {if(a.name > b.name){return -1;} if(a.name < b.name){return 1;} return 0;});
                return {
                    ...state,
                    filteredGames: sortedGame,
                    
                }
                
            }
            let sortedGame = action.payload === 'asc' ?  state.videogames.sort((a, b) => {if(a.name > b.name){return 1;} if(a.name < b.name){return -1;} return 0;}) : state.videogames.sort((a, b) =>  {if(a.name > b.name){return -1;} if(a.name < b.name){return 1;} return 0;});
            return {
                ...state,
                videogames: sortedGame,
                
            }

        default:
            return state;
            

    }
}

export default rootReducer;