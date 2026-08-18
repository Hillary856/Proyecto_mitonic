

import { SeccionHeader } from '../Components/SeccionHeader'
import { SeccionInfoComic } from '../Components/SeccionInfoComic'
import { Seccioncartelera } from '../Components/Seccioncartelera'
import { SeccionAdrian } from '../Components/SeccionAdrian'

export const Home = () => {
  return (
    <>
      <SeccionHeader />
      <SeccionInfoComic />
      <Seccioncartelera />
      <SeccionAdrian />
    </>
  )
}