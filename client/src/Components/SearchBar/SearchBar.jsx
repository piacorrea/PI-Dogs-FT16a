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
 console.log(name) 
}

function handleSubmit(e){  
 e.preventDefault()
 dispatch (getNameBreeds(name))
 setName ('')
   //despacho la acción con el name q es el estado local q va guardando lo q tipea el usuario. en resumen el usuario tipea el nombre, eso se guarda en el estado local name, se despacha esa acción, la acción va a llamar al back y le pasa el name q es lo q escribió el usuario
}

return (
 <header className={s.container}>  
 <div className= {s.searchBar}>
     <input className={s.Input} type = 'text' placeholder = 'Buscar Raza...' value= {name} onChange = {(e) => handleInputChange(e)}/> {/* Si no pongo value funciona, pero no se limpia el placeholder */}
     <button className={s.Button} type = 'submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
 </div>
 </header> 
)

}