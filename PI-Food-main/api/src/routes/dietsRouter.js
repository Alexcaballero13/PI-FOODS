const dietsRouter = require('express').Router();
const { getDiets } = require('../Controllers/getDiets')

dietsRouter.get('/', async (req, res)=>{
    try {
        const obj = await getDiets()
        return res.status(200).json(obj)

    } catch (error) {
        return res.status(400).json({error: error.message})
    }

})



module.exports = dietsRouter;