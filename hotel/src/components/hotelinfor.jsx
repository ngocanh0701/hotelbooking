// src/components/HotelInfo.js

import React from "react";
import { useHotel } from "../context/HotelContext"; // Import hook từ context

const HotelInfo = () => {
  const { hotel } = useHotel(); // Lấy thông tin khách sạn từ context

  if (!hotel) {
    return <p>Chưa có thông tin khách sạn.</p>;
  }

  return (
    <div>
      <h2>Thông tin khách sạn:</h2>
      <p>Tên khách sạn: {hotel.name}</p>
      <p>Địa chỉ: {hotel.address}</p>
      <p>Giá phòng thấp nhất: {hotel.cheapestPrice}</p>
      {/* Hiển thị thêm thông tin nếu cần */}
    </div>
  );
};

export default HotelInfo;
