import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex flexRow justifyAround">
        <li>
          <Link to="/" className="link">
            New account
          </Link>
        </li>
        <li>
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="link">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
