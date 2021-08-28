require('dotenv').config();
const { GENRES_APIKEY } = process.env;
const { Temperament } = require('../db');  //Sin esto no funcionan findAll y resto de propiedades sequelize
const axios = require('axios');
const router = require('express').Router();


router.get('/temperaments', async (req, res) => {
 try {
  const temperamentsApi = await axios.get(`${GENRES_APIKEY}`);
  const temperaments = temperamentsApi.data;
   temperaments.forEach( el => {
       Temperament.findOrCreate({   //Si está no lo hace nada y si no está lo crea
        where: {name: el.name}
      })
  })
/*   const alltemperaments = await temperament.findAll(); //descomentar esto y reemplazarlo por L19 si quiero el force=false pq como ya lo tengo en la BD quiero que los encuentre no q los cree pq ya están creados
  res.status(200).send(alltemperaments) */
  res.status(200).json(temperaments)
 } catch (error) {
   console.log(error)
 }
})


module.exports = router;