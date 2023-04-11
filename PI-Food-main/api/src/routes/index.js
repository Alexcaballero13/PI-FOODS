const { Router } = require('express');
// Importar todos los routers;
const recipeRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter')


const router = Router();

// Configurar los routers
router.use('/recipes', recipeRouter);
router.use('/diets', dietsRouter);


module.exports = router;
