
const initialState = {
    videogames: [],
    filteredGames: [],
    stateAllVideogames: [],
    genres:[],
    details: [],
    favorites: [],
}

function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
         
            return {
                ...state,
                videogames: action.payload,
                stateAllVideogames: action.payload,
                filteredGames: action.payload
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }

        case 'FILTER_GAME_BY_GENRE':
            const allGames = state.videogames;
           
            const genreFilter = action.payload === 'All' ? state.stateAllVideogames : allGames.filter(game => game.genres.includes(action.payload));

        return {
            ...state,
            filteredGames: genreFilter
        }
        case "LOW_RATING":
                const lowRating = state.videogames;
                const newLowRating = lowRating.filter(e => e.rating <= action.payload);
                 
        return{
            ...state,
            videogames:newLowRating,
            filteredGames: newLowRating
        }
        
        case 'FILTER_BY_RATING':
            if(action.payload === 'All'){
                return {
                    ...state,
                    filteredGames: state.stateAllVideogames,
                    videogames: state.stateAllVideogames
                }
            }
            
            const newRating = state.videogames;
            const newFilter = state.filteredGames;
            let filterRating;
            newRating.length > newFilter.length ? filterRating = newFilter : filterRating = newRating
            

           let sortByRating = action.payload === "Hight"
            ? filterRating.sort((a,b)=>{
                
                if(a.rating > b.rating){
                    return -1;
                }
                if(a.rating < b.rating){
                    return 1;
                }
                return 0;

            }): filterRating.sort((a,b)=>{

                if(a.rating > b.rating){
                    return 1;
                }
                if(a.rating < b.rating){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                filteredGames:sortByRating
               
             
        
        }      
        case 'FILTER_CREATED_BY':
            const gameCreated = state.videogames.filter(el => el.createInDB)
            const gameApi = state.stateAllVideogames.filter(el => !el.createInDB)
            const CreateFilter = action.payload === 'created' ? gameCreated : gameApi;
            const filterCreated = state.filteredGames.filter(el => CreateFilter.includes(el));
           console.log(state.videogames.filter(el => el.createInDB))
            return {
                ...state,
                videogames: action.payload === 'All' ? state.stateAllVideogames : CreateFilter,
                filteredGames: filterCreated               
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

        case 'GET_NAME_VIDEOGAMES':
            let nameVideogames = action.payload;
            let filteredGamesByName = [];
            for (let index = 0; index < nameVideogames.length; index++) {
                filteredGamesByName.push(nameVideogames[index])
            }
            return {
                ...state,
                filteredGames: filteredGamesByName
            }
            case 'POST_VIDEOGAME': //es necesario que este en el reducer, por mas que no haga nada en particular, ya que se crea en una ruta nueva. 
                return {
                    ...state,

                }
                case 'GET_DETAILS_VIDEOGAMES':
                    return {
                        ...state,
                        details: action.payload
                    }
                    case "CLEAN_DETAILS":
                        return{
                            ...state,
                            details:[]
                        }
                        case 'ADD_FAVORITES_GAME':
                        const favorites = state.favorites;
                        const newFavorites = favorites.includes(action.payload) ? favorites : [...favorites, action.payload];
                        
                        return {
                            ...state,
                            favorites: newFavorites
                        }
                 
        default:
            return state;
            

    }
}

export default rootReducer;