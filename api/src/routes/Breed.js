const express = require ('express')
require('dotenv').config();
const { GAMES_APIKEY, API_KEY } = process.env;
const { Breed, Temperament } = require('../db');
const getAllBreeds = require('./Controllers')
const axios = require('axios');
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
   
   //GET/breed/{idBreed}
   /* router.get('/videogames/:id', async (req, res) => {
    const {id} = req.params
     try {
      if (id.includes('-')) {
       const gamesDb = await getDbInfo();
       let gameIdDb = await gamesDb.filter(el => el.id == id);
       gameIdDb.length ? res.status(200).send(gameIdDb) : res.status (404).send('No se encontró la raza requerida')
      } else {
       const gamesApiTotal = await getApiInfo()
       let gameIdApi = await gamesApiTotal.filter(el => el.id == id);
       const apiGameUrlDescription = await axios.get(`https://api.rawg.io/api/games/${id}${API_KEY}`)
       const apiGameDescription = await apiGameUrlDescription.data
       gameIdApi[0]['description'] = apiGameDescription.description_raw
       gameIdApi.length ? res.status(200).send(gameIdApi) : res.status (404).send('No se encontró el videogame requerido')
      }
     } catch (error) {
       console.log(error);
     }
    })
   
   //POST/videogames
   router.post('/videogame', async (req, res) => {
      console.log ('Body en back', req.body)
       let { name, background_image, description, releaseDate, rating, platforms, genre, createdInDb} = req.body;
       try {
           let gameCreated = await Videogame.create({   //Para crear el juego uso el modelo Videogame + create pq quedará en base de datos, no le paso género pq está en una relación aparte en la DB
                   name,
                   background_image,
                   description,
                   releaseDate,
                   rating,
                   platforms,
                   createdInDb
           })
            let genresDb = await Genre.findAll({
               where: {name:genre}  //Debe ser igual al genre que le paso por body
           })
           gameCreated.addGenre(genresDb)  //q al gameCreated le agregue el genero q está en la base de datos q coincidió con lo q viene del body. AddGenre pq el modelo se llama Genre
           res.status(200).send('Videogame creado con éxito')
       } catch (err) {
           console.log(err);
       } 
   }) */
   
   
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
   
     /* router.delete ('/videogame', async (req, res) => { 
      let {name, background_image, description, releaseDate, rating, platforms, genre} = req.body;
       await Videogame.destroy({   
        where: {
         name,
         background_image,
         description,
         releaseDate,
         rating,
         platforms,
        }
   })
   res.status(200).send('Videogame eliminado con éxito')
   }) */
   
   /* router.put('/videogame/:id', async (req, res) => { 
      const {id} = req.params
      const {description} = req.body; 
      await Videogame.findByPk(id)
      let gameUpDate = await Videogame.update({description: description}, {
         where: {
         id: id
        }
      })
      console.log(gameUpDate)
        res.status(200).send('Videogame actualizado con éxito')
     }) */
     