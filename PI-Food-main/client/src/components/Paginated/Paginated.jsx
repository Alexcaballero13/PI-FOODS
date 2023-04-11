import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({recipesPerPage, recipe, paginated, current}){
    const pageNumbers = []

    for( let i=0; i<= Math.ceil(recipe/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav className={styles.Pages}>
            <button className={styles.buttonPages} onClick={()=> paginated(current-1)} disabled={current === 1}>{'prev'}</button>
            {pageNumbers && 
            pageNumbers.map(number=>(                  
                <button className={styles.buttonPages} onClick={()=> paginated(number)}> {number}</button>
            ))}
            <button className={styles.buttonPages} onClick={()=> paginated(current+1)} disabled={current === pageNumbers.length-1}>{'next'}</button>
        </nav>
    )
}