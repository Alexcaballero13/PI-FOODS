import  { GET_ALL_RECIPES, GET_RECIPE_DETAIL, CLEAN_RECIPE_DETAIL, SEND_INFORMATION, GET_RECIPE_BY_NAME, ORDER_RECIPES, ORDER_BY_NAME, ORDER_BY_DIETS, ORDER_BY_DB_API } from './action-types';
import axios from 'axios'

export const getAllrecipes = () => {
    return async (dispatch) => {                           // solicitar info de la api implica devolver una funcion
        const response = await axios('http://localhost:3001/Recipes')
            return dispatch({ type: GET_ALL_RECIPES, payload: response.data })
        
    }
}

export const getRecipeDetail = (id) => {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/Recipes/${id}`)
        return dispatch({ type: GET_RECIPE_DETAIL, payload: response.data })
    }
}

export const cleanRecipeDetail = () => {
    return ({ type: CLEAN_RECIPE_DETAIL })
}

export const sendInformation = (name, image, summary, health_score, step_by_step, diets) => {
    return function(dispatch){
    axios.post('http://localhost:3001/Recipes', { name: name, image: image, summary: summary, health_score: health_score, step_by_step: step_by_step, diets: diets })
    .then((response)=>{
        console.log(response.data.message)
        return dispatch({ type: SEND_INFORMATION, payload: response.data.message })
    })
    }
}

export const getRecipeByName = (value) =>{
    return async (dispatch) => {                           
        const response = await axios(`http://localhost:3001/Recipes?name=${value}`)
            return dispatch({ type: GET_RECIPE_BY_NAME, payload: response.data })
        
    }
}

export const orderRecipes = (order) => {
    return ({ type: ORDER_RECIPES, payload: order })
}

export const orderbyName = (order) => {
    return ({ type: ORDER_BY_NAME, payload: order })
}

export const getOnlyDiets = (diets) => {
    return ({ type: ORDER_BY_DIETS, payload: diets })
}

export const getAPIorDB = (order) =>{
    return ({ type: ORDER_BY_DB_API, payload: order })
}