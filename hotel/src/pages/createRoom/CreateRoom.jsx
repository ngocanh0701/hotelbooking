
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./createroom.css";
import React from 'react';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { HotelProvider, HotelContext } from "../../context/HotelContext";
import { baseAPI } from "../../hooks/utils";

const CreateRoom = () => {

  //const [info, setInfo] = useState({});
  //const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    maxPeople: '',
    desc:'',
  });

  //const { data, loading, error } = useFetch("/hotels");


  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${user.hotelId}`, { ...formData, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        console.log({
          formData,
          roomNumbers,
        });
        try {
          const res = await axios.post(`${baseAPI}/rooms/${user.hotelid}`, { ...formData, roomNumbers });
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
    };
  return (
    <div>
      <Navbar />
      <Header/>
      <form className="add-room-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          //onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter room title"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={formData.price}
          name="price"
          onChange={handleChange}
          placeholder="Enter price"
        />
      </div>
      <div className="form-group">
        <label>Rooms</label>
        <textarea
          type="text"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          placeholder="Give comma between room numbers."
        ></textarea>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={formData.desc}
          name="desc"
          onChange={handleChange}
          placeholder="Enter room description"
        />
      </div>
      <div className="form-group">
        <label>Max People</label>
        <input
          type="number"
          value={formData.maxPeople}
          name="maxPeople"
          onChange={handleChange}
          placeholder="Enter maximum people allowed"
        />
      </div>
      
      <button type="submit" className="submit-btn" >
        Send
      </button>
    </form>

      <Footer/>
    </div>
  );
};

export default CreateRoom;
