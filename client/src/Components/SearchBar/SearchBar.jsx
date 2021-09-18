import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {getNameBreeds} from '../../Redux/Actions';
import s from './SearchBar.module.css';

export default function SearchBar(){
 const dispatch = useDispatch() 
 const [name, setName] = useState('') 

function handleInputChange(e){  //para guardar en mi estado local lo q vaya apareciendo en el input 
 e.preventDefault()
 setName(e.target.value)      //el value del input debe tomar el value del state para lo cual seteo el name
/*  dispatch (getNameBreeds(name)) Esto es para que busque el name a medida q voy tecleando*/ 
 console.log(name) 
}

/* function handleKeyDown(e){  
  if(e.key === 'Enter') {
    e.preventDefault()
    dispatch (getNameBreeds(name))
    setName ('')
  }    
} Con esto reemplazo el botón L37 por el enter, por lo q no necesito el boton y debo comentarlo al igual q debo comentar las lineas 26 a 31*/

function handleSubmit(e){  
 e.preventDefault()
 dispatch (getNameBreeds(name))
 setName ('')
   //despacho la acción con el name q es el estado local q va guardando lo q tipea el usuario. en resumen el usuario tipea el nombre, eso se guarda en el estado local name, se despacha esa acción, la acción va a llamar al back y le pasa el name q es lo q escribió el usuario
}

return (
 <header className={s.container}>  
 <div className= {s.searchBar}>
     <input className={s.Input} type = 'text' placeholder = 'Buscar Raza...' value= {name} onChange = {(e) => handleInputChange(e)} /* onKeyDown = {handleKeyDown} *//> {/* Si no pongo value funciona, pero no se limpia el placeholder, onKeyDpwn se descomenta si quiero reemplazar el boton por el enter */}
     <button className={s.Button} type = 'submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
 </div>
 </header> 
)
}