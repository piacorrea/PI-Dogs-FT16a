require('dotenv').config();
const { URL_APIKEY } = process.env;
const { Temperament } = require('../db');  //Sin esto no funcionan findAll y resto de propiedades sequelize
const axios = require('axios');
const router = require('express').Router();


router.get('/temperaments', async (req, res) => {
  try {
    let temperamentsApiInfo = (await axios.get(`${URL_APIKEY}`)).data.map(el => {
      return {
          temperament: [el.temperament].join().split(',').map( el => el.trim()),
      };
    })
    let temperamentsEach = temperamentsApiInfo.map(el => el.temperament).map(el => {
      for (let i = 0; i < el.length; i++) return el[i]})

    let rawTemperaments = [] //Temperamentos sin espacios vacíos, pero con temperamentosrepetidos
    let noRepetedTemperaments = []
    temperamentsEach.forEach( el => { if(el !== '') return rawTemperaments.push(el)})
    rawTemperaments.forEach(el => {if(!noRepetedTemperaments.includes(el)) return noRepetedTemperaments.push(el)}) 

    noRepetedTemperaments.forEach(el => {
      Temperament.findOrCreate({   //Si está no lo hace nada y si no está lo crea
       where: {name: el}
      })
    }) 
    const allTemperaments = await Temperament.findAll(); 
    res.status(200).send(allTemperaments)  
  } catch (error) {
    console.log(error)
  }
 })


module.exports = router;