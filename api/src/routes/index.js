const { Router } = require('express');
const breedRoutes = require('./Breed');
const temperamentRoutes = require('./Temperament');
//const router = express.Router
//const express = require ('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", breedRoutes) 
router.use("/", temperamentRoutes)


module.exports = router;
