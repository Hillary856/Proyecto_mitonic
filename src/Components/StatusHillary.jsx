import React, { useState } from 'react'

export default function StatusHillary() {

    const [gemas, Setgemas] = useState(0);

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
    
    </>
   
  )
}




