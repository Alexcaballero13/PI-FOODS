const axios = require('axios')
const { API_KEY } = process.env;
const { Recipe } = require('../db')

async function getRecipes() {
const OnlyWhatIneed = []
let recipedb = await Recipe.findAll()

let response = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

if(recipedb.length > 0) OnlyWhatIneed.push(...recipedb)

if(response.data.results.length > 0){

response.data.results.map(obj => {
    const steps = []
    obj.analyzedInstructions.map(obj1 => obj1.steps.map(obj2 => steps.push(obj2.step)))    
        const objTest = {
        id: obj.id,
        name: obj.title,
        image: obj.image,
        summary: obj.summary,
        diets: obj.diets,
        health_score: obj.healthScore,
        step_by_step: steps
        }
        OnlyWhatIneed.push(objTest)
    })
    return OnlyWhatIneed

}else{throw new Error('It was an error, please try later :(')}}
module.exports = {
getRecipes
}