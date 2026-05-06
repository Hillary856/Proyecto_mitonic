import React, { useState } from 'react'

export const StatusStiven = () => {

  const[puntos,setpuntos]= useState(0 ) 
  return (
    <>
    <div>StatusStiven</div>
    <div className="puntos">
    <button onClick={()=>{setpuntos((prev)=>{prev + 1})}}>100 🥵</button>
     <button onClick={()=>{setpuntos((prev)=>{prev + 2})}}>400 🥲</button>
      <button onClick={()=>{setpuntos((prev)=>{prev + 3})}}>500 🥵</button>
       <button onClick={()=>{setpuntos((prev)=>{prev + 4})}}>700 🥲</button>
       




    </div>
    
    
    
    
    
    </>
  )
}
