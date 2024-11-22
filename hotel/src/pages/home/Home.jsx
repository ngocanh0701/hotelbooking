
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.css";
import React from 'react';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    title: '',
    desc: '',
    cheapestPrice: '',
  });


  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsEditing(false);
      try {
        const res = await axios.post('/hotels', formData);
        console.log(res.data);
        //navigate('/login'); // Redirect to login page after successful registration
      } catch (err) {
          setError(err.response?.data?.message || 'An error occurred');
          setIsEditing(true);
      }
  };
  return (
    <div>
      <Navbar />
      <Header/>
      <div className='wrapper'>
        <div className="input-line">
          <p className="line">Ten khach san:</p>
          <div className="line">
            <input type="text"  name='name' value={formData.name} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>

        <div className="input-line">
          <p className="line">Hinh thuc khach san:</p>
          <div className="line">
            <input type="text" name='type' value={formData.type} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>

        <div className="input-line">
          <p className="line">Thanh pho:</p>
          <div className="line">
            <input type="text"  name='city' value={formData.city} onChange={handleChange}  disabled={!isEditing} required/>
          </div>
        </div>

        <div className="input-line">
          <p className="line">Dia chi:</p>
          <div className="line">
            <input type="textarea"  name='address' value={formData.address} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>


        <div className="input-line">
          <p className="line">Loi gioi thieu:</p>
          <div className="line">
            <input type="text"  name='title' value={formData.title} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>


        <div className="input-line">
          <p className="line">Mo ta chi tiet:</p>
          <div className="line">
            <textarea type="text" rows="5" name='desc' value={formData.desc} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>


        <div className="input-line">
          <p className="line">Gia phong thap nhat:</p>
          <div className="line">
            <input type="text"  name='cheapestPrice' value={formData.cheapestPrice} onChange={handleChange} disabled={!isEditing} required/>
          </div>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>cap nhat</button>
        {error && <p className="error">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
