import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getBreeds, filterBreedsByWeight, filterCreated, orderByName, filterTemperaments, getTemperaments} from '../../Redux/Actions';
import {NavLink} from 'react-router-dom';
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
/* import Loading from '../Loading/Loading' */
import s from './Home.module.css';

export default function Home() {

  const dispatch = useDispatch()  

    useEffect (()=>{
    dispatch(getBreeds());
    dispatch(getTemperaments())  //este dispatch es lo mismo q hacer mapdispatchTo props
  },[dispatch]) //lo q se incluye adentro del arreglo depende de lo q compone el componentDidMount(L12 y 13), o sea como en este caso depende del dispatch, se coloca dentro del
  //En este caso la posición del useEffect importa, pq se deben llenar los estados primeros para que luego se rendericen las cards, por eso lo puse tb en el landing para q los estados ya entren cargados.
                         
  const allBreeds = useSelector((state) => state.breeds) //Es lo mismo q hacer mapStateToprops, con el useSelector se trae en esta const todo lo q está en el estado de breeds
  const temperaments = useSelector ((state) => state.temperaments)
  const [currentPage, setCurrentPage] = useState (1) //q me guarde la pag actual en un estado local y es 1 pq arranco en la primera página 
  const [breedsPerPage, /* setbreedsPerPage */] = useState (8) //q me guarde 9 paginas en esta otra constante en otro estado local 
  const [orden, setOrden] = useState ('')  //Estado local vacío
  const indexOfLastBreed = currentPage * breedsPerPage   //La pag actual en la q estoy x la cantidad de juegos x pagina inicia en 8 (1*8)
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage //es 0 pq es 8-8=0, en la segunda pag va a ser 8, en la tercera 116
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed) //va a tener a los games q estan en la pag actual, allBreed q es el arreglo del estado q me traigo con el useSelector q me trae del reducer el estado breeds, ese estado breeds me trae todos las razas

 const paginado = (pageNumber) => {    //le paso un número de pagina, esta constante ayuda al renderizado
   setCurrentPage(pageNumber)          //Seteo la pagina en ese número de página que es el número de pagina q voy apretando y cuando voy apretando todos los indexof cambian y el slice de la L22 se va a ir modificando.
 }
 
 function handleClick(e){ //esto resetea y trae todos los breeds de nuevo
  e.preventDefault(); //esto es preventivo para q no se recargue la página y no se rompan las cosas, ya q cada vez q recargamos los estados de redux vuelven a cargarse si tienes un useEffect y si dependes de algo se rompe todo
  dispatch(getBreeds());
 }
 
 function handleFilterTemperaments(e){
   e.preventDefault()
   dispatch(filterTemperaments(e.target.value))
   setCurrentPage(1)
 }
 
 function handleFilterWeight(e){
   dispatch(filterBreedsByWeight(e.target.value))
   console.log(e.target.value)
   setCurrentPage(1)
 }
 
 function handleFilterCreated(e){
   dispatch(filterCreated(e.target.value))
   setCurrentPage(1)
 }
 
 function handleSort(e){
   e.preventDefault();
   dispatch(orderByName(e.target.value))
   setCurrentPage(1);  //Cuando se haga el ordenamiento q setee la pag en la primera
   setOrden(`Ordenado ${e.target.value}`)  //Cuando seteo en esta página 1, se modifique este estado local, q arranca vacio, pero ahora está seteado ordenado de tal forma, solo para q haga la modificación en el renderizado. si comento esta linea no funciona.
 }

 
 return (
 <div className= {s.backgroundC}>
    <div className={s.background}>
      <div className={s.ctnOrders}>
       <NavLink className={s.createLink} to= '/breed'>Crear Raza</NavLink>
       <SearchBar/>
       <select className={s.filter} id= {0} onChange={e => handleFilterTemperaments(e)}>
       <option value=''>Temperamentos</option>
       {temperaments.map((el) => (<option key={el.id} value={el.name}>{el.name} </option>))}
       </select>
       <select className={s.filter} id= {1} onChange={e => handleFilterCreated(e)}>
         <option value= 'All'>Origen</option> 
         <option value= 'created'>Creados</option>
         <option value= 'api'>Existentes</option>
       </select>
       <select className={s.filter} id= {2} onChange={e => handleSort(e)}>
         <option value= ''>Ordenar Nombres</option> 
         <option value= 'asc'>A - Z</option> 
         <option value= 'desc'>Z - A</option>
       </select>
       <select className={s.filter} id= {3} onChange={e => handleFilterWeight(e)}>
         <option value= ''>Ordenar Peso</option> 
         <option value= 'high'>Descendente</option>
         <option value= 'less'>Ascendente</option>
       </select>
       <button className={s.createLinkRecarga} onClick={e=> {handleClick(e)}}> Recargar Razas </button>
      </div>
        <Paginate breedsPerPage = {breedsPerPage} allBreeds = {allBreeds.length} paginado = {paginado} key = {paginado.toString()} />
       <div className={s.games}>
         {currentBreeds.length ? currentBreeds.map((c)=>{ 
          return (
            <NavLink className={s.link} to={"/home/" + c.id}>
             <Card name={c.name} image={c.image || `data:image/jpeg;base64,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`} weight= {c.weight} origin= {c.origin} temperament={c.temperament} temperaments={c.temperaments} key={c.id}/> 
            </NavLink>
          )
         })
         : (<div className={s.message}> 
           <h3>Ups! No hay dogs para mostrar</h3> 
           <img src= {`https://previews.123rf.com/images/arnica/arnica1209/arnica120900063/15385405-ilustraci%C3%B3n-perro-triste.jpg`} alt='img not found' width='180px' height='180px'/>
           </div>)
        }
        </div>
  </div>
</div>
 )
}