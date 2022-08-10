import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
    const { isLoading, loggedInUser, logout } = useContext(AuthContext)

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              { (!isLoading && loggedInUser.token !== '') ? (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/rooms/new">
                      Create Room
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={() => logout() } className="nav-link" to="#">Logout</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item active">
                    <Link className="nav-link" to="/auth/login">
                      Login
                    </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;