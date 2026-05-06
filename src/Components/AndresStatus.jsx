import { useEffect, useState } from 'react'

export function AndresStatus() {

  const [gemas, Setgemas] = useState(0);

  const getCharacters = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character")
    const data = await res.json()

    console.log(data)
  }

  useEffect(() => {
    getCharacters()
  }, [])
  

  return (
    <>

      <div>Status Andrés</div>
      <div className="gemas">

        <h1>Gemas: {gemas}</h1>
        <button onClick={() => { Setgemas((prev) => prev + 10) }}>Gemas azules</button>
        <button>Gemas verdes👾</button>
        <button>Gemas rojas 😈</button>
        <button>Gemas moradas😾</button>



      </div>

    </>

  )
}




