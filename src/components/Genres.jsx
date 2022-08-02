import React from 'react';


 const GenreSelector = ({GenresAll}) => {
     return(
            
            <>
                {
                    GenresAll?.map(el =>{
                        return(
                            <option key={el.id} value={el.name} >
                            
                                {
                                    el.name
                                }
                            </option>
                        )
                    })
                }
            </>
            
        )
        
        }

    export default GenreSelector;