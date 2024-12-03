import React from 'react';
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useRoomContext } from "../../context/RoomContext";
import "./reserve.css";
import { baseAPI } from '../../hooks/utils';

const Reserve = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`${baseAPI}/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const numberOfAdults = options.adult;
  const numberOfChildren = options.children;
  const { selectedRoomsInfo } = useRoomContext(); 
  const navigate = useNavigate()
  const totalRooms = selectedRoomsInfo.reduce((total, room) => total + room.roomCount, 0);
  const totalPrice = selectedRoomsInfo.reduce((total, room) => {
    return total + room.price ; // Giá phòng * số lượng phòng
  }, 0);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }


  const [dataform, setDataform] = useState({
    fullname: '',
    email:'',
    phone:'',
    name:'',
    IDhotel:'',
    // address:'',
    // room:[],
    // checkIn:'',
    // checkOut:'',
    // guests:'',
    // total:'',
    whoReserve:'true',
  });
  // const handleChange = (e) => {
  //   setDataform((data)=>({
  //     ...data,
  //     [e.target.name]: e.target.value
  //   }));

  //   if (name === "whoReserve") {
  //     const isSelf = value === "true"; // Kiểm tra nếu "true"
  //     setDataform({
  //       ...dataform,
  //       whoReserve: value,
  //       // Tự động điền thông tin khi chọn "Tôi là người đặt phòng"
  //       fullname: isSelf ? "Họ và tên của bạn" : "",
  //       email: isSelf ? "email@example.com" : "",
  //     });
  //   } else {
  //     setDataform({
  //       ...dataform,
  //       [name]: value,
  //     });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu là "whoReserve" thì xử lý logic điền thông tin
    if (name === "whoReserve") {
      const isSelf = value === "true"; // Kiểm tra nếu "true"
      setDataform({
        ...dataform,
        whoReserve: value,
        // Tự động điền thông tin khi chọn "Tôi là người đặt phòng"
        fullname: isSelf ? user?.fullname || "" : "",
        email: isSelf ? user?.email || "" : "",
        phone: isSelf ? user?.phone || "" : "",
      });
    } else {
      setDataform({
        ...dataform,
        [name]: value,
      });
    }
  };
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = async (e) => {
    e.preventDefault();

    const roomsData = selectedRoomsInfo.map((room) => ({
      title: room.title,
      roomNumber: room.roomNumber,
    }));

    const bookingData = {
      fullname: dataform.fullname,
      email: dataform.email,
      phone: dataform.phone,
      name: data.name,  // Lấy từ dữ liệu khách sạn
      IDhotel: id,
      address: data.address,
      room: roomsData,  // Dữ liệu phòng
      checkIn: dates[0].startDate.toISOString(), // Chuyển thành dạng ISO
      checkOut: dates[0].endDate.toISOString(),
      guests: `${numberOfAdults} adult${numberOfAdults > 1 ? "s" : ""}, ${numberOfChildren} child${numberOfChildren > 1 ? "ren" : ""}`, // Khách
      total: totalPrice,
      whoReverse: dataform.whoReserve,
    };

    try {
      // Giả sử bạn đang gửi dữ liệu này lên một API
      const response = await axios.post(`${baseAPI}/detail/${user._id}`, bookingData);
      console.log('Dữ liệu đã được cập nhật:', response.data);
      
      const urlmomo = await axios.post(`${baseAPI}/momo/payment?amount=${totalPrice}`);
      console.log('Dữ liệu đã được cập nhật:', urlmomo.payUrl);
      navigate(`${urlmomo.payUrl}`);
      navigate(`/hotels/${id}/reserve/complete`);
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      alert('Có lỗi khi cập nhật dữ liệu!');
      alert(user._id)
    }
  };

  return (
    <div>
        <Navbar />
    <div className="booking-page">
      {/* Left Section */}
      {loading ? (
        "loading"
      ) : (
        <><div className="booking-details">
              <div className="property-info">
                <h2>{data.name}</h2>
                <p>{data.address}</p>
                <div className="rating">
                  <span>🌟 9.3 Wonderful</span>
                  <span>(3 reviews)</span>
                </div>
                <ul>
                  <li>Pet friendly</li>
                  <li>Free WiFi</li>
                  <li>Parking</li>
                  <li>Swimming pool</li>
                </ul>
              </div>

              <div className="your-booking">
                <h3>Your booking details</h3>
                <p>Check-in: <strong>{dates[0].startDate.toLocaleDateString('en-GB')}</strong></p>
                <p>Check-out: <strong>{dates[0].endDate.toLocaleDateString('en-GB')}</strong></p>
                <p>Total length of stay: <strong>{days} nights</strong></p>
                <p>Guests: <strong>{numberOfAdults} Nguoi lon, {numberOfChildren} Tre em</strong></p>
                <p>Phong: {selectedRoomsInfo.length > 0 ? (
                  <ul>
                    {selectedRoomsInfo.map((room, index) => (
                      <li key={index}>
                        <p>{room.title} - Phong {room.roomNu} - {room.price},000 VND/dem</p>
                        {/* Hiển thị các thông tin phòng khác ở đây */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Chưa có phòng nào được chọn</p>
                )}</p>
                <h3>Total: {totalPrice},000 VND</h3>
                {/* <p className="discount">Original price: VND 132,000,000</p> */}
              </div>
            </div>
            <div className="user-details-form">
                <h3>Enter your details</h3>
                <form>
                <div className="form-options">
                    <label >Bạn đặt phòng cho ai</label>
                    <label>
                      <input type="radio" name='whoReserve' value='true' onChange={handleChange} checked={dataform.whoReserve === 'true'}/> Tôi là người đặt phòng
                    </label>
                    <label>
                      <input type="radio" name='whoReserve' value='false' onChange={handleChange} checked={dataform.whoReserve === 'false'}/> Tôi đặt phòng cho người quen
                    </label>
                  </div>
                  {/* Dòng thông báo nếu không phải người đặt phòng */}
                    {dataform.whoReserve === "false" && (
                      <p className="info-message">Vui lòng điền thông tin của người đặt phòng:</p>
                    )}
                  <div className="form-group">
                    <label>Họ và tên: *</label>
                    <input type="text" placeholder="First Name" value={dataform.fullname} onChange={handleChange}/>
                  </div>
                  
                  <div className="form-group">
                    <label>Email: *</label>
                    <input type="email" placeholder="Email Address" value={dataform.email} onChange={handleChange} />
                  </div>
                  {/* <div className="form-group">
                    <label>Country/Region *</label>
                    <select>
                      <option>Vietnam</option>
                    </select>
                  </div> */}
                  <div className="form-group">
                    <label>Số điện thoại *</label>
                    <input type="tel" placeholder="Phone Number" value={dataform.phone} onChange={handleChange} />
                  </div>
                  
                  <button onClick={handleClick} >Complete Booking</button>
                </form>
              </div>
              </>
      )};
    </div><Footer />
    </div>
  );
};

export default Reserve;
