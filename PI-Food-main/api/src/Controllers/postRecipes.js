const { Recipe }= require('../db')
const { Diets } = require('../db')


async function postRecipes(name, image, summary, health_score, step_by_step, diets) {
    
if(name && image && summary && health_score && step_by_step){
    let array = []

    for (let num of diets){
        let variable = await Diets.findByPk(num)
        if (variable) array.push(variable.name)
        else break}
    
    if (array.length === 0) array = diets

    const insert = await Recipe.create({name, image, summary, health_score, step_by_step, diets: array})
    await insert.addDiets(diets)
}
else throw new Error('Missing or incorrect information')
}
module.exports = {
postRecipes
}