import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Comic from "./Pages/Comic"
import { Lineadeltiempo } from "./Components/Lineadeltiempo"
import TrailerStiven from "./Pages/TrailerStiven"
import { LottieHillary } from "./Components/LottieHillary"
import { Articulos } from "./Pages/Articulos"
import { EscenaPortada } from "./Pages/EscenaPortada"
import { EscenaAdrian } from "./Pages/EscenaAdrian"



export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/trailerStiven" element={<TrailerStiven />} />
          <Route path="/lineadeltiempo" element={<Lineadeltiempo />} />
          <Route path="/lottiehillary" element={<LottieHillary />} />
          <Route path="/escenaportada" element={<EscenaPortada />} />
          <Route path="/escenaadrian" element={<EscenaAdrian />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

