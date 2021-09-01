require('dotenv').config();
const { URL_APIKEY } = process.env;
const { Temperament } = require('../db');  //Sin esto no funcionan findAll y resto de propiedades sequelize
const axios = require('axios');
const router = require('express').Router();


router.get('/temperaments', async (req, res) => {
  try {
    let temperamentsApiInfo = (await axios.get(`${URL_APIKEY}`)).data.map(el => el.temperament).join().split(",") // una vez accediendo a los temperamentos, Join los une a todos, luego split los mete en un arreglo separandolos en strings separados por "coma" 
    let temperamentsEach = temperamentsApiInfo.map((el) => el.trim()) //Trim elimina los especios en blanco en ambos extremos del string
    let noEmptyTemperaments = [] //Temperamentos sin espacios vacíos, pero con temperamentosrepetidos
    temperamentsEach.forEach( el => { if(el !== '') return noEmptyTemperaments.push(el)}) //esto elimina los temperamentos vacíos

    await noEmptyTemperaments.forEach(el => {
      Temperament.findOrCreate({   //Si está no lo hace nada y si no está lo crea esto me elimina 
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

/* Para eliminar repetidos sin métodos sequelize    

let noRepetedTemperaments = [] 
rawTemperaments.forEach(el => {if(!noRepetedTemperaments.includes(el)) return noRepetedTemperaments.push(el)}) */