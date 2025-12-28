import CozyContainer from "../components/CozyContainer";
import GetPremiumButton from "../components/GetPremiumButton";
import Auth from "../components/Auth";

export default function Recepcion() {
  return (
    <CozyContainer>
      <h1>Recepción</h1>
      <p>Bienvenido a la Escuela de Repostería en el Árbol.</p>

      <Auth />

      <hr style={{ margin: "24px 0" }} />

      <h2>Premium</h2>
      <p>Accede a las cocinas y contenido exclusivo.</p>

      <GetPremiumButton />
    </CozyContainer>
  );
}
