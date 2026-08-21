

import { SeccionHeader } from '../Components/SeccionHeader'
import { SeccionInfoComic } from '../Components/SeccionInfoComic'
import { Seccioncartelera } from '../Components/Seccioncartelera'
import { SeccionAdrian } from '../Components/SeccionAdrian'
import { SeccionEquipo } from "../Components/SeccionEquipo";
import { SeccionFooter } from "../Components/SeccionFooter";

export const Home = () => {
  return (
    <>
      <SeccionHeader />
      <SeccionInfoComic />
      <Seccioncartelera />
      <SeccionAdrian />
      <SeccionEquipo />
      <SeccionFooter />
    </>
  )
}