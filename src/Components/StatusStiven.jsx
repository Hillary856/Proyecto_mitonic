import React, { useEffect, useState } from 'react'

export const StatusStiven = () => {

  const[puntos,setpuntos]= useState(0 ) 

  const getCharacters= async()=>{
    const res= await fetch("https://rickandmortyapi.com/api/character")
    const data = await res.json()
    
    console.log( data )
  }

useEffect(() => {
  
 getCharacters()
}, [])



  return (
    <>
    <div>StatusStiven</div>
    <div className="puntos">
      <h1>puntos:{puntos}</h1>
    <button onClick={()=>{setpuntos(prev=>prev + 1)}}>100 🥵</button>
     <button onClick={()=>{setpuntos(prev=>prev + 2)}}>400 🥲</button>
      <button onClick={()=>{setpuntos(prev=>prev + 3)}}>500 🥵</button>
       <button onClick={()=>{setpuntos(prev=>prev + 4)}}>700 🥲</button>
       




    </div>
    
    
    
    
    
    </>
  )
}
