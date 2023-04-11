import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllrecipes, getRecipeByName, orderRecipes, orderbyName, getOnlyDiets, getAPIorDB } from "../../redux/actions";
import Recipes from "../Recipes/Recipes"
import Paginated from "../Paginated/Paginated";
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () =>{
    const Dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe)

    const [recipename, setRecipename] = useState('')
    const [order, setOrder] = useState('')
    const [orderbyname, setOrderbyname] = useState('')
    const [handlediets, setHandlediets] = useState('')
    const [handledbapi, setHandledbapi] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = recipe.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginated = (pageNumer) =>{
        setCurrentPage(pageNumer)
    }


    const handleOrder = (event)=>{
        event.preventDefault()
        Dispatch(orderRecipes(event.target.value))
        setOrder(`Ordenado ${event.target.value}`)
    }

    const handleOrderbyname = (event)=>{
        event.preventDefault()
        Dispatch(orderbyName(event.target.value))
        setOrderbyname(`Ordenado ${event.target.value}`)
        setCurrentPage(1)
    }

    const handleSearch = (event)=>{
        const value = event.target.value
        setRecipename(value)    
    }

    useEffect(()=>{
        Dispatch(getAllrecipes())
    }, [Dispatch])

    const handledietInput = (event) =>{
        event.preventDefault()
        Dispatch(getOnlyDiets(event.target.value))
        setHandlediets(`Ordenado ${event.target.value}`)
    } 

    const handleAPIDB = (event)=>{
        event.preventDefault()
        Dispatch(getAPIorDB(event.target.value))
        setHandledbapi(`Ordenado ${event.target.value}`)
    }

    return (

        <div className={styles.Home}>
            <nav className={styles.searchbar}>
               <h1 className={styles.titlesearchbar}> What recipe are you looking for? </h1> 
               <div className={styles.searchbarbutton}>
                    <input type="search" value={recipename} onChange={handleSearch} className={styles.inputsearch}/>
                    <button className={styles.buttonsearch} onClick={ ()=> Dispatch(getRecipeByName(recipename))}>Search</button>
                </div>
            </nav>

        <div className={styles.options}>
                <h2 className={styles.Theh3}>What is the order that you want to see the info? </h2>
                <h3 className={styles.Theh3}>By Health Score: </h3>
                <select name="select" onChange={handleOrder} className={styles.Selects}>
                <option value="Ascendent">Ascendent</option>
                <option value="Descendent">Descendent</option>
                </select>
                <h3 className={styles.Theh3}>By Alphabetical order: </h3>
                <select name="select" onChange={handleOrderbyname} className={styles.Selects}>
                <option value="Ascendent">Ascendent</option>
                <option value="Descendent">Descendent</option>
                </select>
                <h3 className={styles.Theh3}>By Diets:  </h3> 
                <select name="select" onChange={handledietInput} className={styles.Selects}> 
                <option value="dairy free">dairy free</option> 
                <option value="lacto ovo vegetarian">lacto ovo vegetarian</option> 
                <option value="vegan">vegan</option> 
                <option value="paleolithic">paleolithic</option> 
                <option value="primal">primal</option> 
                <option value="whole 30">whole 30</option> 
                </select>
        </div>
        <div className={styles.options}>
            <h3 className={styles.Theh3}>Do you want to see recipes from...?  </h3>
            <select name="select" onChange={handleAPIDB} className={styles.Selects}>
                    <option value="created">Your creation</option>
                    <option value="FromApi">Api</option>
            </select>
        </div>
                <div className={styles.Buttonrestart}>
                    <button className={styles.Buttonrestart1} onClick={()=> Dispatch(getAllrecipes()) }>Reset all recipes</button>
                </div>
        <div>

            <div className={styles.recipes}>
            {currentRecipes?.map(recipes =>{
                return <Recipes
                key={recipes.id}
                id={recipes.id}
                image={recipes.image}
                name={recipes.name}
                Diets={recipes.diets}/>   
                })}
            </div>
        </div>
        <div className={styles.linkform}>
            <h2 className={styles.fourH2}>Do you want to create a recipe? Created now!</h2>
            <Link to={'/Form'}>
            <button className={styles.Buttontoforms}> Create recipe</button>
            </Link>
        </div>
        <footer className={styles.footer}>
        <Paginated 
            recipesPerPage={recipesPerPage}
            recipe={recipe.length}
            paginated ={paginated}
            current ={currentPage}/>
        </footer>
        </div>
        
    )
}

export default Home
