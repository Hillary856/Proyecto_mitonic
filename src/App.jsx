import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Comic from "./Pages/Comic"
import TrailerStiven from "./Components/SeccionStiven/TrailerStiven"
import { Lineadeltiempo } from "./Components/Lineadeltiempo"

export const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/comic" element={<Comic/>} />
         <Route path="/TrailerStiven" element={<TrailerStiven/>} />
         <Route  path="/Lineadeltiempo" element={<Lineadeltiempo/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

