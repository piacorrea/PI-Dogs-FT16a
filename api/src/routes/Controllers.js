const express = require ('express')
require('dotenv').config();
/* const { GAMES_APIKEY, API_KEY } = process.env; */
const { Breed, Temperament } = require('../db');
const axios = require('axios');
const { response } = require('express');
const router = require('express').Router();

//FUNCIONES CONTROLADORAS

const getApiInfo = async () => {
    try {
      let apiInfo = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=948c432e-503d-4736-8694-a257a7b25bc8`)).data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image,
            height: el.height,
            weight: el.weight,
            life_span: el.life_span,
        };
      });
      return apiInfo
    } catch (error) {
      console.log(error)
    }
  }
  

const getDbInfo = async() => {
 try {
    return await Breed.findAll({
        include: {
            model: Temperament,             //Si quiero crear una raza y no incluyo este modelo nunca me va a traer los temperamentos.
            attributes: ['name'],     //q me traiga los atributos del modelo temperament, pero no es necesario incluir el id.
            through: {                //Con esto no me trae los otros datos q no quiero.
                attributes: [],
            },
        }
    })
 } catch (error) {
    console.log(error);
 }
}

const getAllBreeds = async () => {
 try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
 } catch (error) {
    console.log(error);
 }
}

/* const getNameBreed = async () => {
  try {
    let {name} = req.query
    if(name) {
    let apiName = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&&api_key=948c432e-503d-4736-8694-a257a7b25bc8`)).data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image,
            height: el.height,
            weight: el.weight,
            life_span: el.life_span,
        };
      });
      return apiName
    } 
  } catch (error) {
    console.log(error)
  }
} */

module.exports = getAllBreeds/* , getNameBreed */


/* const getApiInfo = () => {

    let apiP1Promise = axios.get(`${GAMES_APIKEY}`)
    let apiP2Promise = axios.get(`${GAMES_APIKEY}&page=2`)
    let apiP3Promise = axios.get(`${GAMES_APIKEY}&page=3`)
    let apiP4Promise = axios.get(`${GAMES_APIKEY}&page=4`)
    let apiP5Promise = axios.get(`${GAMES_APIKEY}&page=5`)
  
    return Promise.all([apiP1Promise, apiP2Promise, apiP3Promise, apiP4Promise, apiP5Promise])
    .then(resultados => {
     var apiP1 = VideogameMap(resultados[0].data.results)
     var apiP2 = VideogameMap(resultados[1].data.results)
     var apiP3 = VideogameMap(resultados[2].data.results)
     var apiP4 = VideogameMap(resultados[3].data.results)
     var apiP5 = VideogameMap(resultados[4].data.results)
    
     return arrayVideogames = apiP1.concat(apiP2, apiP3, apiP4, apiP5)
  }) .catch(error => next(error))
  } */