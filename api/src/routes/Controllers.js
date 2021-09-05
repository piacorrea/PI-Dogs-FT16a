const express = require ('express')
require('dotenv').config();
const { URL_APIKEY } = process.env;
const { Breed, Temperament } = require('../db');
const axios = require('axios');

//FUNCIONES CONTROLADORAS

const getApiInfo = async () => {
    try {
      let apiInfo = (await axios.get(`${URL_APIKEY}`)).data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: [el.temperament].join().split(',').map( el => el.trim()),
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
            attributes: ['name'],           //q me traiga los atributos del modelo temperament, pero no es necesario incluir el id.
             through: {                     //Con esto no me trae los otros datos q no quiero.
                attributes: [],
            },
        }
    })
 } catch (error) {
    console.log(error);
 }
}

const getAllBreeds = async function () {
 try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
 } catch (error) {
    console.log(error);
 }
}

module.exports = getAllBreeds;

