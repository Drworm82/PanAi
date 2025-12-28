import { useState } from "react";
import Exterior from "./floors/Exterior.jsx";
import Recepcion from "./floors/Recepcion.jsx";
import Biblioteca from "./floors/Biblioteca.jsx";
import Cocinas from "./floors/Cocinas.jsx";
import FlechasNavegacion from "./components/FlechasNavegacion.jsx";

const FLOORS = ["exterior", "recepcion", "biblioteca", "cocinas"];

export default function App() {
  const [index, setIndex] = useState(0);

  const subir = () => {
    setIndex((i) => Math.min(i + 1, FLOORS.length - 1));
  };

  const bajar = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  const current = FLOORS[index];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        {current === "exterior" && <Exterior />}
        {current === "recepcion" && <Recepcion />}
        {current === "biblioteca" && <Biblioteca />}
        {current === "cocinas" && <Cocinas />}
      </div>

      <FlechasNavegacion
        onUp={subir}
        onDown={bajar}
        canUp={index < FLOORS.length - 1}
        canDown={index > 0}
        label={current}
      />
    </div>
  );
}
