import React from 'react';
import logo from '../dog.png'
import s from './Loading.module.css'

export default function Loading(){
    return (
        <div className={s.backgroundC}>
        <div className={s.background}>
        <h1 className={s.title}>Loading...</h1>
        <div>
            {  <img className={s.logo} src={logo} alt='logo not found' />}
            </div>
       </div>
    </div>
        
    )
}