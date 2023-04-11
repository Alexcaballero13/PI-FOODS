const axios = require('axios')
const { Recipe }= require('../db')
const { API_KEY } = process.env;

async function getRecipesbyid (id) {
    
    if(id.length === 36){
        const findid = await Recipe.findByPk(id)
        if(findid) return findid
        else throw new Error('There is not any recipe with that ID!')
    }else {
    let response = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
    const filtered = response.data.results.find(obj => obj.id === Number(id))

    if (filtered){
        const steps = []
        filtered.analyzedInstructions.map(obj1 => obj1.steps.map(obj2 => steps.push(obj2.step)))   
        const OnlyWhatIneed = {}
    
        OnlyWhatIneed.id = filtered.id
        OnlyWhatIneed.name = filtered.title
        OnlyWhatIneed.image = filtered.image
        OnlyWhatIneed.summary = filtered.summary
        OnlyWhatIneed.health_score = filtered.healthScore
        OnlyWhatIneed.step_by_step = steps
        OnlyWhatIneed.diets = filtered.diets

    return OnlyWhatIneed}
    else throw new Error('There is not any recipe with that ID')
}
}

module.exports = {
getRecipesbyid
}