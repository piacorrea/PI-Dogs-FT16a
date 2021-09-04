import React from 'react';
import s from './Loading.module.css'

export default function Loading(){
 return (
   <div className={s.background}>
       <div>
         <h1 className={s.title}>Loading...</h1>
         <div>
            {  <img className={s.logo} src={'https://media3.giphy.com/media/HQuxKmr7Jqj7ScKyVJ/giphy.gif?cid=ecf05e47i08h972tobryg782vm5yjch4gw86rswnvlc01ftr&rid=giphy.gif&ct=g%27'} alt='logo not found' />}
         </div>
       </div>
   </div>
        
 )
}