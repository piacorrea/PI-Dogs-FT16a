import React from 'react';
import {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getDetail, unmountAllBreeds} from '../../Redux/Actions';
import {Link} from 'react-router-dom';
import Loading from '../Loading/Loading';
import s from './Detail.module.css'

export default function Detail (props){
 //console.log(props)
 const dispatch = useDispatch() 

 useEffect(()=> {
  dispatch(getDetail(props.match.params.id))  //de esta forma accedo al id de ese detalle pasandole props a mi componente
  return () => {
    dispatch(unmountAllBreeds())
} 
},[dispatch, props.match.params.id]);

 const myBreed = useSelector ((state)=> state.detail)  //así me traigo el detalle desde el reducer 

 return (
  <div className={s.backgroundC}>
    <div className={s.background}>
        {myBreed.length > 0 ?
         <div className={s.card}>
             <h1>{myBreed[0].name}</h1>
             <img src={myBreed[0].image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMXjR6n46vMi6b0PxPYaQLh_xj2HY4AO--w&usqp=CAU'} alt="" width="400px" height="250px"/>
             <h4>Temperamentos: {!myBreed[0].createdInDb ? myBreed[0].temperament.join(' *'):  myBreed[0].temperaments.map(el => el.name + (' *'))}</h4> {/* este caso es para cuando la api y la DB traen diferente la info, entonces: myBreed no está creado en la DB? (o sea es de la api?), entonces q me traiga myBreed.genre pq en la api está como genre y es un array de strings le agrego un espacio pq sino las trae todas pegadas.Si no q mapee el genres de la DB q es un array de obj*/}
             <h4>Años de vida: {myBreed[0].life_span}</h4> 
             <h4>Altura [cm]: {myBreed[0].height}</h4>  
             <h4>Peso [Kg]: {myBreed[0].weight}</h4>
         </div> : <Loading/>
        }
        <Link to= '/home'>
            <button className={s.backBtn}>Volver</button>
        </Link>
    </div>
  </div>
 )
}