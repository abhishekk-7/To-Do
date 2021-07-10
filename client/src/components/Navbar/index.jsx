import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Navbar = ({ loggedIn, username }) => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ToDo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page">
                Welcome {username}
              </span>
            </li>
            <li className="nav-item">
              {loggedIn ? (
                <button
                  className="nav-link btn"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="nav-link btn" aria-current="page" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
