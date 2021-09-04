import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './LandingPage.module.css';
/* import logo from '../dog.png' */

export default function LandingPage(){

    return(
      <div className={s.backgroundC}>
        <div className={s.background}>
            <h1 className={s.title}>Bienvenidos a Pía Dogs App</h1>
            <div>
              <img className={s.logo} src={'https://media3.giphy.com/media/aJ0I93QQlrnxHqMdcs/200w.webp?cid=ecf05e47evpxi7ctz3wl7wk9jahm8e81l0xqwzge15l8kun9&rid=200w.webp&ct=g'} alt='logo not found' />
            </div>
            <NavLink to ='/home'>
                <button className={s.eightbitBtn}>Ingresar</button>
            </NavLink>
        </div>
    </div>
    )
}