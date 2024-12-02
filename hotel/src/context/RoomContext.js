import { createContext, useState, useContext } from "react";

// Khởi tạo Context với giá trị mặc định
const RoomContext = createContext();

// Provider để chia sẻ state giữa các component
export const RoomContextProvider = ({ children }) => {
  const [selectedRoomsInfo, setSelectedRoomsInfo] = useState([]);

  // Hàm để cập nhật thông tin phòng đã chọn
  const addSelectedRoom = (roomInfo) => {
    setSelectedRoomsInfo((prevRooms) => [...prevRooms, roomInfo]);
  };

  const removeSelectedRoom = (roomId) => {
    setSelectedRoomsInfo((prevRooms) =>
      prevRooms.filter((room) => room._id !== roomId)
    );
  };

  return (
    <RoomContext.Provider value={{ selectedRoomsInfo, addSelectedRoom, removeSelectedRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

// Hook để sử dụng context trong các component khác
export const useRoomContext = () => useContext(RoomContext);
