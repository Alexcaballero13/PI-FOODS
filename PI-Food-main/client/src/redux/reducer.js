import { GET_ALL_RECIPES, GET_RECIPE_DETAIL, CLEAN_RECIPE_DETAIL, SEND_INFORMATION, GET_RECIPE_BY_NAME, ORDER_RECIPES, ORDER_BY_NAME, ORDER_BY_DIETS, ORDER_BY_DB_API} from './action-types'


const initialState = {
    recipe: [],
    recipeDetail:{},
    message: '', 
    allrecipes: ''
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state, 
                recipe: action.payload,
                allrecipes: action.payload
            }

        case GET_RECIPE_DETAIL:
            return{
                ...state, 
                recipeDetail: action.payload
            }
        case CLEAN_RECIPE_DETAIL:
            return{
                ...state,
                recipeDetail:{}
            }
        case SEND_INFORMATION:
            return{
                ...state,
                message: action.payload
            }
        case GET_RECIPE_BY_NAME:
            return{
                ...state, 
                recipe: action.payload
                }
                
        case ORDER_RECIPES:
            let ordered = action.payload === 'Ascendent'?
            state.recipe.sort((a, b)=>{
                if(a.health_score > b.health_score){
                    return 1
                }
                if(a.health_score < b.health_score){
                    return -1
                }
                return 0;
            }):
            state.recipe.sort((a, b)=>{
                if(a.health_score > b.health_score){
                    return -1
                }
                if(a.health_score < b.health_score){
                    return 1
                }
                return 0;
            })
            return {
                ...state,
                recipe: ordered
            }

            case ORDER_BY_NAME:
                let ordername = action.payload === 'Ascendent'?
                state.recipe.sort((a, b)=> a.name.localeCompare(b.name)):
                state.recipe.sort((a, b)=> b.name.localeCompare(a.name))
                return {
                    ...state,
                    recipe: ordername
                }

            case ORDER_BY_DIETS:
                const array = []
                state.recipe.map(obj =>{
                    if (obj.diets.includes(action.payload)){
                        array.push(obj)
            }})
             return {
                ...state,
                recipe: array
            }  
            
            case ORDER_BY_DB_API:
                let orderapidb = action.payload === 'created'?
                state.allrecipes.filter(obj => obj.id.length === 36):
                state.allrecipes.filter(obj => obj.id.toString().length < 36)
             return {
                ...state,
                recipe: orderapidb
            }  
        default:
            return {...state};
    }
}

export default reducer;