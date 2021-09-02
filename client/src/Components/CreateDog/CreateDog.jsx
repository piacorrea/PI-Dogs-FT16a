import React from 'react';
import {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {postBreed, getTemperaments} from '../../Redux/Actions';
import {NavLink, useHistory} from 'react-router-dom';
import s from './CreateDog.module.css';
import logo from '../../Components/dog.png'


function validate (input) {   //input es mi estado local
 let errors = {};
  if (!input.name || !/^[a-zA-Z áéíóúñ]*$/.test(input.name) || input.name.length > 30 || input.name.length < 3) {
   errors.name = 'El nombre de la raza debe contener de 3 a 30 caracteres de los cuales deben ser sólo letras';
  } 
  if (!input.heightMin || !/^([0-9])*$/.test(input.heightMin) || input.heightMin < 10 || input.heightMin > 99  || input.heightMin > input.heightMax) {
    errors.heightMin ='La altura mínima de la raza debe ser un número, el cual debe ser mínimo de 2 dígitos y no puede ser mayor a la altura máxima'
  }

  if (!input.heightMax || !/^([0-9])*$/.test(input.heightMax) || input.heightMin > input.heightMax || input.heightMax > 999 ) {
    errors.heightMax ='La altura máxima de la raza debe ser un número, el cual debe contener máximo 3 dígitos y no puede ser menor a la altura mínima'
  }
  if (!input.weightMin || !/^([0-9])*$/.test(input.weightMin) || input.weightMin < 1 || input.weightMin > 99 || input.weightMin > input.weightMax) {
    errors.weighttMin ='El peso mínimo de la raza debe ser un número entero, el cual debe ser máximo de 2 dígitos y no puede ser mayor al peso máximo'
  }

  if (!input.weightMax || !/^([0-9])*$/.test(input.weightMax) || input.weightMin > input.weightMax || input.weightMax > 999 ) {
    errors.weightMax ='El peso máximo de la raza debe ser un número, el cual debe ser máximo de 3 dígitos y no puede ser menor al peso mínimo'
  }

  if (!input.life_spanMin || !/^([0-9])*$/g.test(input.life_spanMin) || input.life_spanMin < 1 || input.life_spanMin > 99 || input.life_spanMin > input.life_spanMax ) {
    errors.life_spanMin = 'Los años mínimos de vida deben ser un número entero, mayor a 1 y no pueden ser mayor a 2 dígitos o superior a los años máximos de vida'; 
  }

  if (!input.life_spanMax || !/^([0-9])*$/g.test(input.life_spanMax) || input.life_spanMax < 1 || input.life_spanMax > 99 || input.life_spanMin > input.life_spanMax) {
    errors.life_spanMax = 'Los años máximos de vida deben ser un número entero, mayor a 1 y no pueden ser mayor a 2 dígitos o superior a los años mínimos de vida'; 
  }
/*   if (!input.platforms.length) {
   errors.platforms ='Se requiere al menos 1 plataforma'
  }
  if (!input.temperament.length) {
   errors.temperament ='Se requiere al menos 1 género'
  } */

  return errors;
}


export default function CreateBreed(){
 const dispatch = useDispatch() 
 const history = useHistory()  
 const temperaments = useSelector((state) => state.temperaments) //me traigo el estado
 const [errors, setErrors] = useState ({}) //Estado local q arranca con objeto vacío

 const [input, setInput] = useState({  //para crear el Raza necesito el formulario renderizado en la pagina y lo debo guardar en un estado q en este caso es input, se guarda como un obj q tendrá la L34 a la L40
  name: '',
  image: '',
  life_spanMin: '',
  life_spanMax: '',
  heightMin: '',
  heightMax: '',
  weightMin: '',
  weightMax: '',
  temperament: [], //Si coloco un string vacio no me da la posibilidad de colocar mas de 1 temperamento
 })

 function handleChange(e){  //Maneja los cambios de mi input
  setInput({...input, [e.target.name]: e.target.value}) //Cuando hago handleChange, primero se setea el input, a medida q voy escribiendo mi estado input va recibiendo y guardando lo q escribo y el e.target.name se setea en el e.target.value
  setErrors(validate({...input, [e.target.name]: e.target.value})) //q setee mi estado de errores pasandole la fn validate con el estado input y el e.target.name en el e.target.value
 /*  console.log(input) */
 }

 function handleSelectTemperament(e){  
  /*  console.log(e.target.value) */
  setInput({...input, temperament:[...input.temperament, e.target.value]})
  setErrors(validate({...input, temperament: e.target.value}))
 }

 function handleDeleteTemperaments(el){  
  setInput({...input, temperament: input.temperament.filter(tem => tem !== el)}) 
 }


 function handleSubmit(e){  
  e.preventDefault();
 /*  setErrors(validate({...input, [e.target.name]: e.target.value})) */
  let checkboxsErrors = []
  if (input.temperament.length < 1) checkboxsErrors.push('Se requiere al menos 1 género');
  if (Object.values(errors).length || checkboxsErrors.length) return alert(Object.values(errors).concat(checkboxsErrors).join('\n')); // así no considera a temperaments ni a platforms
  var sendDog = {
    name: input.name,
    image: input.image,
    life_span: input.life_spanMin == input.life_spanMax ? input.life_spanMax : + input.life_spanMin+ " - "+input.life_spanMax,
    height: input.heightMin == input.heightMax ? input.heightMax : + input.heightMin+ " - "+input.heightMax,
    weight: input.weightMin == input.weightMax ? input.weightMin : + input.weightMin+ " - "+input.weightMax,
    temperament: input.temperament   
}
  dispatch(postBreed(sendDog))
  alert('Raza Creada!')
  setInput({       //con esto seteo el input en cero, "vacío"
    name: '',
    image: '', 
    life_spanMin: '',
    life_spanMax: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',   
    temperament: [],
  })
  
   history.push('/home') //metodo del roter q me redirige a la ruta q le pida, en esta linea se coloca para q cuando termine de crear al personaje me lleve al home para poder ver si se creó el nuevo Raza
 }


 useEffect(()=> {
  dispatch(getTemperaments())
 },[dispatch]);
 
 return (
  <div className= {s.background}>
      <NavLink to= '/home'> <button className={s.backBtn}>Volver</button></NavLink>
      <h1 className={s.title}>Crea tu Raza</h1>
      <img className={s.logo} src={logo} alt='logo not found' />
      <section className={s.form}>
       <form onSubmit={(e)=>handleSubmit(e)}>
         <h4 className= {s.h4}>Formulario de Creación</h4>
          <div>
              <input className= {s.control} type='text' value={input.name} name='name' placeholder='Ingrese Nombre de la raza' onChange={(e)=>handleChange(e)}/> {/* tb se puede colocar solo handleChange en reemplazo de (e)=>handleChange(e)  */}
              {errors.name && (<p>{errors.name}</p>)} {/* Si está mi estado error.name, q renderice ese error */}
          </div>
          <div>
              <input className= {s.control} type='text' value={input.image} name='image' placeholder='Ingrese Imagen' onChange={(e)=>handleChange(e)}/>
          </div>
          <div>
              <input className= {s.control} type='text' value={input.life_spanMin} name='life_spanMin' placeholder='Ingrese los mínimos años de vida de la raza' onChange={(e)=>handleChange(e)}/>
              {errors.life_spanMin && (<p>{errors.life_spanMin}</p>)}
          </div>
          <div>
              <input className= {s.control} type='text' value={input.life_spanMax} name='life_spanMax' placeholder='Ingrese los máximos años de vida de la raza' onChange={(e)=>handleChange(e)}/>
              {errors.life_spanMax && (<p>{errors.life_spanMax}</p>)}
          </div>
          <div>
              <input className= {s.control} type='text' value={input.heightMin} name='heightMin' placeholder='Ingrese Altura Mínima'onChange={(e)=>handleChange(e)}/>
              {errors.heightMin && (<p>{errors.heightMin}</p>)}
          </div>
          <div>
              <input className= {s.control} type='text' value={input.heightMax} name='heightMax' placeholder='Ingrese Altura Máxima' onChange={(e)=>handleChange(e)}/>
              {errors.heightMax && (<p>{errors.heightMax}</p>)} 
          </div>
          <div>
              <input className= {s.control} type='text' value={input.weightMin} name='weightMin' placeholder='Ingrese Peso Mínimo' onChange={(e)=>handleChange(e)}/>
              {errors.weightMin && (<p>{errors.weightMin}</p>)}
          </div>
          <div>
              <input className= {s.control} type='text' value={input.weightMax} name='weightMax' placeholder='Ingrese Peso Máximo' onChange={(e)=>handleChange(e)}/>
              {errors.weightMax && (<p>{errors.weightMax}</p>)}
          </div>
          <div>
          <select className= {s.control} onChange={(e) => handleSelectTemperament(e)} >
           <option value=''>Seleccione Temperamentos</option>
           {temperaments.map((tem) => (<option value={tem.name}>{tem.name}</option>))}
          </select>
          <ul><li>{input.temperament.map(el => ' *' + el)}</li></ul>
          {/* {errors.temperament && (<p>{errors.temperament}</p>)} */}
          </div>
        <button className= {s.createBtn} type='submit' onSubmit={(e)=>handleSubmit(e)}>Crear Raza</button>
          <br/>
       </form>
       <div clasName={s.delete}> 
          {input.temperament.map(el =>  //estado local con los temperaments q vaya guardando, q lo mapee en un div y renderice el elemento + un btn q cuando le haga click borre el elemento
          <button className={s.deleteBtn} onClick={()=>handleDeleteTemperaments(el)}>{el} X</button>
         )}
        </div>
    </section>
  </div>
 )
}