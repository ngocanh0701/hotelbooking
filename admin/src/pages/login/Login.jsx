import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import icon
import "../login/login.css";
import { baseAPI } from "../../hooks/utils";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseAPI}/auth/login`, credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      }else{
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {message: "you are not allowed"}
        });
      }
    }
      catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className='wrapper'>
        <form action="">
            <h1>login</h1>
            <div className="input-box">
                <input type="text" placeholder='Username' id="username" onChange={handleChange}/>
                <FontAwesomeIcon icon={faUser} size="x" className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' id="password" onChange={handleChange}/>
                <FontAwesomeIcon icon={faLock} size="x" className='icon'/>
            </div>

            <div className="remember-forgot">
                <label ><input type="checkbox"/>Remember me</label>
                <a href="#">Forgot password?</a>
            </div>

            <button type='submit' disabled={loading} onClick={handleClick}>Login</button>
            {error && <span>{error.message}</span>}
            <div className="register-link">
                <p>Khong co tai khoan?<a href="/register">Dang ki</a></p>
            </div>
        </form>
    </div>
);
};

export default Login;
