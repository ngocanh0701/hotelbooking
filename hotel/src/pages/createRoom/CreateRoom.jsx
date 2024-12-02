
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./createroom.css";
import React from 'react';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [description, setDescription] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [hotel, setHotel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      price,
      rooms,
      description,
      maxPeople,
      hotel,
    };
    console.log("Form Data Submitted:", formData);
    alert("Form submitted!");
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter room title"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </div>
      <div className="form-group">
        <label>Rooms</label>
        <textarea
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          placeholder="Give comma between room numbers."
        ></textarea>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter room description"
        />
      </div>
      <div className="form-group">
        <label>Max People</label>
        <input
          type="number"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
          placeholder="Enter maximum people allowed"
        />
      </div>
      
      <button type="submit" className="submit-btn">
        Send
      </button>
    </form>

      <Footer/>
    </div>
  );
};

export default CreateRoom;
