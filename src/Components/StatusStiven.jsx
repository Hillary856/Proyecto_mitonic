import React, { useState } from 'react'

export const StatusStiven = () => {

  const[puntos,setpuntos]= useState(0 ) 
  return (
    <>
    <div>StatusStiven</div>
    <div className="puntos">
    <button onClick={()=>{setpuntos((prev)=>{prev + 2})}}>100 </button>
     <button>400</button>
      <button>500 🥵</button>
       <button>700 🥲</button>
       




    </div>
    
    
    
    
    
    </>
  )
}
