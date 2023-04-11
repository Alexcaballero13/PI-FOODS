const axios = require('axios')
const { Diets } = require('../db')
const { API_KEY } = process.env;

async function getDiets(){

    let dietsdb = await Diets.findAll()

    if(dietsdb.length === 0){
        const Alldiets = []
        const response = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
        response.data.results.forEach(obj =>{
            Alldiets.push(...obj.diets)
        })
        const filtered = Alldiets.filter((obj, index)=> Alldiets.indexOf(obj)===index)

        if (filtered.length > 0){
            for (let name of filtered){
            await Diets.findOrCreate({where:{name}})}
        }

        let totaldietsDB = await Diets.findAll()
        return totaldietsDB
    }
    else return dietsdb
}

module.exports = { getDiets };