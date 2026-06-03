import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Comic from "./Pages/Comic"

import { Lineadeltiempo } from "./Components/Lineadeltiempo"
import TrailerStiven from "./Pages/TrailerStiven"

export const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/comic" element={<Comic/>} />
         <Route path="/trailerStiven" element={<TrailerStiven/>} />
         <Route  path="/lineadeltiempo" element={<Lineadeltiempo/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

