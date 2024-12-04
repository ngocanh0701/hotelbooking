
import React, { useEffect, useState } from "react";
import "./roomtable.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseAPI } from "../../hooks/utils";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from 'axios';

const Roomtable = () => {
  const {user } = useContext(AuthContext);
  //console.log(user);
  // console.log(user.hotelid); 

  const { data1, loading1, error1 } = useState();
  // useEffect(() => {
  //   if (loading1) {
  //     console.log("Loading...");
  //   } else if (error1) {
  //     console.error("Error:", error1);
  //   } else if (data1) {
  //     console.log(data1.name); // Log toàn bộ dữ liệu khi đã tải xong
  //   }
  // }, [data1, loading1, error1]);
  const [rooms, setRooms] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetch = async() => {      
      const response = await axios.get(`${baseAPI}/hotels/find/${user.hotelid}`);
      console.log(response);
      
      const _roomdetails = [];
      
      for (let per_room of response.data.rooms) {
        const roomfetched = await fetchRoomId(per_room);
        // console.log(per_room); 
        // console.log(roomfetched);
        _roomdetails.push(roomfetched);
      }
      console.log(_roomdetails);
      
      setRooms(_roomdetails);
    }
    const fetchRoomId = async(roomID) => {
      const response = await axios.get(`${baseAPI}/rooms/find/${roomID}`);
      return response.data;
    }
    // const interval = setInterval(() => {
    //     fetch();
    // }, 2000);
    // return () => clearInterval(interval);
    fetch();
    // if (data1) {
    //   const roomIds = data1.rooms; // Giả sử bạn nhận được danh sách ID phòng từ data1
    //   console.log(roomIds);
      
    //   // Gọi API cho từng phòng để lấy thông tin chi tiết
    //   const fetchRooms = async () => {
    //     try {
    //       const roomPromises = roomIds.map((roomId) => 
    //         fetch(`${baseAPI}/rooms/find/${roomId}`).then((res) => res.json())
    //       );
          
    //       const roomsData = await Promise.all(roomPromises);
    //       setRooms(roomsData); // Lưu thông tin các phòng vào state
    //     } catch (error) {
    //       setError2(error);
    //     } finally {
    //       setLoading2(false);
    //     }
    //   };

    //   fetchRooms();
    // }
  }, [data1], [rooms]); // Chạy lại khi data1 thay đổi

  return (
    <div>
      <Navbar />
      <Header />
      <div className="room-table">
        <button className="add-button">
          <Link to="/themphong">Add new</Link>
        </button>
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
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <span className="action view">View</span>
                    <span className="action delete">Delete</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No rooms available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Roomtable;

