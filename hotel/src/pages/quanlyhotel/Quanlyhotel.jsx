import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./quanlyhotel.css";

const Quanlyhotel = ({ formData, avatarImgUpload, image }) => {
  return (
    <div className="info-container">
      <div className="info-header">
        <h1>Thông tin khách sạn</h1>
        <button 
          className="details-button"
          onClick={() => alert("Hiển thị chi tiết khách sạn!")}
        >
          Chi tiết
        </button>
      </div>
      <div className="info-content">
        <div className="info-row">
          <label>Ảnh đại diện:</label>
          <img src={avatarImgUpload} alt="Avatar" width="200px" />
        </div>
        <div className="info-row">
          <label>Tên khách sạn:</label>
          <p>{formData.name}</p>
        </div>
        <div className="info-row">
          <label>Địa chỉ:</label>
          <p>{formData.address}</p>
        </div>
        <div className="info-row">
          <label>Loại khách sạn:</label>
          <p>{formData.type}</p>
        </div>
        <div className="info-row">
          <label>Giá thấp nhất:</label>
          <p>{formData.cheapestPrice}</p>
        </div>
        <div className="info-row">
          <label>Giới thiệu:</label>
          <p>{formData.title}</p>
        </div>
        <div className="info-row">
          <label>Mô tả:</label>
          <p>{formData.desc}</p>
        </div>
        <div className="info-row">
          <label>Ảnh mô tả:</label>
          <div className="gallery">
            {image.map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index}`} width="200px" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeWithDetails = ({ formData, avatarImgUpload, image }) => {
  return (
    <div>
      <Navbar />
      <Header />
      <Quanlyhotel 
        formData={formData} 
        avatarImgUpload={avatarImgUpload} 
        image={image} 
      />
      <Footer />
    </div>
  );
};

export default HomeWithDetails;
