import React from 'react';
import s from './Paginate.module.css'

export default function Paginado ({breedsPerPage, allBreeds, paginado}) { //por destructuring {} se lo paso como propiedades
    const pageNumbers = []  
    for (let i = 1; i <= Math.ceil(allBreeds/breedsPerPage); i++) {   
        pageNumbers.push(i);
    }

    return(   
        <nav className={s.Pagination}>  
         <ul className={s.pagination}>
          {pageNumbers?.map(number =>(   /* Si tengo paginas en el array pageNumber () mapealos y q devuelva cada numero del paginado */
             <li key={number}>
                 <button onClick={()=> paginado(number)} className={s.button}>{number}</button>
             </li>
          ))}
         </ul>
        </nav>
    )
}