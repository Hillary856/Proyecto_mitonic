import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Comic from "./Pages/Comic"
import { Lineadeltiempo } from "./Components/Lineadeltiempo"
import { LottieHillary } from "./Components/LottieHillary"
import { Articulos } from "./Pages/Articulos"
import { EscenaPortada } from "./Pages/EscenaPortada"
import { EscenaAdrian } from "./Pages/EscenaAdrian"
import { Personaje } from "./Pages/Personaje"
import { Escenarios } from "./Pages/Escenarios"
import { Equipo } from "./Pages/Equipo"




export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/lineadeltiempo" element={<Lineadeltiempo />} />
          <Route path="/lottiehillary" element={<LottieHillary />} />
          <Route path="/escenaportada" element={<EscenaPortada />} />
          <Route path="/escenaadrian" element={<EscenaAdrian />} />
          <Route path="/personaje" element={<Personaje />} />
          <Route path="/escenarios" element={<Escenarios />} />
          <Route path="/equipo" element={<Equipo />} />
          

        </Routes>
      </BrowserRouter>

    </>
  )
}

