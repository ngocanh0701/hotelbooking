import "./newUserHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";

const NewUserHotel = () => {
  const [info, setInfo] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/registerhotel", info);
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Enter full name"
                  value={info.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={info.username}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={info.password}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={info.email}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={info.phone}
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserHotel;
