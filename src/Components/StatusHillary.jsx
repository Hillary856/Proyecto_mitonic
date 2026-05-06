import React, { useState } from 'react'

export default function StatusHillary() {

    const [gemas, Setgemas] = useState(0);

  return (
    <>
    
    <div>StatusHillary</div>
    <div className="gemas">
      
        <h1>Gemas: {gemas}</h1>
<button onClick={() => { Setgemas ((prev) => prev + 10)}}>Gemas azules</button>
<button>Gemas verdes👾</button>
<button>Gemas rojas 😈</button>
<button>Gemas moradas😾</button>



    </div>
    
    </>
   
  )
}




