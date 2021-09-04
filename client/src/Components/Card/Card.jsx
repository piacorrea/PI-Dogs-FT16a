import React from "react";
import s from './Card.module.css';

export default function Card({name, image, weight, temperament, temperaments}) { //como le paso esto por props no necesito traerme ningún estado pq ya tengo la lógica en el home 
    return (
        <div className={s.card}>
            <h3>{name}</h3>
            <img src={image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMXjR6n46vMi6b0PxPYaQLh_xj2HY4AO--w&usqp=CAU'} alt='img not found' width='180px' height='180px'/>
            <h6>Peso [Kg]: {weight}</h6>
            {<h6>Temperamentos: {temperament ? temperament.map((e) => ( `${'*'+e} `)) : temperaments.map((e) => (`${'*'+e.name} `))}</h6>}
        </div>
    );
}