import { SeccionHeader } from "../Components/SeccionHeader";
import { SeccionHero } from "../Components/SeccionHero";
import { SeccionInfoComic } from "../Components/SeccionInfoComic";
import { Seccioncartelera } from "../Components/Seccioncartelera";
import { SeccionAdrian } from "../Components/SeccionAdrian";
import { SeccionEquipo } from "../Components/SeccionEquipo";
import { SeccionFooter } from "../Components/SeccionFooter";

import Intro from "../Components/intro";

export const Home = () => {
  return (
    <>
      <Intro />

      <SeccionHeader />
      <SeccionHero />
      <SeccionInfoComic />
      <Seccioncartelera />
      <SeccionAdrian />
      <SeccionEquipo />
      <SeccionFooter />
    </>
  );
};