import React, { useEffect, useState } from 'react'

export default function StatusHillary() {

    const [gemas, Setgemas] = useState(0);
    const [Character, setCharacter] = useState ([])

const getCharacter = async() => {
const res = await fetch("https://rickandmortyapi.com/api/character")
const data = await res.json()
setCharacter(data.results)

console.log(data)
}
useEffect(() => {
getCharacter()
},[])




  return (
    <>
    
    <div>StatusHillary</div>
    <div className="gemas">

        <h1>Gemas: {gemas}</h1>
<button onClick={() => { Setgemas ((prev) => prev + 10)}}>Gemas azules</button>
<button onClick={() => { Setgemas ((prev) => prev + 20)}} >Gemas verdes👾</button>
<button onClick={() => { Setgemas ((prev) => prev + 30)}}>Gemas rojas 😈</button>
<button onClick={() => { Setgemas ((prev) => prev + 40)}}>Gemas moradas😾</button>



    </div>
    
    <h1>Personajes Rick and Morty (Hillary)</h1>
    {
      Character.map((char, index) => (
        <li key={index}>{char.name}</li>
      ))
    }

    </>
   
  )
}




