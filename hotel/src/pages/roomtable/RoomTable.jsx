import React from "react";
import "./roomtable.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";


const Roomtable = () => {
    const rooms = [
        { title: 'Phòng thường', description: 'Giường lớn, 1 phòng tắm', price: 100, maxPeople: 2 },
        { title: 'Phòng VIP', description: '2 Giường lớn, 1 phòng khách,...', price: 500, maxPeople: 4 },
        { title: 'Phòng thường', description: 'Giường lớn, 1 Phòng tắm', price: 100, maxPeople: 2 },
      ];

  return (
    <div>
        <Navbar />
        <Header/>
        <div className="room-table">
      <button className="add-button"><Link to="/themphong">Add new</Link></button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Max People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.title}</td>
              <td>{room.description}</td>
              <td>{room.price}</td>
              <td>{room.maxPeople}</td>
              <td>
                <span className="action view">View</span>
                <span className="action delete">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};

export default Roomtable;
