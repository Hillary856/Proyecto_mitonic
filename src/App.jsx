/* import { AndresStatus } from "./Components/AndresStatus"
import StatusHillary from "./Components/StatusHillary"
import { StatusStiven } from "./Components/StatusStiven"
 */

import { SeccionHeader } from "./Components/SeccionHeader/SeccionHeader"
import "./Components/SeccionHeader/SeccionHeader.css"
import { SeccionInfoComic } from "./Components/SeccionInfoComic/SeccionInfoComic"
import "./Components/SeccionInfoComic/SeccionInfoComic.css"

export const App = () => {
  return (
    <div>
      {/* <AndresStatus/>
        
        <StatusStiven/>
      <StatusHillary/> */}

     <SeccionHeader/>
     <SeccionInfoComic/>
    </div>
  )
}

