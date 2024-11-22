import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext ,useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    setLocalUser(null);
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Team05</span>
        </Link>
          <div className="navItems">
            {localUser ? (
            <>
              <span className="username">Welcome, {localUser.fullname}!</span>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          )}
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
