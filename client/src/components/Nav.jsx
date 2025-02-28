import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [user, setUser] = useState(true);
  const activeLink = ({ isActive }) =>
    isActive ? "btn btn-ghost text-primary font-bold" : "btn btn-ghost";
  return (
    <nav className="px-4 navbar bg-base-100">
      <div className="navbar-start">
        <NavLink to="/" className={activeLink}>
          Home
        </NavLink>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <NavLink to="/contact" className={activeLink}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={activeLink}>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to="/login" className={activeLink}>
          {user ? "Logout" : "Login"}
        </NavLink>
        {user ? "Logout" : "Login"}
        {/* </NavLink> */}
      </div>
    </nav>
  );
};

export default Nav;
