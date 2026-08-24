import "../Components/styleHillary.css";

export const EscenaPortada = () => {
  return (
    <main className="portada-comic">

      <section className="portada-contenido">

        <p className="portada-categoria">
          MITONIC
        </p>

        <h1 className="portada-titulo">
         ADRIAN Y LAS
          <br />
          CRONICAS DEL IMPERIO
        </h1>

        <p className="portada-descripcion">
          Acompaña a nuestros personajes en una aventura
          donde la historia cobra vida de una manera
          diferente e interactiva.
        </p>

        <button className="boton-ver-ahora">
          <span>▶</span>
          VER AHORA
        </button>

      </section>

    </main>
  );
};

export default EscenaPortada;