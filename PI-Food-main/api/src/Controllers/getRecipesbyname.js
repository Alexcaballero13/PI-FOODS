const axios = require('axios')
const { Recipe } = require('../db')
const { Op } = require('sequelize')
const { API_KEY } = process.env;

async function getRecipesbyname (name) {

let Acumulator = []
const findnamebd = await Recipe.findAll({ where: { name:{[Op.iLike]:`%${name}%`} }})

Acumulator.push(...findnamebd)

let response = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
const filtered = response.data.results.filter(obj => obj.title.toLowerCase().includes(name.toLowerCase()) == true)    
if (filtered.length > 0){
    
    filtered.map(obj =>{
        const steps = []
        obj.analyzedInstructions.map(obj1 => obj1.steps.map(obj2 => steps.push(obj2.step)))    
        const objTest = {
        id: obj.id,
        name: obj.title,
        image: obj.image,
        summary: obj.summary,
        health_score: obj.healthScore,
        step_by_step: steps,
        diets: obj.diets 
        }
        Acumulator.push(objTest)
    } )
}

if (Acumulator.length > 0) return Acumulator
else throw new Error('There is not any recipe with that name')
}

module.exports = {
getRecipesbyname
}