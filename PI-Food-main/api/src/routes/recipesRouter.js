const { getRecipesbyid } = require('../Controllers/getRecipesbyid');
const { getRecipesbyname } = require('../Controllers/getRecipesbyname')
const { getRecipes } = require('../Controllers/getRecipes')
const { postRecipes } = require('../Controllers/postRecipes')

const recipesRouter = require('express').Router();


recipesRouter.get('/:idRecipe', async (req, res)=>{
    const { idRecipe } = req.params

    try {
        if(idRecipe) {
        const obj = await getRecipesbyid(idRecipe)
        return res.status(200).json(obj)
        }
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})

recipesRouter.get('/', async (req, res)=>{
    const { name } = req.query
    try {
        if(name){
        const obj = await getRecipesbyname(name)
        return res.status(200).json(obj)    
        }
        else{
            const obj = await getRecipes()
            return res.status(200).json(obj)
        }

    } catch (error) {
       return res.status(404).json({error: error.message}) 
    }
})

recipesRouter.post('/', async (req, res)=>{
    const {name, image, summary, health_score, step_by_step, diets} = req.body
    try {
        await postRecipes(name, image, summary, health_score, step_by_step, diets)
        return res.status(200).json({'message': 'The recipe was added to the database successfully!'})
    } catch (error) {
        return res.status(404).json({error: error.message}) 
    }
})

module.exports = recipesRouter;