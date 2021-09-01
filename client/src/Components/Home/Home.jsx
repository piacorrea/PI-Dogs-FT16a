import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getBreeds, filterBreedsByWeight, filterCreated, orderByName, filterTemperaments, getTemperaments} from '../../Redux/Actions';
import {NavLink} from 'react-router-dom';
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading'
import s from './Home.module.css';

export default function Home() {

  const dispatch = useDispatch()  
                         
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

  //traernos del estado los breeds cuando el componente se monta, me lo traigo al landing para q sea más rapida la carga y no en el home
  useEffect (()=>{
    dispatch(getBreeds());
    dispatch(getTemperaments())
     //este dispatch es lo mismo q hacer mapdispatchTo props
  },[dispatch]) //lo q se incluye adentro del arreglo depende de lo q compone el componentDidMount(L12 y 13), o sea como en este caso depende del dispatch, se coloca dentro del
 
 //renderizamos:
 return (
 <div className= {s.backgroundC}>
  <div className={s.background}>
    <div className={s.ctnOrders}>
     <NavLink className={s.createLink} to= '/breed'>Crear Raza</NavLink>
     <SearchBar/>
     <select className={s.filter} onChange={e => handleFilterTemperaments(e)}>
     <option value=''>Temperamentos</option>
     {temperaments.map((el) => (<option value={el.name}>{el.name} </option>))}
     </select>
     <select className={s.filter} onChange={e => handleFilterCreated(e)}>
       <option value= 'All'>Origen</option> 
       <option value= 'created'>Creados</option>
       <option value= 'api'>Existentes</option>
     </select>
     <select className={s.filter} onChange={e => handleSort(e)}>
       <option value= ''>Ordenar Nombres</option> 
       <option value= 'asc'>A - Z</option> 
       <option value= 'desc'>Z - A</option>
     </select>
     <select className={s.filter} onChange={e => handleFilterWeight(e)}>
       <option value= ''>Ordenar Peso</option> 
       <option value= 'high'>Descendente</option>
       <option value= 'less'>Ascendente</option>
     </select>
     <button className={s.createLinkRecarga} onClick={e=> {handleClick(e)}}> Recargar Razas </button>
    </div>
     <Paginate   //traeme el paginado y pasale como breedsPerPage, breedsPerPage q es el estado q tengo arriba de games por pagina, como allBreeds, el estado de allBreeds.length pq necesito un valor numérico y como paginado la cont paginado
     breedsPerPage = {breedsPerPage}
     allBreeds = {allBreeds.length}
     paginado ={paginado}
     />
     <div className={s.games}>
       {currentBreeds.length? currentBreeds.map((c)=>{ 
        return (
          <NavLink className={s.link} to={"/home/" + c.id}>
           <Card name={c.name} image={c.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMXjR6n46vMi6b0PxPYaQLh_xj2HY4AO--w&usqp=CAU`} weight= {c.weight} temperament={c.temperament} temperaments={c.temperaments} key={c.id}/> 
          </NavLink>
        )
       }) : <Loading/>
      }
      </div>
  </div>
</div>
 )
}