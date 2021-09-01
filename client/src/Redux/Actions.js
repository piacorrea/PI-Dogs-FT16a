import axios from 'axios'

export function getBreeds (){
    return async function(dispatch){
     try {
        var json = await axios.get("http://localhost:3001/breeds", {});  //Acá es donde sucede toda la conexion entre el front y el back
        return dispatch({ type: 'GET_BREEDS', payload: json.data})  
     } catch (error) {
        console.log(error) 
     }
    }
}

export function filterBreedsByWeight(payload){  
       return {
           type:'FILTER_BY_WEIGHT',
           payload
       }
   }
   
export function filterCreated(payload){ 
    return {
        type:'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){ 
    console.log(payload)
      return {
          type:'ORDER_BY_NAME',
          payload
      }
}

export function filterTemperaments (payload){
    return {
        type:'FILTER_BY_TEMPERAMENTS',
        payload
    }
}

export function getTemperaments (){
 return async function(dispatch){
     try {
        var info = await axios.get("http://localhost:3001/temperaments", {});  //axios por default hace un get, q es lo mismo q coloccar axios.get
        return dispatch({ type: 'GET_TEMPERAMENT', payload: info.data})  
     } catch (error) {
        console.log(error)  
     }
 }
}

export function getNameBreeds (name){
 return async function(dispatch){
  try {
    var json = await axios("http://localhost:3001/breeds?name=" + name); 
    if(json.data.data?.error){
        alert('Raza no encontrada')  
    } else {
    return dispatch({ type: 'GET_NAME_BREEDS', payload: json.data})
    }
  } catch (error) {
    console.log(error)
  }
 }
}

export function postBreed (payload){ 
 return async function(dispatch){
     try {
        var response = await axios.post("http://localhost:3001/breed", payload);  
        console.log(response)
        return response
     } catch (error) {
        console.log(error)
     }
    }
}

export function getDetail (id){
    return async function(dispatch){
     try {
        var json = await axios.get("http://localhost:3001/breeds/" + id);  
        return dispatch({ type: 'GET_DETAILS', payload: json.data})
     } catch (error) {
        console.log(error)
     }
    }
}