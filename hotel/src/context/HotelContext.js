import React, { createContext, useState, useContext } from "react";

// Tạo context
const HotelContext = createContext();

// HotelProvider cung cấp context cho các component con
export const HotelProvider = ({ children }) => {
  // Khởi tạo state là một đối tượng, có thể chứa nhiều thông tin khách sạn và phòng
  const [hotel, setHotel] = useState({
    hotelInfo: null,
    rooms: [] // Mảng chứa thông tin các phòng
  });

  // Thêm hoặc cập nhật thông tin khách sạn
  const setHotelInfo = (hotelData) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      hotelInfo: hotelData // Cập nhật thông tin khách sạn
    }));
  };

  // Thêm phòng vào danh sách các phòng của khách sạn
  const addRoomInfo = (roomData) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      rooms: [...prevHotel.rooms, roomData] // Thêm phòng mới vào mảng
    }));
  };

  return (
    <HotelContext.Provider value={{ hotel, setHotelInfo, addRoomInfo }}>
      {children}
    </HotelContext.Provider>
  );
};

// Hook để sử dụng context trong các component con
export const useHotel = () => useContext(HotelContext);
