import React from 'react';
import style from './Paginado.module.css';

export default function Paginado({gamesPerPage, allGames, paginado, allFilter}){
    const pageNumber =[];

    if(allFilter > 0){
        for(let i = 1; i <= Math.ceil(allFilter / gamesPerPage); i++){
            pageNumber.push(i);
        }
        
    
    } else {

    for(let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++){
        pageNumber.push(i);
    }
    

}
    return(
       <nav>
              <ul className="pagination" >
                    {pageNumber && pageNumber.map(number => (
                        <li key={number} className={style.PaginadoLi}>
                            <button  onClick={() => paginado(number)}  className={style.PaginadoBtn}>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
        </nav>
    )
}

//     return pageNumber.map(number => {
//         return (
//             <li key={number} className="page-item">
//                 <a onClick={() => paginado(number)} href="!#" className="page-link">
//                     {number}
//                 </a>
//             </li>
//         );
//     }
//     );
// }
