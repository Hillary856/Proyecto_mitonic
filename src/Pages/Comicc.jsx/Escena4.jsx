import { useState } from "react";

import Adrianpatras from "../../assets/Adrianpatras.svg";
import Reloj from "../../AssetsNuevos/reloj.svg";

import "./Escenas.css";

const Escena4 = ({ onEscenaTerminada }) => {
  const [momento, setMomento] = useState("introduccion");
  const [decision, setDecision] = useState(null);

  const elegirPropuesta = (opcion) => {
    setDecision(opcion);
    setMomento("resultado");
  };

  const continuarResultado = () => {
    setMomento("reflexion");
  };

  const continuarReflexion = () => {
    setMomento("reloj");
  };

  const continuarAlColiseo = () => {
    if (onEscenaTerminada) {
      onEscenaTerminada();
    }
  };

  return (
    <div className={`escena-4 escena-4-momento-${momento}`}>
      <div className="escena-4-contenido">

        {/* FONDO DEL ÁGORA */}
        <img
          src="/Escenarios/FondoAgora2.svg"
          alt="Ampliación del Ágora de Atenas"
          className="escena-4-fondo"
        />

        {/* ADRIÁN DE ESPALDAS */}
        <img
          src={Adrianpatras}
          alt="Adrián observa el debate en el Ágora"
          className="escena-4-adrian-atras"
        />

        {/* PANEL DE DIÁLOGO E INTERACCIÓN */}
        <section
          className="escena-4-panel"
          aria-live="polite"
          key={momento}
        >

          {/* MOMENTO 1: INTRODUCCIÓN */}
          {momento === "introduccion" && (
            <>
              <span className="escena-4-etiqueta">
                ESCENA 4 · EL DEBATE DEL ÁGORA
              </span>

              <h2>Una discusión en la plaza</h2>

              <p>
                Parece que hoy el Ágora está más animada de lo
                normal. Esos dos hombres llevan un buen rato
                discutiendo.
              </p>

              <p>
                Adrián se acerca para escuchar lo que tienen
                que decir.
              </p>

              <button
                type="button"
                className="escena-4-accion"
                onClick={() => setMomento("debateA")}
              >
                Acercarme a escuchar →
              </button>
            </>
          )}

          {/* MOMENTO 2: DEFENSOR DEL COMERCIO */}
          {momento === "debateA" && (
            <>
              <span className="escena-4-etiqueta">
                CIUDADANO A
              </span>

              <h2>Defensor del comercio</h2>

              <p className="escena-4-cita">
                «Si queremos que nuestra ciudad prospere,
                debemos apoyar a los comerciantes. Gracias a
                ellos conseguimos productos, intercambiamos
                mercancías y mantenemos activa gran parte de
                nuestra vida cotidiana».
              </p>

              <button
                type="button"
                className="escena-4-accion"
                onClick={() => setMomento("debateB")}
              >
                Escuchar el otro argumento →
              </button>
            </>
          )}

          {/* MOMENTO 3: DEFENSOR DE LAS LEYES */}
          {momento === "debateB" && (
            <>
              <span className="escena-4-etiqueta">
                CIUDADANO B
              </span>

              <h2>Defensor de las leyes y los acuerdos</h2>

              <p className="escena-4-cita">
                «¿Y de qué sirve impulsar el comercio si no
                existen reglas claras? Sin acuerdos que se
                respeten, las disputas aumentarán y algunos
                terminarán aprovechándose de los demás».
              </p>

              <div className="escena-4-adrian-dialogo">
                <strong>Adrián:</strong>
                <p>
                  Los dos tienen argumentos que vale la pena
                  escuchar. Uno quiere impulsar el comercio;
                  el otro, asegurar que las actividades de la
                  ciudad se desarrollen con reglas claras.
                </p>
              </div>

              <button
                type="button"
                className="escena-4-accion"
                onClick={() => setMomento("decision")}
              >
                Elegir una propuesta →
              </button>
            </>
          )}

          {/* MOMENTO 4: DECISIÓN DEL USUARIO */}
          {momento === "decision" && (
            <>
              <span className="escena-4-etiqueta">
                TU TURNO
              </span>

              <h2>¿Qué propuesta apoyarías?</h2>

              <p>
                Si tuvieras que ayudar a uno de estos ciudadanos,
                ¿cuál de las dos propuestas elegirías?
              </p>

              <button
                type="button"
                className={`escena-4-opcion ${
                  decision === "comercio" ? "seleccionada" : ""
                }`}
                onClick={() => elegirPropuesta("comercio")}
              >
                <strong>A. Apoyar a los comerciantes</strong>
                <span>
                  Dar prioridad al intercambio de mercancías
                  y a la actividad económica de la ciudad.
                </span>
              </button>

              <button
                type="button"
                className={`escena-4-opcion ${
                  decision === "leyes" ? "seleccionada" : ""
                }`}
                onClick={() => elegirPropuesta("leyes")}
              >
                <strong>B. Apoyar las leyes y los acuerdos</strong>
                <span>
                  Dar prioridad a las reglas claras, la
                  justicia y la resolución de conflictos.
                </span>
              </button>
            </>
          )}

          {/* MOMENTO 5: CONSECUENCIA DE LA DECISIÓN */}
          {momento === "resultado" && (
            <>
              <span className="escena-4-etiqueta">
                CONSECUENCIA DE TU DECISIÓN
              </span>

              {decision === "comercio" ? (
                <>
                  <h2>Apoyas el comercio</h2>

                  <p>
                    Adrián se acerca al defensor del comercio
                    y expresa su apoyo. El ciudadano explica
                    que facilitar los intercambios puede
                    beneficiar tanto a quienes venden como
                    a quienes necesitan sus productos.
                  </p>

                  <div className="escena-4-aprendizaje">
                    <strong>¿Qué aprendemos?</strong>
                    <p>
                      El comercio favorece el intercambio
                      de productos y contribuye a la actividad
                      económica de la ciudad.
                    </p>
                  </div>

                  <div className="escena-4-adrian-dialogo">
                    <strong>Adrián:</strong>
                    <p>
                      Tiene sentido. Cuando el comercio
                      funciona, no solo se benefician quienes
                      venden. Muchas personas dependen de esos
                      intercambios en su vida cotidiana.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Apoyas las leyes y los acuerdos</h2>

                  <p>
                    Adrián se acerca al defensor de las leyes
                    y expresa su apoyo. El ciudadano explica
                    que los acuerdos y las normas ayudan a
                    resolver disputas y a organizar la
                    convivencia.
                  </p>

                  <div className="escena-4-aprendizaje">
                    <strong>¿Qué aprendemos?</strong>
                    <p>
                      Las normas y los acuerdos ayudan a
                      organizar la vida pública y a resolver
                      desacuerdos.
                    </p>
                  </div>

                  <div className="escena-4-adrian-dialogo">
                    <strong>Adrián:</strong>
                    <p>
                      También tiene sentido. Intercambiar
                      productos es importante, pero necesitamos
                      acuerdos y reglas que nos permitan
                      resolver los conflictos cuando aparecen.
                    </p>
                  </div>
                </>
              )}

              <button
                type="button"
                className="escena-4-accion"
                onClick={continuarResultado}
              >
                Continuar →
              </button>
            </>
          )}

          {/* MOMENTO 6: REFLEXIÓN COMÚN */}
          {momento === "reflexion" && (
            <>
              <span className="escena-4-etiqueta">
                UNA REFLEXIÓN
              </span>

              <h2>Dos propuestas, dos necesidades</h2>

              <p>
                Parece que cada propuesta responde a una
                necesidad diferente de nuestra ciudad.
                Y elegir una no significa que la otra
                deje de ser importante.
              </p>

              <p>
                En una ciudad, el comercio y las reglas que
                organizan los acuerdos pueden cumplir
                funciones importantes.
              </p>

              <button
                type="button"
                className="escena-4-accion"
                onClick={continuarReflexion}
              >
                Continuar →
              </button>
            </>
          )}

          {/* MOMENTO 7: EL RELOJ Y EL FINAL */}
          {momento === "reloj" && (
            <>
              <span className="escena-4-etiqueta">
                ALGO ESTÁ SUCEDIENDO
              </span>

              <h2>¡Otra vez esa luz!</h2>

              <p>
                ¡Otra vez esa luz! Creo que nuestro recorrido
                aún no termina...
              </p>

              <p>
                El reloj brilla cada vez con más intensidad.
                La luz comienza a envolver el escenario y
                el Ágora desaparece poco a poco.
              </p>

              <button
                type="button"
                className="escena-4-accion"
                onClick={continuarAlColiseo}
              >
                Continuar al Coliseo romano →
              </button>
            </>
          )}

        </section>

        {/* RELOJ: SOLO APARECE AL FINAL */}
        {momento === "reloj" && (
          <div className="escena-4-reloj-contenedor">
            <div className="escena-4-reloj-resplandor" />

            <img
              src={Reloj}
              alt="El reloj de Adrián brilla"
              className="escena-4-reloj"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Escena4;