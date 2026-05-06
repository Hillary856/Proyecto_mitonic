import { useState } from 'react'

export function AndresStatus() {

  const [gemas, Setgemas] = useState(0);

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




