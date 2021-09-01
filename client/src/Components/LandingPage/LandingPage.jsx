import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './LandingPage.module.css';
import logo from '../dog.png'

export default function LandingPage(){

    return(
      <div className={s.backgroundC}>
        <div className={s.background}>
            <h1 className={s.title}>Bienvenidos a Pía Dogs App</h1>
            <div>
              <img className={s.logo} src={logo} alt='logo not found' />
            </div>
            <NavLink to ='/home'>
                <button className={s.eightbitBtn}>Ingresar</button>
            </NavLink>
        </div>
    </div>
    )
}