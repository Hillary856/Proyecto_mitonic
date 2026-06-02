import { BrowserRouter, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import Comic from "./Pages/Comic"

export const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="comic" element={<Comic/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

