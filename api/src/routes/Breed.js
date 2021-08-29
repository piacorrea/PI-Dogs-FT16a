const express = require ('express')
require('dotenv').config();
const { Breed, Temperament } = require('../db');
const getAllBreeds = require('./Controllers')
const { response } = require('express');
const router = require('express').Router();


//GET/breeds y GET /breeds?name="...":
router.get('/breeds', async (req, res) => {
    const {name} = req.query
     try {
       let breedsTotal = await getAllBreeds();  
       if(name){
         let breedName = await breedsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); //q se fije si el nombre incluye el name q me pasan por query
         breedName.length ? res.status(200).send(breedName) : res.json({data: {error:'No se encontró la raza requerida'}}) 
       }
       res.status(200).send(breedsTotal)   
     } catch (error) {
       console.log(error);
     }
   }) 

//GET/breeds/{idBreed}
router.get('/breeds/:id', async (req, res) => {
 const {id} = req.params;
try {
  const breedsTotal = await getAllBreeds();
  if (id){
    let breedId = await breedsTotal.filter(el => el.id == id);
    breedId.length ? res.status(200).json( breedId) : res.status(404).send( 'Raza no encontrada' )            
  }
} catch (error) {
  console.log(err);
}
})

//POST/breed
router.post('/breed', async (req, res) => {
  console.log ('Body en back', req.body)
  let { name, image, height, weight, life_span, temperament, createdInDb} = req.body;
    try {
      if( !name || !height || !weight ) return res.status( 404 ).send( 'Nombre, altura y peso son requeridos' )
        let breedCreated = await Breed.create({   //Para crear el juego uso el modelo Breed + create pq quedará en base de datos, no le paso temperamento pq está en una relación aparte en la DB
          name,
          image,
          height,
          weight,
          life_span,
          createdInDb
        })
         let temperamentsDb = await Temperament.findAll({
            where: {name:temperament}  //Debe ser igual al temperament que le paso por body
        })
        breedCreated.addTemperament(temperamentsDb)  //q al gameCreated le agregue el genero q está en la base de datos q coincidió con lo q viene del body. AddGenre pq el modelo se llama Genre
        res.status(200).send('Raza creada con éxito')
    } catch (err) {
        console.log(err);
    } 
})
  
   
   module.exports = router;
   
   
   
   
   
   /* const getApiInfo = async () => {
      try {
        let apiUrl = await axios.get(`${GAMES_APIKEY}`)
        let arrayVideogame = await VideogameMap(apiUrl.data.results) //Quiero el array results de la api
        let next = apiUrl.data.next //De la api quiero acceder al next   
     
           while(arrayVideogame.length < 100) {
           const urlNext= await axios.get(next)
           const charge = VideogameMap(urlNext.data.results)
           arrayVideogame = [...arrayVideogame, ...charge]
           next = urlNext.data.next
           }
           
            return arrayVideogame
            
      } catch (error) {
         console.log(error);
      }
     } */
   
/* router.delete ('/breed', async (req, res) => { 
 let {name, image, height, weight, life_span} = req.body;
  await Breed.destroy({   
        where: {
          name,
          image,
          height,
          weight,
          life_span
        }
   })
 res.status(200).send('Raza eliminada con éxito')
}) */ 
   
/* router.put('/breed', (req, res, next) => {
  let {id} = req.query
   let { name, height} = req.body;
   try {
       let breedDb = Breed.findOne({   
              where: {
                id: id
              }
       })
       Promise.all([breedDb])
       .then(response  =>{
        let [breedDb] = response
          breedDb.update ({
            name,
            height
          }) 
        return res.status(200).send(breedDb)
       })
   } catch (err) {
       next(err);
   } 
}) */



     