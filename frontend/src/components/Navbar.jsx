import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h1>Navegación React</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new"> Crear artículo</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
